import { Button } from '@/client/components/ui/button'
import { useNavigate } from 'react-router-dom'

const StoryType = () => {
    const navigate = useNavigate()

    function click(type: string) {
        localStorage.setItem("storyType", type);
        navigate('/category')
    }

    return (
        <section className="container-v">
            <h1 className="subtitle">Select the story type</h1>
            <div className="container">
                <Button className="save-button" onClick={() => click('offline')}>Offline</Button>
                <Button className="save-button" onClick={() => click('online')}>Online</Button>
            </div>
        </section>
    )
}

export default StoryType