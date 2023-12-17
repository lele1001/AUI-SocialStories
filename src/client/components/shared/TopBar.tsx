import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"

const TopBar = () => {
  const navigate = useNavigate();

  return (
    <section className="top-bar">
      <img className="top-bar-col logo" src="src\media\logo\LogoNoBackground.png" alt="logo" />
      <h1 className="top-bar-col title">Social Stories</h1>
      <Button type='submit' className="top-bar-col exit" onClick={() => navigate('/')}>EXIT</Button>
    </section>
  )
}

export default TopBar