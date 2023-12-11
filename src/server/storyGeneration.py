from flask import Flask, request, jsonify
import json
import openai
from openai import ChatCompletion, Image

app = Flask(__name__)
port = 3000

# Set up your OpenAI API keys
api_key = "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"
openai.api_key = api_key

# Function to append story and character data to the initial_prompt.json file
@app.route('/append-inputs', methods=['POST'])
def append_inputs():
    new_data = request.json

    # Read the existing data from the file
    with open('initial_prompt.json', 'r') as file:
        initial_prompt_data = json.load(file)

    # Append the new data
    initial_prompt_data.append(new_data)

    # Write the updated data back to the file
    with open('initial_prompt.json', 'w') as file:
        json.dump(initial_prompt_data, file, indent=2)

    return jsonify({'message': 'Data added successfully', 'data': new_data}), 200


# Function to generate a story based on a given prompt
@app.route('/generate-story', methods=['GET'])
def generate_story():
    # Read the existing data from the file
    with open('initial_prompt.json', 'r') as file:
        prompt = json.load(file)

    prompt.append({"role": "user", "content": "START"})
    print(prompt)

    chat = ChatCompletion.create(
        model="gpt-4",
        messages=prompt
    )

    # Return the generated story as a JSON response
    story = jsonify({'story': chat.choices[0].message.content})

    images = []  # Store generated images
    part_prompts = []  # Store prompts related to parts

    # Extracting image prompts and part descriptions
    messages = story.split('\n')
    for message in messages:
        if message.startswith("Image"):
            image_description = message.split(":")[1].strip()
            images.append(image_description)
        elif message.startswith("Part"):
            part_content = message.split(":")[1].strip()
            part_prompts.append(part_content)

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
