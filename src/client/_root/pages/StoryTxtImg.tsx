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
			document.getElementById("next")!.innerHTML = "Finish";
			navigate('/');
		}
	};

	const handlePrevious = () => {
		if (currentIndex > 0) {
			setCurrentIndex(currentIndex - 1);
		}
	};

	return (
		<div className="container">
			<div className="container-v">
				<div className="story">{parts[currentIndex]}</div>
				<div className="container">
					<Button id="prev" className="button_primary" onClick={handlePrevious}>
						Previous
					</Button>
					<Button id="next" className="button_primary" onClick={handleNext}>
						Next
					</Button>
				</div>
			</div>
			{images.length > 0 && (
				<img className="content-crop" src={images[currentIndex]} alt={`Image ${currentIndex + 1}`}/>
			)} 
		</div>
	);
};

export default Story;
