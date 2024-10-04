import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button"

const SideBar = () => {
  const navigate = useNavigate();

  return (
    <section className="side-bar">
      <Button type='submit' className="side-button" onClick={() => navigate('/user-profile')}>User Profile</Button>
      <Button type='submit' className="side-button" onClick={() => navigate('/user-settings')}>Story Settings</Button>      
      <Button type='submit' className="side-button" onClick={() => navigate('/online-stories')}>Online Stories</Button>
      <Button type='submit' className="side-button" onClick={() => navigate('/offline-stories')}>Offline Stories</Button>
      <Button type='submit' className="side-button" onClick={() => navigate('/inputs')}>Add a Story</Button>
    </section>
  )
}

export default SideBar