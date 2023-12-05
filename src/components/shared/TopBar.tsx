import { Link } from "react-router-dom"
import { Button } from "../ui/button"

const TopBar = () => {
  return (
    <section className="top-bar">
      <img className="logo" src="src\media\logo\LogoNoBackground.png" alt="logo" style={{maxHeight: 150}}/>
        <h1 className="h1-bold t-title">Social Stories</h1>

        <Link to='/'>
            <Button type='submit' className="button_primary">EXIT</Button>
        </Link>
    </section>
  )
}

export default TopBar