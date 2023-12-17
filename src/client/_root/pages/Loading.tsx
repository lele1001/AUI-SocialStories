import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Inputs = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			const storyData = {
				character: localStorage.getItem("character"),
				scene: localStorage.getItem("scene"),
				txtOnly: localStorage.getItem("images") == "NO" ? true : false
			}

			try {
				const response = await fetch("http://localhost:3000/generate-story", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(storyData),
				});

				if (response.status == 200) {
					try {
						const responseData = await response.json();
						console.log("Success:", responseData);
						localStorage.setItem("story", JSON.stringify(responseData));
						
						// Redirect or perform any action after successful submission
						if (localStorage.getItem("images") == "YES") {
							navigate("/story-txt-img");
						} else {
							navigate("/story-txt");
						}
					} catch (error) {
						console.error("Error parsing JSON:", error);
					}
				} else {
					console.error("Server responded with an error:", response.statusText);
					alert("Failed to submit data. Please try again.");
					navigate("/");
				}
			} catch (error) {
				console.error("Error:", error);
				alert("Failed to load data. Please try again.");
				navigate("/");
			}
		};

		fetchData();
	}, []);

	return (
		<div className="flex flex-col h-full items-center gap-4 h1-bold">
			Loading Story...
		</div>
	);
};

export default Inputs;
