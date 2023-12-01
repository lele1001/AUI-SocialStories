import { Link } from "react-router-dom"
import { Button } from "../ui/button"

const TopBar = () => {
  return (
    <section className="top-bar">
        <h1 className="h1-bold t-title">Social Stories</h1>

        <Link to='/'>
            <Button type='submit' className="button_primary">EXIT</Button>
        </Link>
    </section>
  )
}

export default TopBar