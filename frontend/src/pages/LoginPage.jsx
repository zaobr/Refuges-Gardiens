import Login from '../components/Login'
import RegisterButton from '../components/RegisterButton'

export default function LoginPage() {
    return (
        <>
            <div className="w-full h-full flex flex-col justify-center items-center">
                <Login/>
                <RegisterButton/>
            </div>
        </>

    )
}