import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ForgotPassword() {
    const [formData, setFormData] = useState({
        email: ''
    });
    const [emailSent, setEmailSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const url = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${url}/auth/forgot-password`, formData);
            setIsLoading(true)
            if (response.status === 201) {
                const { resetToken, email } = response.data;

                const resetLink = `http://localhost:5173/reset-password?token=${resetToken}&email=${email}`

                await axios.post(`${url}/auth/send-reset-email`, { email, resetLink })
                setEmailSent(true)
            }
        } catch (error) {
            console.error('Error sending reset email:', error);
            setIsLoading(false);
            setError(true);
        }
    }

    const handleCancel = () => {
        navigate('/login')
    }

    const handleOk = () => {
        navigate('/')
    }


    return (
        <div>
            <div className="w-full h-full flex flex-col justify-center items-center">
                <div className="w-[90%] p-[25px] bg-white/50 rounded-[10px] relative shadow-md mb-[50px]">
                    <div className="text-title text-[20px] font-bold mb-[50px]">Mot de passe oublié</div>
                    <form className="grid grid-rows-[repeat(5, auto)] gap-[20px]" onSubmit={handleSubmit}>
                        <label className="email text-title text-[16px] font-bold flex flex-col">Email
                            <input className="rounded-sm h-[30px] px-[2px] py-0 border-b border-solid border-black/12"
                                type="text"
                                name="email"
                                onChange={handleChange}
                                value={formData.email} />
                        </label>
                        <div className="grid grid-cols-[30%_60%] gap-[10%]">
                            <button className="py-1 bg-white border border-solid border-orange-dark rounded-md font-bold shadow-md" onClick={handleCancel}>Annuler</button>
                            <button className="py-1 bg-orange-dark text-white font-bold rounded-md shadow-md" type="submit" disabled={isLoading}>Envoyer</button>
                        </div>
                    </form>
                    {error ?
                        <p className="text-red-500 mt-4">Une erreur est survenue, veuillez réessayer</p> : ''}
                </div>
            </div>
            {emailSent && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
                        <p className="text-center text-lg font-semibold">Email de réinitialisation envoyé avec succès.</p>
                        <p className="text-center text-sm">Si un compte est associé à l'email donné, un lien de réinitialisation a été envoyé.</p>
                        <div className="flex mt-3 gap-3 justify-center">
                            <button className="bg-orange-dark border-orange-dark font-bold text-white border rounded-lg shadow-lg flex-1 transform btn-active btn-hover btn-flex max-w-40"
                                onClick={handleOk}
                            >OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
