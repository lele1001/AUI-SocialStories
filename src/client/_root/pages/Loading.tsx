import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Inputs = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const title = localStorage.getItem("title");

		const fetchData = async () => {			
			try {
				let response;

				if (localStorage.getItem("storyType") == "offline") {
					response = await fetch("http://localhost:3000/retrieve-story", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(title),
					});
				} else {
					fetch('src/server/stories.json')
						.then((response) => response.json())
						.then((data) => {
							for (let i = 0; i < data.length; i++) {
								if (data[i].Title == title) {
									localStorage.setItem("setting", data[i].Setting);
								}
							}
						})
						.catch((error) => console.error('Error fetching data:', error));

					response = await fetch("http://localhost:3000/generate-story", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(localStorage.getItem("setting")),
					});
				}

				if (response.ok) {
					try {
						const responseData = await response.json();

						if (responseData.length == 0) {
							alert("Failed to load data. Please try again.");
							navigate("/");
						}

						localStorage.setItem("story", JSON.stringify(responseData));

						// Redirect or perform any action after successful submission
						if (localStorage.getItem('images') == "YES" && localStorage.getItem('storyType') == "online") {
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
		<div className="container">
			Loading Story...
		</div>
	);
};

export default Inputs;
