import { Button } from "@/client/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Story {
  Title: string;
  Scene: string;
}

const Category = () => {
  const navigate = useNavigate();
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    fetch('src/server/stories.json')
      .then((response) => response.json())
      .then((data) => {
        setStories(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleButtonClick = (title: string) => {
    localStorage.setItem("title", title); 
    navigate("/loading");
  };


  return (
    <div className="container-v">
      {stories.map((myStory) => (
        <Button key={myStory.Title} className="save-button" onClick={() => handleButtonClick(myStory.Title)}>
          {myStory.Title}
        </Button>
      ))}
    </div>
  );
};

export default Category;
