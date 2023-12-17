import { Button } from "@/client/components/ui/button";
import { useState } from "react";
import SideBar from "@/client/components/shared/SideBar";

const UserProfile = () => {
    const [user, setUser] = useState({
        name: '',
        surname: '',
        birthDate: '',
        fears: '',
        interests: '',
    });

    const modifyUser = (e: any) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    async function handleSubmit(e: any) {
        e.preventDefault();        

        if (
            user.name == "" ||
            user.surname == "" ||
            user.birthDate == "" ||
            user.fears == '' ||
            user.interests == ''
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

    return (
        <section className='container'>
            <SideBar />
            <form className="sett-form" method="post" onSubmit={handleSubmit}>
                <div className='sett-table'>
                    <div className='sett-title'>User Details</div>
                    <div className='sett-row'>
                        <label className='sett-col'>Name</label>
                        <textarea className="user-col" style={{ height: '34px' }} name='name' value={user.name} placeholder="Name" onChange={modifyUser} />
                    </div>
                    <div className='sett-row'>
                        <label className='sett-col'>Surname</label>
                        <textarea className="user-col" style={{ height: '34px' }}  name='surname' value={user.surname} placeholder="Surname" onChange={modifyUser} />
                    </div>
                    <div className='sett-row'>
                        <label className='sett-col'>Birth Date</label>
                        <textarea className="user-col" style={{ height: '34px' }} name='birthDate' value={user.birthDate} placeholder="DD-MM-YYYY" onChange={modifyUser} />
                    </div>
                    <div className='sett-row'>
                        <label className='sett-col'>Fears</label>
                        <textarea className="user-col" name='fears' value={user.fears} placeholder="Fears (comma-separated)" onChange={modifyUser} />
                    </div>
                    <div className='sett-row'>
                        <label className='sett-col'>Interests</label>
                        <textarea className="user-col" name='interests' value={user.interests} placeholder="Interests (comma-separated)" onChange={modifyUser} />
                    </div>
                </div>

                <Button className="save-button" type="submit">Save</Button>
            </form>
        </section>
    );
};

export default UserProfile;