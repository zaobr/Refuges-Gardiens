import { useNavigate } from "react-router-dom"

function UnauthorizedPage() {
    const navigate = useNavigate();

    const handleHome = () => {
        navigate('/')
    }

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="flex flex-col items-center p-10 bg-white bg-opacity-60 m-2 mb-5 rounded-xl">
                <p className="text-center">Erreur 403: Non autorisé à afficher cette page</p>
                <button
                    className="mt-4 w-fit px-3 bg-orange-dark border-orange-dark font-bold text-white border rounded-lg shadow-lg transform btn-active btn-hover"
                    onClick={handleHome}
                >
                    Retourner à l'accueil
                </button>
            </div>
        </div>
    )
}

export default UnauthorizedPage