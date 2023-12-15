import { Button } from '@/client/components/ui/button'
import { useNavigate } from 'react-router-dom'

const UserSettings = () => {
    const navigate = useNavigate()

    async function handleSubmit(e: any) {
        e.preventDefault();

        // Accessing selected values for text, images, and speech settings
        const textSetting = document.querySelector('input[name="text"]:checked');
        const imagesSetting = document.querySelector('input[name="img"]:checked');
        // const speechSetting = document.querySelector('input[name="spe"]:checked');

        // Checking if all settings are selected
        if (textSetting && imagesSetting) {
            // Getting values of selected options
            const textValue = (textSetting as HTMLInputElement).value;
            const imagesValue = (imagesSetting as HTMLInputElement).value;
            // const speechValue = (speechSetting as HTMLInputElement).value;

            // Perform actions with the selected values (for example, sending them to the server or processing further)
            console.log('Settings: text ', textValue, ', images ', imagesValue);
            localStorage.setItem('text', textValue);
            localStorage.setItem('images', imagesValue);
            // localStorage.setItem('speech', speechValue);

            if (localStorage.getItem('where') == 'create')
                navigate('/inputs')
            else
                navigate('/category')

        } else {
            // Display an alert if not all settings are selected
            alert('Please select settings for Text, Images, and Speech.');
        }
    }

    return (
        <form className="flex flex-col flex-center h-full w-full" method="post" onSubmit={handleSubmit}>
            <div className='sett-table'>
                <div className='sett-title'><h3>Story Settings</h3></div>
                <div className='sett-row'>
                    <div className='sett-col'>Text</div>
                    <div className='sett-col'>
                        <input type='radio' name='text' value='YES' />YES
                    </div>
                    <div className='sett-col'>
                        <input type='radio' name='text' value='NO' />NO
                    </div>
                </div>
                <div className='sett-row'>
                    <div className='sett-col'>Images</div>
                    <div className='sett-col'>
                        <input type='radio' name='img' value='YES' />YES
                    </div>
                    <div className='sett-col'>
                        <input type='radio' name='img' value='NO' />NO
                    </div>
                </div>
                <div className='sett-row'>
                    <div className='sett-col'>Speech</div>
                    <div className='sett-col'>
                        <input type='radio' name='spe' value='YES' disabled={true} />YES
                    </div>
                    <div className='sett-col'>
                        <input type='radio' name='spe' value='NO' disabled={true} />NO
                    </div>
                </div>
            </div>

            <hr style={{ height: 50 }} />

            <div className="flex flex-row flex-center w-full gap-6">
                <Button className="submit_button" type="reset">Clear</Button>
                <Button className="submit_button" type="submit">Submit</Button>
            </div>
        </form>
    )
}

export default UserSettings