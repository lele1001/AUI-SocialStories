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

    const handleInputChange = (e: any) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const toggleEditMode = () => {
        setEditMode((prevEditMode) => !prevEditMode);
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
            <form className="sett-form" onSubmit={handleSubmit}>
                <div className='sett-table'>
                    <div className='sett-title'>User Details</div>
                    <div className='sett-row'>
                        <label className='sett-col'>Name</label>
                        <input
                            className="user-col"
                            type='text'
                            name='name'
                            placeholder="Name"
                            value={user.name}
                            onChange={handleInputChange}
                            disabled={!editMode}
                        />
                    </div>
                    <div className='sett-row'>
                        <label className='sett-col'>Birth Date</label>
                        <input
                            className="user-col"
                            type='date'
                            name='birthDate'
                            value={user.birthDate}
                            onChange={handleInputChange}
                            disabled={!editMode}
                        />
                    </div>
                    <div className='sett-row'>
                        <label className='sett-col'>Problems</label>
                        <textarea
                            className="user-col"
                            name='problems'
                            placeholder="anxiety, depression, etc."
                            value={user.problems}
                            onChange={handleInputChange}
                            disabled={!editMode}
                        />
                    </div>
                    <div className='sett-row'>
                        <label className='sett-col'>Fears</label>
                        <textarea
                            className="user-col"
                            name='fears'
                            placeholder="spiders, heights, etc."
                            value={user.fears}
                            onChange={handleInputChange}
                            disabled={!editMode}
                        />
                    </div>
                    <div className='sett-row'>
                        <label className='sett-col'>Interests</label>
                        <textarea
                            className="user-col"
                            name='interests'
                            placeholder="music, sports, etc."
                            value={user.interests}
                            onChange={handleInputChange}
                            disabled={!editMode}
                        />
                    </div>
                </div>

                <div style={{gap: 20, display: "flex", width: "100%", justifyContent: "center"}}>
                    <Button className="save-button" onClick={toggleEditMode}>
                        {editMode ? 'Cancel' : 'Enable Edit'}
                    </Button>
                    {editMode && (
                        <Button className="save-button" type="submit">
                            Save
                        </Button>
                    )}
                </div>
            </form>
        </section>
    );
};

export default UserProfile;