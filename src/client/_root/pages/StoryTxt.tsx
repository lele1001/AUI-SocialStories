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
		<section className="container-v">
				<div className="story">{parts[currentIndex]}</div>
				<div className="container">
				<Button id="prev" className="save-button" onClick={handlePrevious}>
						Previous
					</Button>
				<Button id="next" className="save-button" onClick={handleNext}>
						Next
					</Button>
				</div>
		</section>
	);
};

export default Story;
