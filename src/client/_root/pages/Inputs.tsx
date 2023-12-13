import { Button } from "@/client/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Inputs = () => {
	const navigate = useNavigate();
	const [character, setCharacter] = useState("");
	const [scene, setStoryDescription] = useState("");
	const [title, setTitle] = useState("");

	async function handleSubmit(e: any) {
		e.preventDefault();
		const form = e.target;
		const formData = new FormData(form);

		if (
			formData.get("storyName") == "" ||
			formData.get("trainingName") == "" ||
			formData.get("trainingDesc") == ""
		) {
			alert("Error: Please fill all the fields");
			return;
		}

		const newData = {
			title: title,
			character: "Character: " + character,
			scene: "Scene: " + scene,
		};

		localStorage.setItem("character", newData.character);
		localStorage.setItem("scene", newData.scene);

		try {
			const response = await fetch("http://localhost:3000/save-prompt", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newData),
			});

			alert("Data submitted successfully");
			console.log(response);

			if (response.status == 200) {
				try {
					const responseData = await response.json();
					console.log("Success:", responseData);
					navigate("/loading");
				} catch (error) {
					console.error("Error parsing JSON:", error);
				}
			} else {
				console.error("Server responded with an error:", response.statusText);
				alert("Failed to submit data. Please try again.");
			}
		} catch (error) {
			console.error("Error:", error);
			alert("Failed to submit data. Please try again.");
		}
	}

	return (
		<form
			className="flex flex-col flex-center h-full w-full"
			method="post"
			onSubmit={handleSubmit}
		>
			<label className="input_label">STORY TITLE</label>
			<textarea
				className="input_text_b"
				name="storyName"
				placeholder="type here the title of the story"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			></textarea>
			<hr style={{ height: 25 }} />

			<label className="input_label">STORY CHARACTER</label>
			<textarea
				className="input_text_b"
				name="trainingName"
				placeholder="type here the character description"
				value={character}
				onChange={(e) => setCharacter(e.target.value)}
			></textarea>
			<hr style={{ height: 25 }} />

			<label className="input_label">STORY DESCRIPTION</label>
			<textarea
				className="input_text_b"
				name="trainingDesc"
				placeholder="type here a brief description of your story"
				value={scene}
				onChange={(e) => setStoryDescription(e.target.value)}
			></textarea>
			<hr style={{ height: 50 }} />

			<div className="flex flex-row flex-center w-full gap-6">
				<Button className="submit_button" type="reset">
					Clear
				</Button>
				<Button className="submit_button" type="submit">
					Submit
				</Button>
			</div>
		</form>
	);
};

export default Inputs;
