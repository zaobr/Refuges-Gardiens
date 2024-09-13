import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';

function ResetPassword() {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });

    const [newPassword, setNewPassword] = useState(false)
    const [error, setError] = useState('');

    const location = useLocation();
    const navigate = useNavigate();

    // Extract query parameters from the URL
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const email = queryParams.get('email');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        if (formData.password === formData.confirmPassword) {
            setError('');
        }


        try {
            const url = import.meta.env.VITE_API_URL;
            const response = await axios.post(`${url}/auth/reset-password?token=${token}&email=${email}`, formData);
            if (response.data.message) {
                setNewPassword(true)
            }
        } catch (error) {
            console.error('Error resetting password:', error);
        }
    }

    const handleCancel = () => {
        navigate('/')
    }

    const handleOk = () => {
        navigate('/login')
    }

    return (
        <div>
            <div className="w-full h-full flex flex-col justify-center items-center">
                <div className="w-[90%] p-[25px] bg-white/50 rounded-[10px] relative shadow-md mb-[50px]">
                    <div className="text-title text-[20px] font-bold mb-[50px]">Nouveau mot de passe</div>
                    <form className="grid grid-rows-[repeat(5, auto)] gap-[20px]" onSubmit={handleSubmit}>
                        <label className="password text-title text-[16px] font-bold flex flex-col">Mot de passe
                            <input
                                onChange={handleChange}
                                className="rounded-sm h-[30px] px-[2px] py-0 border-b border-solid border-black/12"
                                type='password'
                                name='password'
                                value={formData.password}
                            />
                        </label>
                        <label className="confirmed-password text-title text-[16px] font-bold flex flex-col">Confirmation du mot de passe
                            <input
                                onChange={handleChange}
                                className="rounded-sm h-[30px] px-[2px] py-0 border-b border-solid border-black/12"
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                            />
                        </label>

                        {error && <div className="text-red-500 text-sm">{error}</div>}

                        <div className="grid grid-cols-[30%_60%] gap-[10%]">
                            <button onClick={handleCancel} className="py-1 bg-white border border-solid border-orange-dark rounded-md font-bold shadow-md">Annuler</button>
                            <button type='submit' className="py-1 bg-orange-dark text-white font-bold rounded-md shadow-md">Réinitialiser</button>
                        </div>
                    </form>
                </div>
            </div>
            {newPassword && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
                        <p className="text-center text-lg font-semibold">Mot de passe réinitialisé avec succès.</p>
                        <p className="text-center text-sm">Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.</p>
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

export default ResetPassword