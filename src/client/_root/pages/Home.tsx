import { Button } from '@/client/components/ui/button'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()

    return (
        <div className="container">
            <Button className="save-button" onClick={() => navigate('/user-profile')}>Settings</Button>
            <Button className="save-button" onClick={() => navigate('/category')}>Select the story</Button>
        </div>
    )
}

export default Home