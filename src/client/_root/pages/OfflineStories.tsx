import SideBar from "@/client/components/shared/SideBar";
import { Button } from "@/client/components/ui/button";
import { useEffect, useState } from "react";

const OfflineStories = () => {
    const [checkedStories, setCheckedStories] = useState<string[]>([]);
    const [editMode, setEditMode] = useState(false);
    const [storyTitles, setStoryTitles] = useState<string[]>([]);

    useEffect(() => {
        fetchStories();
    }, []);

    const toggleEditMode = () => {
        setEditMode((prevEditMode) => !prevEditMode);

        if (editMode) {
            setCheckedStories([]);
        }
    };

    const fetchStories = () => {
        fetch('src/server/savedStories.json')
            .then((response) => response.json())
            .then((data) => {
                setStoryTitles(Object.keys(data));
            })
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
                        {storyTitles.map((title) => (
                            <tr key={title} className="sett-row">
                                <td className="settCellL">
                                    <input
                                        type="checkbox"
                                        checked={checkedStories.includes(title)}
                                        disabled={!editMode}
                                        onChange={() => handleCheckboxChange(title)}
                                    />
                                </td>
                                <td className="settCellR" colSpan={2}>
                                    <label>{title}</label>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={{ gap: 20, display: "flex", width: "100%", justifyContent: "center" }}>
                    <Button className="save-button" onClick={toggleEditMode}>
                        {editMode ? 'Cancel' : 'Edit List'}
                    </Button>
                    {editMode && (
                        <Button type="submit" className="save-button" onClick={handleDelete}>Delete</Button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default OfflineStories;