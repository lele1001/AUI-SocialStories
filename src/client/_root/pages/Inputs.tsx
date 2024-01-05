import { Button } from "@/client/components/ui/button";
import SideBar from "@/client/components/shared/SideBar";

const Inputs = () => {
	async function handleSubmit(e: any) {
		e.preventDefault();
		const form = e.target;
		const formData = new FormData(form);

		if (
			formData.get("title") == "" ||
			formData.get("description") == ""
		) {
			alert("Error: Please fill all the fields");
			return;
		}

		const story = {
			Title: formData.get("title"),
			Scene: formData.get("description"),
		};

		try {
			const response = await fetch("http://localhost:3000/add-story", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(story),
			});

			if (response.ok) {
				console.log('Story information saved successfully');
				alert("Story information saved successfully");
				form.reset();
			} else {
				console.error('Failed to save story information');
			}
		} catch (error) {
			console.error('Error occurred:', error);
		}
	}

	return (
		<section className="container">
			<SideBar />
			<form className="sett-form" method="post" onSubmit={handleSubmit}>
				<div className="sett-table">
					<div className="sett-title">Story Details</div>
					<div className='sett-row'>
						<label className="sett-col">Title</label>
						<textarea className="story-col" name="title" placeholder="Title of the story" />
					</div>
					<div className='sett-row'>
						<label className="sett-col">Description</label>
						<textarea className="story-col" name="description"
							placeholder="Brief description of the story"></textarea>
					</div>
				</div>

				<Button className="save-button" type="submit">Save</Button>
			</form>
		</section>
	);
};

export default Inputs;
