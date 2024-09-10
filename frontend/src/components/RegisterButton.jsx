import { useNavigate } from "react-router-dom"

export default function RegisterButton() {

    const navigate = useNavigate()
    
    const handleClick = () => {
        navigate('/register')
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <div>Pas encore de compte ?</div>
            <button className="px-6 py-1 bg-orange-dark text-white font-bold rounded-md shadow-md" onClick={handleClick}>S'inscrire</button>
        </div>
    )
}