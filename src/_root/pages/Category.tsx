import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate()
  const setCategory = () => {
    let path = '/setting'
    navigate(path)
  }

  return (
    <div className="flex flex-col flex-center mt-12 gap-6">
      <Button className="item_button" value="First Category" onClick={setCategory}>First Category</Button>
      <Button className="item_button" value="Second Category" onClick={setCategory}>Second Category</Button>
      <Button className="item_button" value="Third Category" onClick={setCategory}>Third Category</Button >
    </div>
  )
}

export default Category