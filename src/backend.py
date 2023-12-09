import openai

# Set up your OpenAI API keys
api_key = "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"
openai.api_key = api_key

prompt_1 = [
    {
        "role": "user",
        "content": '''I want to assess your ability in generating appropriate social stories. 
            I will give you a character profile and the scenario I want you to generate then when I type “start” I want you to generate the story.
            I also want to generate images for our story with dall-e-3 so along the story you should give me indicated image descriptions that need to be fed to dall-e-3 to get the images of our story.
            
            I will now provide you the scene and character description in separate prompts.
            Make sure the story is age-appropriate for the character you will be given.
            The prompts you generate for dall-e-3 must be given along the story before the scene related to them happens.
            
            The format of the story should be similar to the example below:
            Image 1: [prompt for image 1]
            Part 1: [part of the story related to image 1]
            [use this format for next images and parts, replace the brackets with appropriate text]
            You will give the whole story (multiple images and parts) to me in one part after I type “start”
            Include the character descriptions in image prompts so dall-e-3 can make appropriate pictures.
            
            Character: A girl named Maria. She is 24. She is a computer science master's student. She has brown hair and brown eyes. She is short and thin.
            Scene: Maria wants to learn to ask for directions from a stranger.'''
    }
]

# Function to generate a story based on a given prompt
def generate_story(prompt):
    prompt.append({"role": "user", "content": "start"})
    
    chat = openai.ChatCompletion.create(
        model="gpt-4",
        messages=prompt
    )

    reply = chat.choices[0].message.content
    return reply

def generate_dalle_images(prompt):
    images = []  # Store generated images
    part_prompts = []  # Store prompts related to parts

    # Generating story based on the prompt
    story = generate_story(prompt)

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
        response = openai.Image.create(
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

    return generated_images, part_prompts

# Generating DALL-E images and extracting prompts for images and parts
generated_images, part_prompts = generate_dalle_images(prompt_1)