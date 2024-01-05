import SideBar from '@/client/components/shared/SideBar';
import { Button } from '@/client/components/ui/button';
import { useState, useEffect } from 'react';

const UserSettings = () => {
    const [userSettings, setUserSettings] = useState({
        Text: '',
        Images: '',
        Speech: '',
    });

    const handleInputChange = (e: any) => {
        setUserSettings({
            ...userSettings,
            [e.target.name]: e.target.value,
        });
    };

    async function handleSubmit(e: any) {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/user-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userSettings),
            });

            if (response.ok) {
                console.log('User settings saved successfully');
                alert('User settings saved successfully');
            } else {
                console.error('Failed to save user settings');
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    }

    useEffect(() => {
        // Fetch user settings from the server
        fetch('src/server/userInfo.json')
            .then((response) => response.json())
            .then((data) => {
                setUserSettings(data.settings); // Update user settings state with fetched data
            })
            .catch((error) => console.error('Error fetching user settings:', error));
    }, []);


    return (
        <section className='container'>
            <SideBar />
            <form className="sett-form" method="post" onSubmit={handleSubmit}>
                <div className='sett-table'>
                    <div className='sett-title'>Story Settings</div>
                    <div className='sett-row'>
                        <label className='sett-col'>Text</label>
                        <div className='sett-col'>
                            <input
                                type='radio'
                                name='text'
                                value='YES'
                                onChange={handleInputChange}
                                defaultChecked={userSettings.Text == 'YES'}
                            />YES
                        </div>
                        <div className='sett-col'>
                            <input
                                type='radio'
                                name='text'
                                value='NO'
                                onChange={handleInputChange}
                                defaultChecked={userSettings.Text == 'NO'}
                            />NO
                        </div>
                    </div>
                    <div className='sett-row'>
                        <label className='sett-col'>Images</label>
                        <div className='sett-col'>
                            <input
                                type='radio'
                                name='img'
                                value='YES'
                                onChange={handleInputChange}
                                defaultChecked={userSettings.Images == 'YES'}
                            />YES
                        </div>
                        <div className='sett-col'>
                            <input
                                type='radio'
                                name='img'
                                value='NO'
                                onChange={handleInputChange}
                                defaultChecked={userSettings.Images == 'NO'}
                            />NO
                        </div>
                    </div>
                    <div className='sett-row'>
                        <label className='sett-col'>Speech</label>
                        <div className='sett-col'>
                            <input
                                type='radio'
                                name='speech'
                                value='YES'
                                disabled={true}
                                onChange={handleInputChange}
                                defaultChecked={userSettings.Speech == 'YES'}
                            />YES
                        </div>
                        <div className='sett-col'>
                            <input
                                type='radio'
                                name='speech'
                                value='NO'
                                disabled={true}
                                onChange={handleInputChange}
                                defaultChecked={userSettings.Speech == 'NO'}
                            />NO
                        </div>
                    </div>
                </div>

                <Button className="save-button" type="submit">Save</Button>
            </form>
        </section>
    );
};

export default UserSettings;
