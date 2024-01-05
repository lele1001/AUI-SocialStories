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
			navigate('/');
		}
	};

	const handlePrevious = () => {
		if (currentIndex > 0) {
			setCurrentIndex(currentIndex - 1);
		}
	};

	const nextButtonText = currentIndex === parts.length - 1 ? "Finish" : "Next";

	return (
		<div className="story-container">
			<div className="container-v">
				<label className="story">{parts[currentIndex]}</label>
				<div className="story-container" style={{gap: 20}}>
					<Button id="prev" className="save-button" onClick={handlePrevious}>
						Previous
					</Button>
					<Button id="next" className="save-button" onClick={handleNext}>
						{nextButtonText}
					</Button>
				</div>
			</div>
			{images.length > 0 && (
				<img className="story-img" src={images[currentIndex]} alt={`Image ${currentIndex + 1}`}/>
			)} 
		</div>
	);
};

export default Story;
