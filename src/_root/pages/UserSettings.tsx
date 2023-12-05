import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const UserSettings = () => {
    const navigate = useNavigate()

    async function handleSubmit(e: any) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        if (formData.get('trainingName') == '' || formData.get('trainingDesc') == '') {
            alert('Error: Please fill all the fields')
            return
        }

        // Or you can work with it as a plain object:
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);

        // Function to send data to Python
        /* try {
          const nameResp = await axios.post('http://your-python-server/api/endpoint', formJson);
          console.log(nameResp.data); // Handle the response from Python
        } catch (error) {
          console.error('Error sending data:', error);
          return
        } */

        let path = '/user-settings'
        navigate(path)
    }


    return (
        <form className="flex flex-col flex-center h-full w-full" method="post" onSubmit={handleSubmit}>
            <label className='input_label'>STORY SETTINGS</label>
            <div className='settings_selection'>
                <div className='flex-row flex-center gap-44'>
                    <label className='settings_label'>Text</label>
                    <label className='settings_label'>
                        <input type='radio' name='text_yes' value='YES'/>YES
                    </label>
                    <label className='settings_label'>
                        <input type='radio' name='text_no' value='NO' />NO
                    </label>
                </div>

                <div className='flex-row flex-center gap-40'>
                    <label className='settings_label'>Images</label>
                    <label className='settings_label'>
                        <input type='radio' name='img_yes' value='YES' />YES
                    </label>
                    <label className='settings_label'>
                        <input type='radio' name='img_no' value='NO' />NO
                    </label>
                </div>

                <div className='flex-row flex-center gap-40'>
                    <label className='settings_label'>Speech</label>
                    <label className='settings_label'>
                        <input type='radio' name='spe_yes' value='YES' />YES
                    </label>
                    <label className='settings_label'>
                        <input type='radio' name='spe_no' value='NO' />NO
                    </label>
                </div>
            </div>
            
            <hr style={{height:50}}/>

            <div className="flex flex-row flex-center w-full gap-6">
                <Button className="submit_button" type="reset">Clear</Button>
                <Button className="submit_button" type="submit">Submit</Button>
            </div>
        </form>
    )
}

export default UserSettings