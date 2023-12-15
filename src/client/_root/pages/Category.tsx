import { Button } from "@/client/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface StoryTitle {
  scene: string;
  character: string;
}

const Category = () => {
  const navigate = useNavigate();
  const [storyTitles, setStoryTitles] = useState<StoryTitle[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/get-titles", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          try {
            const { titles } = await response.json();
            setStoryTitles(titles);
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        } else {
          console.error("Server responded with an error:", response.statusText);
          alert("Failed to retrieve data. Please try again.");
          navigate("/");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to load data. Please try again.");
        navigate("/");
      }
    };

    fetchData();
  }, [navigate]);

  const handleButtonClick = (title: any) => {
    localStorage.setItem("scene", storyTitles[title].scene);
    localStorage.setItem("character", storyTitles[title].character);
    
    console.log("Success");
    navigate("/loading");
  };


  return (
    <div className="flex flex-col flex-center mt-12 gap-6">
      {storyTitles.map((title, index) => (
        <Button key={index} className="item_button" onClick={() => handleButtonClick(title)}>
            {title.toString()}
        </Button>
      ))}
    </div>
  );
};

export default Category;
