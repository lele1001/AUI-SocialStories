import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button"

const SideBar = () => {
  const navigate = useNavigate();

  return (
    <section className="side-bar">
      <Button type='submit' className="side-bar-row" onClick={() => navigate('/user-profile')}>User Profile</Button>
      <Button type='submit' className="side-bar-row" onClick={() => navigate('/user-settings')}>Story Settings</Button>      
      <Button type='submit' className="side-bar-row" onClick={() => navigate('/user-stories')}>Manage the stories</Button>
      <Button type='submit' className="side-bar-row" onClick={() => navigate('/inputs')}>Add a story</Button>
    </section>
  )
}

export default SideBar