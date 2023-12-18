import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Inputs = () => {
	const navigate = useNavigate();
	let images = ''

	useEffect(() => {
		const fetchData = async () => {

			fetch('src/server/stories.json')
				.then((response) => response.json())
				.then((data) => {
					for (let i = 0; i < data.length; i++) {
						if (data[i].Title == localStorage.getItem("title")) {
							localStorage.setItem("setting", data[i].Setting);
						}
					}					
				})
				.catch((error) => console.error('Error fetching data:', error));

			fetch('src/server/userInfo.json')
				.then((response) => response.json())
				.then((data) => {
					images = data['settings']['img']	
				})
				.catch((error) => console.error('Error fetching data:', error));
			
			try {
				const response = await fetch("http://localhost:3000/generate-story", {
					method: "POST",
					mode: 'no-cors',
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(localStorage.getItem("setting")),
				});

				if (response.status == 200) {
					try {
						const responseData = await response.json();
						console.log("Success:", responseData);
						localStorage.setItem("story", JSON.stringify(responseData));
						
						// Redirect or perform any action after successful submission
						if (images == "YES") {
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
