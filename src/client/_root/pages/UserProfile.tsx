import { Button } from "@/client/components/ui/button";
import SideBar from "@/client/components/shared/SideBar";

const UserProfile = () => {
    async function handleSubmit(e: any) {
        e.preventDefault();  
        const form = e.target;
        const formData = new FormData(form);      

        if (
            formData.get("name") == "" ||
            formData.get("surname") == "" ||
            formData.get("birthDate") == "" ||
            formData.get("fears") == "" ||
            formData.get("interests") == ""
        ) {
            alert("Error: Please fill all the fields");
            return;
        }

        const user = {
            name: formData.get("name"),
            surname: formData.get("surname"),
            birthDate: formData.get("birthDate"),
            fears: formData.get("fears"),
            interests: formData.get("interests"),
        };

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
                        <textarea className="user-col" style={{ height: '34px' }} name='name' placeholder="Name"/>
                    </div>
                    <div className='sett-row'>
                        <label className='sett-col'>Surname</label>
                        <textarea className="user-col" style={{ height: '34px' }}  name='surname' placeholder="Surname"/>
                    </div>
                    <div className='sett-row'>
                        <label className='sett-col'>Birth Date</label>
                        <textarea className="user-col" style={{ height: '34px' }} name='birthDate' placeholder="DD-MM-YYYY" />
                    </div>
                    <div className='sett-row'>
                        <label className='sett-col'>Fears</label>
                        <textarea className="user-col" name='fears' placeholder="Fears (comma-separated)" />
                    </div>
                    <div className='sett-row'>
                        <label className='sett-col'>Interests</label>
                        <textarea className="user-col" name='interests' placeholder="Interests (comma-separated)" />
                    </div>
                </div>

                <Button className="save-button" type="submit">Save</Button>
            </form>
        </section>
    );
};

export default UserProfile;