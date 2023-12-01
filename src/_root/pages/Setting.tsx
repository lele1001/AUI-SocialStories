import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const Setting = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col flex-center mt-12 gap-6">
      <Button className="item_button" onClick={() => navigate('/story')}>First Setting</Button>
      <Button className="item_button" onClick={() => navigate('/story')}>Second Setting</Button>
      <Button className="item_button" onClick={() => navigate('/story')}>Third Setting</Button >
    </div>
  )
}

export default Setting