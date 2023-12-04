import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const UserSettings = () => {
    const navigate = useNavigate()

    return (
        <div className="flex flex-row flex-center h-full gap-10">
            <Button className="home_button" onClick={() => navigate('inputs')}>Create my own story</Button>
            <Button className="home_button" onClick={() => navigate('category')}>Choose from existing stories</Button>
        </div>
    )
}

export default UserSettings