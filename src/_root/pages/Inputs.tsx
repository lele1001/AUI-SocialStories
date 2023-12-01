import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Inputs = () => {
  const navigate = useNavigate()

  const sendInput = async (text: string) => {
    if (text == '') {
      alert('Please enter some text')
      return
    }

    // Function to send data to Python
    try {
      const response = await axios.post('http://your-python-server/api/endpoint', text);
      console.log(response.data); // Handle the response from Python
    } catch (error) {
      console.error('Error sending data:', error);
      return
    }

    let path = '/Story'
    navigate(path)
  }

  const myText = document.getElementById('userInput')?.textContent || ''

  return (
    <div className="flex flex-col flex-center mt-12 gap-6">
      <textarea id='userInput'> </textarea>
      <Button onClick={() => sendInput(myText)}>Submit</Button>
    </div>
  )
}

export default Inputs