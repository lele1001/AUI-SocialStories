import SideBar from '@/client/components/shared/SideBar';
import { Button } from '@/client/components/ui/button';
import { useState, useEffect } from 'react';

const UserSettings = () => {
    const [editMode, setEditMode] = useState(false);
    const [userSettings, setUserSettings] = useState({
        text: '',
        img: '',
        speech: '',
    });

    const handleInputChange = (e: any) => {
        setUserSettings({
            ...userSettings,
            [e.target.name]: e.target.value,
        });
    };

    const toggleEditMode = () => {
        setEditMode((prevEditMode) => !prevEditMode);
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
                setEditMode(false);
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
            <div className="stories">
                <table className="sett-table">
                    <thead>
                        <tr>
                            <th className="sett-title">Story Settings</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="sett-row">
                            <td className="settCell2"><label className='sett-col'>Text</label></td>
                            <td className='settCell2'>
                                {editMode &&
                                    <div className='sett-col'>
                                        <input
                                            type='radio'
                                            name='text'
                                            value='YES'
                                            onChange={handleInputChange}
                                        />YES
                                    </div>
                                }
                                {editMode &&
                                    <div className='sett-col'>
                                        <input
                                            type='radio'
                                            name='text'
                                            value='NO'
                                            onChange={handleInputChange}
                                        />NO
                                    </div>
                                }
                                {!editMode && <label className='user-col'>{userSettings.text}</label>}
                            </td>
                        </tr>
                        <tr className="sett-row">
                            <td className="settCell2"><label className='sett-col'>Images</label></td>
                            <td className='settCell2'>
                                {editMode &&
                                    <div className='sett-col'>
                                        <input
                                            type='radio'
                                            name='img'
                                            value='YES'
                                            onChange={handleInputChange}
                                        />YES
                                    </div>
                                }
                                {editMode &&
                                    <div className='sett-col'>
                                        <input
                                            type='radio'
                                            name='img'
                                            value='NO'
                                            onChange={handleInputChange}
                                        />NO
                                    </div>
                                }
                                {!editMode && <label className='user-col'>{userSettings.img}</label>}
                            </td>
                        </tr>
                        <tr className="sett-row">
                            <td className="settCell2"><label className='sett-col'>Speech</label></td>
                            <td className='settCell2'>
                                {editMode &&
                                    <div className='sett-col'>
                                        <input
                                            type='radio'
                                            name='speech'
                                            value='YES'
                                            disabled={true}
                                            onChange={handleInputChange}
                                        />YES
                                    </div>
                                }
                                {editMode &&
                                    <div className='sett-col'>
                                        <input
                                            type='radio'
                                            name='speech'
                                            value='NO'
                                            disabled={true}
                                            onChange={handleInputChange}
                                        />NO
                                    </div>
                                }
                                {!editMode && <label className='user-col'>{userSettings.speech}</label>}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div style={{ gap: 20, display: "flex", width: "100%", justifyContent: "center" }}>
                    <Button className="save-button" onClick={toggleEditMode}>
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

export default UserSettings;
