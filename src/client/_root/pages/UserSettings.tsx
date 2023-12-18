import SideBar from '@/client/components/shared/SideBar';
import { Button } from '@/client/components/ui/button';
import { useState, useEffect } from 'react';

const UserSettings = () => {
    const [userSettings, setUserSettings] = useState({
        text: 'YES',
        img: 'YES',
        speech: 'NO',
    });

    useEffect(() => {
        // Fetch user settings from the server
        fetch('src/server/userInfo.json')
            .then((response) => response.json())
            .then((data) => {
                setUserSettings(data.settings); // Update user settings state with fetched data
            })
            .catch((error) => console.error('Error fetching user settings:', error));
    }, []);

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
            } else {
                console.error('Failed to save user settings');
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
                    <div className='sett-title'>Story Settings</div>
                    <div className='sett-row'>
                        <div className='sett-col'>Text</div>
                        <div className='sett-col'>
                            <input
                                type='radio'
                                name='text'
                                value='YES'
                                checked={userSettings.text === 'YES'}
                                onChange={handleInputChange}
                            />YES
                        </div>
                        <div className='sett-col'>
                            <input
                                type='radio'
                                name='text'
                                value='NO'
                                checked={userSettings.text === 'NO'}
                                onChange={handleInputChange}
                            />NO
                        </div>
                    </div>
                    <div className='sett-row'>
                        <div className='sett-col'>Images</div>
                        <div className='sett-col'>
                            <input
                                type='radio'
                                name='img'
                                value='YES'
                                checked={userSettings.img === 'YES'}
                                onChange={handleInputChange}
                            />YES
                        </div>
                        <div className='sett-col'>
                            <input
                                type='radio'
                                name='img'
                                value='NO'
                                checked={userSettings.img === 'NO'}
                                onChange={handleInputChange}
                            />NO
                        </div>
                    </div>
                    <div className='sett-row'>
                        <div className='sett-col'>Speech</div>
                        <div className='sett-col'>
                            <input
                                type='radio'
                                name='speech'
                                value='YES'
                                checked={userSettings.speech === 'YES'}
                                onChange={handleInputChange}
                            />YES
                        </div>
                        <div className='sett-col'>
                            <input
                                type='radio'
                                name='speech'
                                value='NO'
                                checked={userSettings.speech === 'NO'}
                                onChange={handleInputChange}
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
