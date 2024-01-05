import { Button } from '@/client/components/ui/button'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()

    function checkPassword() {
        const password = (document.getElementById('password') as HTMLInputElement).value

        if (password === 'myPassword') {
            navigate('/user-profile')
        }
        else {
            alert('Wrong password')
            navigate('/')
        }
    }

    return (
        <section className="container-v">
            <h1 className="subtitle">Insert the password</h1>
            <input type="password" id="password" className="story-col" style={{width: "25%", height: "25%"}} />
            <div className="container" style={{ gap: 50 }}>
                <Button className="save-button" style={{padding: "1%" }} onClick={() => checkPassword()}>Submit</Button>
            </div>
        </section>
    )
}

export default Login