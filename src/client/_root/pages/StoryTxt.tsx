import { useState, useEffect } from "react";
import { Button } from "@/client/components/ui/button";
import { useNavigate } from "react-router-dom";

const Story = () => {
	const navigate = useNavigate();
	const [currentIndex, setCurrentIndex] = useState(0);
	const [parts, setParts] = useState([]);

	useEffect(() => {
		let story = JSON.parse(localStorage.getItem("story") || "") as {
			images: [];
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

	return (
		<div className="flex flex-col h-full items-center gap-4">
				<div className="story">{parts[currentIndex]}</div>
				<div className="flex flex-row flex-center w-full gap-6">
					<Button className="button_primary" onClick={handlePrevious}>
						Previous
					</Button>
					<Button className="button_primary" onClick={handleNext}>
						Next
					</Button>
				</div>
		</div>
	);
};

export default Story;
