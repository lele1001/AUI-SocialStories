import SideBar from "@/client/components/shared/SideBar";
import { Button } from "@/client/components/ui/button";
import { useEffect, useState } from "react";

interface Story {
  Title: string;
}

const UserStories = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [checkedStories, setCheckedStories] = useState<string[]>([]);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = () => {
    fetch('src/server/stories.json') 
      .then((response) => response.json())
      .then((data) => setStories(data))
      .catch((error) => console.error('Error fetching data:', error));
  }

  const handleCheckboxChange = (title: string) => {    
    const updatedCheckedStories = checkedStories.includes(title)
      ? checkedStories.filter((story) => story !== title)
      : [...checkedStories, title];

    setCheckedStories(updatedCheckedStories);
  };

  const handleDelete = () => {
    fetch('http://localhost:3000/delete-stories', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checkedStories })
    })
      .then(response => {
        if (response.ok) {
          console.log('Stories deleted successfully!');
          alert('Stories deleted successfully!');
          fetchStories();
        } else {
          throw new Error('Failed to delete stories');
        }
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <section className="container">
      <SideBar />
      <div className="stories">
        <table className="sett-table"> 
          <thead>
            <tr>
              <th className="sett-title" colSpan={3}>Your Stories</th>
            </tr>
          </thead>
          <tbody>
            {stories.map((myStory) => (
              <tr key={myStory.Title} className="sett-row">
                <td>
                  <input
                    type="checkbox"
                    checked={checkedStories.includes(myStory.Title)}
                    onChange={() => handleCheckboxChange(myStory.Title)}
                  />
                </td>
                <td className="cell">{myStory.Title}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Button type="submit" className="save-button" onClick={handleDelete}>Delete</Button>
      </div>
    </section>
  );
};

export default UserStories;