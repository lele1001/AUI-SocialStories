import { Button } from "@/client/components/ui/button";
import SideBar from "@/client/components/shared/SideBar";
import { useEffect, useState } from "react";

const UserProfile = () => {
    const [user, setUser] = useState({
        name: "",
        surname: "",
        birthDate: "",
        fears: "",
        interests: "",
    });

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
            !user.surname ||
            !user.birthDate ||
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
                        />
                    </div>
                    <div className='sett-row'>
                        <label className='sett-col'>Surname</label>
                        <input
                            className="user-col"
                            type='text'
                            name='surname'
                            placeholder="Surname"
                            value={user.surname}
                            onChange={handleInputChange}
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
                        />
                    </div>
                    <div className='sett-row'>
                        <label className='sett-col'>Fears</label>
                        <textarea
                            className="user-col"
                            name='fears'
                            placeholder="Fears"
                            value={user.fears}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='sett-row'>
                        <label className='sett-col'>Interests</label>
                        <textarea
                            className="user-col"
                            name='interests'
                            placeholder="Interests"
                            value={user.interests}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <Button className="save-button" type="submit">Save</Button>
            </form>
        </section>
    );
};

export default UserProfile;