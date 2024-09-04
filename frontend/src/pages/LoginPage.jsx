import ContactButton from '../components/ContactButton'
import ForgotPassword from '../components/ForgotPassword'
import Login from '../components/Login'
import LoginButton from '../components/LoginButton'

export default function LoginPage() {
    return (
        <>
            <div className="w-full h-full flex flex-col justify-center items-center">
                <Login/>
                <ForgotPassword/>
                <LoginButton/>
            </div>
            <ContactButton/>
        </>

    )
}