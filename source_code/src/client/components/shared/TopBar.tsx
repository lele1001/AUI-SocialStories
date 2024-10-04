import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"

const TopBar = () => {
  const navigate = useNavigate();

  return (
    <section className="top-bar">
      <h1 className="top-bar-col logo">
        <img src="src\media\logo\LogoNoBackground.png" width={"70%"} alt="logo" />
      </h1>
      <h1 className="top-bar-col title">Social Stories</h1>
      <h1 className="top-bar-col logo">
        <Button type='submit' className="top-bar-col exit" onClick={() => navigate('/')}>EXIT</Button>
        </h1>
    </section>
  )
}

export default TopBar