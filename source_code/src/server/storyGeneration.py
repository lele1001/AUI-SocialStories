import random
import re
from textwrap import fill
from turtle import st
from click import prompt
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

# Function to retrieve information of online stories from the JSON file
def get_stories():
    with open('src/server/stories.json', 'r') as file:
        return json.load(file)

# Function to retrieve offline stories from the JSON file  
def get_offline_stories():
    with open('src/server/savedStories.json', 'r') as file:
        return json.load(file)

# Function to write information of online stories to the JSON file
def write_stories(stories):
    with open('src/server/stories.json', 'w') as file:
        json.dump(stories, file, indent=4)

# Function to write offline stories to the JSON file
def write_offline_stories(stories):
    with open('src/server/savedStories.json', 'w') as file:
        json.dump(stories, file, indent=4)

# Function to add a story for the online and the offline mode
@app.route('/add-story', methods=['POST'])
def add_story():
    if request.method == 'POST':
        newStory = request.json
        stories = get_stories()
        stories.append(newStory)
    
        # Generate 5 versions of the story for the offline mode 
        story_versions = []
        prompt = fill_prompt(newStory['Scene'], newStory['Lesson'])

        for i in range(5):
            story = generate_text(prompt)
            images = []  # Store prompts related to images
            part_prompts = []  # Store prompts related to parts
            current_story = {}

            messages = story.split('\\n')
            msg_num = 1

            for message in messages:
                message = message.replace('"',"")
                print(message)

                if message.startswith("Image"):
                    current_story["Image " + str(msg_num)] = message.split(":")[1].strip()
                elif message.startswith("Part"):
                    current_story["Part " + str(msg_num)] = message.split(":")[1].strip()
                    msg_num += 1

            story_versions.append(current_story)

        savedStories = get_offline_stories()
        savedStories[newStory['Title']] = story_versions

        write_stories(stories)
        write_offline_stories(savedStories)
        return jsonify({'message': 'Story added successfully'})

# Function to delete information of some online stories
@app.route('/delete-stories', methods=['DELETE'])
def delete_stories():
    if request.method == 'DELETE':
        stories = request.get_json()
        checkedStories = stories.get('checkedStories', [])
        oldStories = get_stories()

        updatedStories = []
        for story in oldStories:
            if story['Title'] not in checkedStories:
                updatedStories.append(story)
        
        write_stories(updatedStories)
        return jsonify({'message': 'Stories deleted successfully'})
    
# Function to delete some offline stories
@app.route('/delete-offline-stories', methods=['DELETE'])
def delete_offline_stories():
    if request.method == 'DELETE':
        stories = request.get_json()
        checkedStories = stories.get('checkedStories', [])
        oldStories = get_offline_stories()

        for story in checkedStories:
            del oldStories[story]

        write_offline_stories(oldStories)
        return jsonify({'message': 'Stories deleted successfully'})

# Function to retrieve a saved story
@app.route('/retrieve-story', methods=['POST'])
def retrieve_story():
    if request.method == 'POST':      
        title = request.json
        storyNumber = random.randint(0, 4)        
        savedStories = get_offline_stories()

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

# Function to generate images using DALL-E
def generate_images(images):
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
        else:
            print(f"Failed to generate image for prompt: {description}")

    return generated_images

# Function to generate images descriptions and part prompts
def generate_text(prompt):
    chat = ChatCompletion.create(model="gpt-4", messages=prompt)

    # Return the generated story as a JSON response
    story = json.dumps(chat.choices[0].message.content)
    return story

# Function to fill the prompt with the necessary information
def fill_prompt(scene, lesson):
    prompt = [0, 1, 2, 3, 4, 5, 6, 7, 8]

    with open('src/server/initial_prompt.json', 'r', encoding='utf-8') as file:
        myFile = json.load(file)

    with open('src/server/userInfo.json', 'r', encoding='utf-8') as file:
        userInfo = json.load(file)

    prompt[0] = myFile["first"]
    prompt[1] = myFile["second"]
    prompt[2] = {
        "role": "user",
        "content": "Character: " + userInfo['user']['name'] + ", which was born on " + userInfo['user']['birthDate'] + " and has the following problems: " + userInfo['user']['problems']
    }
    prompt[3] = {
        "role": "user", 
        "content": "Scene: " + scene 
    }
    prompt[4] = {   
        "role": "user",
        "content": "Lesson: " + lesson
    }
    prompt[5] = {
        "role": "user",
        "content": "Likes: " + userInfo['user']['interests']
    }
    prompt[6] = {
        "role": "user",
        "content": "Dislikes: " + userInfo['user']['fears']
    }
    prompt[7] = {   
        "role": "user",
        "content": "Remember to keep any mention of the main character out of the images"
    }
    prompt[8]={
        "role":"user", 
        "content":"START"
    }

    return prompt


# Function to generate a story based on a given prompt
@app.route('/generate-story', methods=['POST'])
def generate_story():
    # Read the existing data from the files
    prompt = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    title = request.json

    with open('src/server/userInfo.json', 'r', encoding='utf-8') as file:
        userInfo = json.load(file)

    stories = get_stories()

    for story in stories:
        if story['Title'] == title:
            scene = story['Scene']
            lesson = story['Lesson']
            break  

    prompt = fill_prompt(scene, lesson)

    # Make a request to OpenAI API for story generation
    story = generate_text(prompt)
    
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
    else:
        generated_images = generate_images(images)
        # Return generated images and part prompts as a JSON response
        return jsonify({'images': generated_images, 'parts': part_prompts})

if __name__ == '__main__':
    app.run(port=port, debug=True)
