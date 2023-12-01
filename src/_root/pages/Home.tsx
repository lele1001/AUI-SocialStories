import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()

    return (
        <div className="flex flex-row flex-center mt-12 gap-6">
            <Button className="home_button" onClick={() => navigate('inputs')}>Create my own story</Button>
            <Button className="home_button" onClick={() => navigate('category')}>Choose from existing stories</Button>
        </div>
    )
}

export default Home