import { useNavigate } from "react-router-dom"
import ContactButton from "../components/ContactButton"

export default function RegisterPage() {

    const navigate = useNavigate()
    
    const handleClickAsso = () => {
        navigate('/register/org')
    }
    
    const handleClickUser = () => {
        navigate('/register/user')
    }

    return (
        <>
            <div className="w-full h-full flex flex-col justify-center items-center">
                <div className='flex flex-col justify-center items-center mb-[50px] p-[25px] w-[90%] shadow-md'>
                    <h2 className="font-bold text-title text-xl mb-5">Inscription pour ?</h2>
                    <div className='flex flex-col justify-center items-center'>
                        <button className="w-full mx-[10px] mb-[10px] px-6 py-3 font-bold cursor-pointer bg-orange-dark text-white rounded-lg shadow-md" onClick={handleClickAsso}>Je suis une association</button>
                        <button className="w-full mx-[10px] mb-[10px] px-6 py-3 font-bold cursor-pointer bg-orange-dark text-white rounded-lg shadow-md"onClick={handleClickUser}>Je suis un particulier</button>
                    </div>
                </div>
            </div>
            <ContactButton/>
        </>
    )
}

// ALERT
// Sur le formulaire d'inscription des asso, impossible d'ajouter un fichier
// Impossible également d'annuler l'inscription pour les associations et les particuliers
// Le front retourne une erreur "All fields are required !"