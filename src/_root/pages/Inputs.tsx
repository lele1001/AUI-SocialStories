import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";
// import axios from 'axios';

const Inputs = () => {
  const navigate = useNavigate()

  const sendInput = async (name: HTMLTextAreaElement, desc: HTMLTextAreaElement) => {
    if ((!name || !desc) || (name.value == '' || desc.value == '')) {
      alert('Please enter some text');
      return;
    }

    // Function to send data to Python
    /* try {
      const nameResp = await axios.post('http://your-python-server/api/endpoint', name);
      console.log(nameResp.data); // Handle the response from Python
      const descResp = await axios.post('http://your-python-server/api/endpoint', desc);
      console.log(descResp.data); // Handle the response from Python
    } catch (error) {
      console.error('Error sending data:', error);
      return
    } */

    let path = '/story'
    navigate(path)
  }

  const trName = document.getElementById('trainingName') as HTMLTextAreaElement;
  const trDesc = document.getElementById('trainingDesc') as HTMLTextAreaElement;

  const clearInput = (name: HTMLTextAreaElement, desc: HTMLTextAreaElement): void => {
    name.value = '';
    desc.value = '';
  };

  return (
    <div className="flex flex-col flex-center h-full gap-6">
      <div className="flex flex-col flex-center w-full">
        <label className='input_label'>Insert a training name</label>
        <textarea className="input_text_s" id='trainingName'> </textarea>
      </div>
      <div className="flex flex-col flex-center w-full">
        <label className='input_label'>Insert the training description</label>
        <textarea className="input_text_b" id='trainingDesc'> </textarea>
      </div>
      <div className="flex flex-row flex-center w-full gap-6">
        <Button className="submit_button" onClick={() => clearInput(trName, trDesc)}>Clear</Button>
        <Button className="submit_button" onClick={() => sendInput(trName, trDesc)}>Submit</Button>
      </div>
    </div>
  )
}

export default Inputs