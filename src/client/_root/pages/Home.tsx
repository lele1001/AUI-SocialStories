import { Button } from '@/client/components/ui/button'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.clear()
    }, [])

    return (
        <div className="container" style={{gap: 50}}>
            <Button className="save-button" onClick={() => navigate('/user-profile')}>Settings</Button>
            <Button className="save-button" onClick={() => navigate('/type')}>Select the story</Button>
        </div>
    )
}

export default Home