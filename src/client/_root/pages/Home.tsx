import { Button } from '@/client/components/ui/button'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()

    const handleButtonClick = (where: any) => {
        localStorage.setItem('where', where)
        navigate('/user-settings')
    }

    return (
        <div className="flex flex-row flex-center h-full gap-10">
            <Button className="home_button" onClick={() => handleButtonClick('create')}>Create my own story</Button>
            <Button className="home_button" onClick={() => navigate('existing')}>Choose from existing stories</Button>
        </div>
    )
}

export default Home