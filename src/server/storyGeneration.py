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

# Function to generate a story based on a given prompt
@app.route('/generate-story', methods=['POST'])
def generate_story():
    # Read the existing data from the file
    prompt = [0, 1, 2]
    with open('src/server/initial_prompt.json', 'r') as file:
        prompt[0] = json.load(file)
        prompt[1] = {"role": "user", "content": request.get_json(force=True)['character'] + request.get_json(force=True)['scene']}
        prompt[2]={}
        prompt[2]["role"]="user"
        prompt[2]["content"]="START"

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
        if message.startswith("Image"):
            image_description = message.split(":")[1].strip()
            images.append(image_description)
        elif message.startswith("Part"):
            part_content = message.split(":")[1].strip()
            part_prompts.append(part_content)

    if request.get_json(force=True)['txtOnly'] == True:
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
