import SideBar from '@/client/components/shared/SideBar';
import { Button } from '@/client/components/ui/button'

const UserSettings = () => {
    async function handleSubmit(e: any) {
        e.preventDefault();
        const formData = new FormData(e.target);

        if (
            formData.get("text") == "" ||
            formData.get("img") == ""
        ) {
            alert("Error: Please fill all the fields");
            return;
        }

        localStorage.setItem('text', formData.get("text") as string);
        localStorage.setItem('images', formData.get("img") as string);
        // localStorage.setItem('speech', formData.get("speech") as string);

        console.log(localStorage.getItem('text'), localStorage.getItem('images'));
    }

    return (
        <section className='container'>
            <SideBar />
            <form className="sett-form" method="post" onSubmit={handleSubmit}>
                <div className='sett-table'>
                    <div className='sett-title'>Story Settings</div>
                    <div className='sett-row'>
                        <div className='sett-col'>Text</div>
                        <div className='sett-col'>
                            <input type='radio' name='text' value='YES' />YES
                        </div>
                        <div className='sett-col'>
                            <input type='radio' name='text' value='NO' />NO
                        </div>
                    </div>
                    <div className='sett-row'>
                        <div className='sett-col'>Images</div>
                        <div className='sett-col'>
                            <input type='radio' name='img' value='YES' />YES
                        </div>
                        <div className='sett-col'>
                            <input type='radio' name='img' value='NO' />NO
                        </div>
                    </div>
                    <div className='sett-row'>
                        <div className='sett-col'>Speech</div>
                        <div className='sett-col'>
                            <input type='radio' name='spe' value='YES' disabled={true} />YES
                        </div>
                        <div className='sett-col'>
                            <input type='radio' name='spe' value='NO' disabled={true} />NO
                        </div>
                    </div>
                </div>

                <Button className="save-button" type="submit">Save</Button>
            </form>
        </section>
    )
}

export default UserSettings