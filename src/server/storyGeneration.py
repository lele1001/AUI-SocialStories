import random
import re
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import openai
from openai import ChatCompletion, Image

app = Flask(__name__)
port = 3000
CORS(app)

# Set up your OpenAI API keys
api_key = "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"
openai.api_key = api_key

# Function to save the user data to a JSON file
@app.route('/user-data', methods=['POST'])
def user_data():
    data = request.get_json()

    with open('src/server/userInfo.json', 'r') as file:
        oldData = json.load(file)

    if 'name' in data.keys() and data['name'] != '':
        for key in oldData['user'].keys():
            oldData['user'][key] = data[key]
    
    if 'text' in data.keys() and data['text'] != '':
        for key in oldData['settings'].keys():
            oldData['settings'][key] = data[key]


    with open('src/server/userInfo.json', 'w') as file:
        json.dump(oldData, file, indent=4)

    return jsonify({'message': 'User data saved successfully'})

# Function to read stories from the JSON file
def get_stories():
    with open('src/server/stories.json', 'r') as file:
        return json.load(file)

# Function to write stories to the JSON file
def write_stories(stories):
    with open('src/server/stories.json', 'w') as file:
        json.dump(stories, file, indent=4)

# Function to add a story
@app.route('/add-story', methods=['POST'])
def add_story():
    if request.method == 'POST':
        newStory = request.json

        stories = get_stories()
        stories.append(newStory)
        write_stories(stories)

        return jsonify({'message': 'Story added successfully'})

# Function to delete some stories
@app.route('/delete-stories', methods=['DELETE'])
def delete_stories():
    if request.method == 'DELETE':
        stories = request.get_json()
        checkedStories = stories.get('checkedStories', [])
        oldStories = get_stories()
        updatedStories = [story for story in oldStories if story['Title'] not in checkedStories]
        write_stories(updatedStories)
        return jsonify({'message': 'Stories deleted successfully'})

# Function to retrieve a saved story
@app.route('/retrieve-story', methods=['POST'])
def retrieve_story():
    if request.method == 'POST':      
        title = request.json
        storyNumber = random.randint(0, 4)
        print("Title: ", title)
        
        with open('src/server/savedStories.json', 'r') as file:
            savedStories = json.load(file)

            if title in savedStories:
                story_versions = savedStories[title]
                selected_story = story_versions[storyNumber]

                print(selected_story)

                parts = []
                for key, value in selected_story.items():
                    if key.startswith("Part"):
                        parts.append(value)

                return jsonify({'parts': parts})
            else:
                available_titles = list(savedStories.keys())
                print(f"Available titles: {available_titles}")
                
                return jsonify({'parts': []})
            

# Function to generate a story based on a given prompt
@app.route('/generate-story', methods=['POST'])
def generate_story():
    # Read the existing data from the files
    prompt = [0, 1, 2, 3, 4]
    title = request.json
    
    with open('src/server/initial_prompt.json', 'r', encoding='utf-8') as file:
        myFile = json.load(file)

    with open('src/server/userInfo.json', 'r', encoding='utf-8') as file:
        userInfo = json.load(file)

    with open('src/server/stories.json', 'r', encoding='utf-8') as file:
        stories = json.load(file)

        for story in stories:
            if story['Title'] == title:
                scene = story['Scene']
                break        

    prompt[0] = myFile["first"]
    prompt[1] = myFile["second"]
    prompt[2] = {
        "role": "user",
        "content": "The story is for " + userInfo['user']['name'] + " " + userInfo['user']['surname'] + ", which was born on " + userInfo['user']['birthDate'] + ". This person likes " + userInfo['user']['interests']
    }
    prompt[3] = {
        "role": "user", 
        "content": "The scenario of the story is: " + scene + "\n Remember to keep any mention of the main character out of the images" 
    }
    
    prompt[4]={
        "role":"user", 
        "content":"START"}

    chat = ChatCompletion.create(
        model="gpt-4",
        messages=prompt
    )

    # Return the generated story as a JSON response
    story = json.dumps(chat.choices[0].message.content)

    images = []  # Store generated images
    part_prompts = []  # Store prompts related to parts

    # Extracting image prompts and part descriptions
    messages = story.split('\\n')
    for message in messages:
        message = message.replace('"',"")
        print(message)
        if message.startswith("Image"):
            image_description = message.split(":")[1].strip()
            images.append(image_description)
        elif message.startswith("Part"):
            part_content = message.split(":")[1].strip()
            part_prompts.append(part_content)

    if userInfo['settings']['img'] == 'NO':
        return jsonify({'parts': part_prompts})

    # Generating images using DALL-E
    generated_images = []
    for index, description in enumerate(images, start=1):
        # Make a request to DALL-E API for image generation
        response = Image.create(
            prompt=description,
            model="dall-e-3"
        )

        # Check if the request was successful
        if response and 'data' in response and response['data']:
            # Access the URL using image.data[0].url
            generated_image_url = response['data'][0]['url']
            generated_images.append(generated_image_url)
            
            # Display the successfully generated image and its corresponding part prompt
            print(f"Generated Image {index} URL: {generated_image_url}")
            print(f"Image {index} Description: {description}")
            print(f"Part {index}: {part_prompts[index-1]}\n")
        else:
            print(f"Failed to generate image for prompt: {description}")

    # Return generated images and part prompts as a JSON response
    return jsonify({'images': generated_images, 'parts': part_prompts})

if __name__ == '__main__':
    app.run(port=port, debug=True)
