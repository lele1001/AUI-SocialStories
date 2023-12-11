import { Button } from "@/client/components/ui/button"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Setting = () => {
  const [receivedData, setData] = useState([])
  const selectedButton = document.getElementsByClassName('item_button')[0].textContent || ''
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch data from Python backend when the component mounts
    getSetting();
  }, [])

  const getSetting = () => {
    // Replace with your Python server endpoint
    axios.get('http://your-python-server/api/data')
      .then(response => {
        setData(response.data); // Update state with received data
      })
      .catch(error => {
        console.error('There was a problem fetching data:', error);
      });
  }

  const setCategory = async (choice: string) => {
    // Check if user has selected a category
    if (choice == '') {
      alert('Error: Please select a setting for the story')
      return
    }

    // Function to send data to Python
    try {
      const response = await axios.post('http://your-python-server/api/endpoint', choice);
      // Handle the response from Python
      console.log(response.data);
    } catch (error) {
      console.error('Error sending data:', error);
      return
    }

    // Navigate to the next page
    let path = '/story'
    navigate(path)
  }

  return (
    <div className="flex flex-col flex-center mt-12 gap-6">
      {/* Mapping over the received data to create buttons */}
      {receivedData.map((item, index) => (
        <Button key={index} className="item_button" onClick={() => setCategory(selectedButton)}>{item}</Button>
      ))}
    </div>
  )
}

export default Setting