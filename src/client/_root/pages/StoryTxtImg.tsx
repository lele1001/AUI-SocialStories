import { useState, useEffect } from "react";
import { Button } from "@/client/components/ui/button";
import { useNavigate } from "react-router-dom";

const Story = () => {
	const navigate = useNavigate();
	const [currentIndex, setCurrentIndex] = useState(0);
	const [parts, setParts] = useState([]);
	const [images, setImages] = useState([]);

	useEffect(() => {
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
		else if (currentIndex == parts.length - 1) {
			document.getElementById("next")!.textContent = "Finish";
			navigate('/');
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
					<Button id="prev" className="button_primary" onClick={handlePrevious}>
						Previous
					</Button>
					<Button id="next" className="button_primary" onClick={handleNext}>
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
