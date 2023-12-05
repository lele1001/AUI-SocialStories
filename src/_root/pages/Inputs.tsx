import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";
// import axios from 'axios';

const Inputs = () => {
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
      <label className='input_label'>STORY TITLE</label>
      <textarea className="input_text_s" name='trainingName' placeholder="type here the title of your story"></textarea>
      <hr style={{ height: 25 }}/>

      <label className='input_label'>STORY DESCRIPTION</label>
      <textarea className="input_text_b" name='trainingDesc' placeholder="type here a brief description of your story"></textarea>
      <hr style={{ height: 50 }} />

      <div className="flex flex-row flex-center w-full gap-6">
        <Button className="submit_button" type="reset">Clear</Button>
        <Button className="submit_button" type="submit">Submit</Button>
      </div>
    </form>
  )
}

export default Inputs