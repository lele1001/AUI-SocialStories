import { useState, useEffect } from "react";
import { Button } from "@/client/components/ui/button";

const Story = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [parts, setParts] = useState([]);
	const [images, setImages] = useState([]);

	useEffect(() => {
		// Fetch data from the Python Flask backend
		// fetch("http://localhost:3000/append-inputs")
		// 	.then((response) => {
		// 		// Check if the response is valid (status code 200-299)
		// 		if (response.ok) {
		// 			return response.json(); // Parse the JSON content
		// 		} else {
		// 			throw new Error("Network response was not ok.");
		// 		}
		// 	})
		// 	.then((data) => {
		// 		setParts(data.parts);
		// 		setImages(data.images);
		// 	})

		// 	// Gives me the following error =
		// 	// Error fetching data: SyntaxError: Unexpected token 'r', "from flask "... is not valid JSON
		// 	.catch((error) => console.error("Error fetching data:", error));
		let story = JSON.parse(localStorage.getItem("story") || "") as {
			images: [];
			parts: [];
		};
		setImages(story["images"]);
		setParts(story["parts"]);
	}, []);

	const handleNext = () => {
		if (currentIndex < parts.length - 1) {
			setCurrentIndex(currentIndex + 1);
		}
	};

	const handlePrevious = () => {
		if (currentIndex > 0) {
			setCurrentIndex(currentIndex - 1);
		}
	};

	return (
		<div className="flex flex-row h-full items-stretch">
			<div className="storyContainer">
				<div className="storyText">{parts[currentIndex]}</div>
				<div className="flex flex-row gap-6">
					<Button className="button_primary" onClick={handlePrevious}>
						Previous
					</Button>
					<Button className="button_primary" onClick={handleNext}>
						Next
					</Button>
				</div>
			</div>
			{images.length > 0 && (
				<div className="w-full">
					<img
						className="content-crop"
						src={images[currentIndex]}
						alt={`Image ${currentIndex + 1}`}
					/>
				</div>
			)}
		</div>
	);
};

export default Story;
