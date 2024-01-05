import { useState, useEffect } from "react";
import { Button } from "@/client/components/ui/button";
import { useNavigate } from "react-router-dom";

const Story = () => {
	const navigate = useNavigate();
	const [currentIndex, setCurrentIndex] = useState(0);
	const [parts, setParts] = useState([]);

	useEffect(() => {
		let story = JSON.parse(localStorage.getItem("story") || "") as {
			parts: [];
		};

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
		<section className="container-v">
				<label className="story">{parts[currentIndex]}</label>
				<div className="story-container" style={{gap: 20}}>
					<Button id="prev" className="save-button" onClick={handlePrevious}>
							Previous
					</Button>
					<Button id="next" className="save-button" onClick={handleNext}>
						{nextButtonText}
					</Button>
				</div>
		</section>
	);
};

export default Story;
