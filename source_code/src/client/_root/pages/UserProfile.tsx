import { Button } from "@/client/components/ui/button";
import SideBar from "@/client/components/shared/SideBar";
import { useEffect, useState } from "react";

const UserProfile = () => {
    const [editMode, setEditMode] = useState(false);
    const [user, setUser] = useState({
        name: "",
        birthDate: "",
        problems: "",
        fears: "",
        interests: "",
    });

    const changeEditMode = () => {
        setEditMode(prevMode => !prevMode);
    }

    const handleInputChange = (e: any) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    async function handleSubmit(e: any) {
        e.preventDefault();  

        if (
            !user.name ||
            !user.birthDate ||
            !user.problems ||
            !user.fears ||
            !user.interests
        ) {
            alert("Error: Please fill all the fields");
            return;
        }

        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
                
        try {
            const response = await fetch('http://localhost:3000/user-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                console.log('User information saved successfully');
                alert("User information saved successfully");
                setEditMode(false);
            } else {
                console.error('Failed to save user information');
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    }

    useEffect(() => {
        // Fetch user data from the server
        fetch('src/server/userInfo.json')
            .then((response) => response.json())
            .then((data) => {
                setUser(data.user); // Update user state with fetched data
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <section className='container'>
            <SideBar />
            <div className="stories">
                <table className="sett-table">
                    <thead>
                        <tr>
                            <th className="sett-title">User Details</th>
                        </tr>
                    </thead>
                    <tr className="sett-row">
                        <td className="settCell2"><label>Name</label></td>
                        <td className="settCell2">
                            <input
                                className="user-col"
                                type='text'
                                name='name'
                                placeholder="Name"
                                value={user.name}
                                onChange={handleInputChange}
                                disabled={!editMode}
                            />
                        </td>
                    </tr>
                    <tr className="sett-row">
                        <td className="settCell2"><label>Birth Date</label></td>
                        <td className="settCell2">
                            <input
                                className="user-col"
                                type='date'
                                name='birthDate'
                                value={user.birthDate}
                                onChange={handleInputChange}
                                disabled={!editMode}
                            />
                        </td>
                    </tr>
                    <tr className="sett-row">
                        <td className="settCell2"><label>Problems</label></td>
                        <td className="settCell2">
                            <textarea
                                className="user-col"
                                name='problems'
                                placeholder="anxiety, depression, etc."
                                value={user.problems}
                                onChange={handleInputChange}
                                disabled={!editMode}
                            />
                        </td>
                    </tr>
                    <tr className="sett-row">
                        <td className="settCell2"><label>Fears</label></td>
                        <td className="settCell2">
                            <textarea
                                className="user-col"
                                name='fears'
                                placeholder="spiders, heights, etc."
                                value={user.fears}
                                onChange={handleInputChange}
                                disabled={!editMode}
                            />
                        </td>
                    </tr>
                    <tr className="sett-row">
                        <td className="settCell2"><label>Interests</label></td>
                        <td className="settCell2">
                            <textarea
                                className="user-col"
                                name='interests'
                                placeholder="music, sports, etc."
                                value={user.interests}
                                onChange={handleInputChange}
                                disabled={!editMode}
                            />
                        </td>
                    </tr>
                </table>
                <div style={{ gap: 20, display: "flex", width: "100%", justifyContent: "center" }}>
                    <Button className="save-button" onClick={changeEditMode}>
                        {editMode ? 'Cancel' : 'Enable Edit'}
                    </Button>
                    {editMode &&
                        <Button className="save-button" onClick={handleSubmit}>
                            Save
                        </Button>
                    }
                </div>
            </div>
        </section>
    );
};

export default UserProfile;