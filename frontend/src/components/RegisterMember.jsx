import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterMember() {
    const url = import.meta.env.VITE_API_URL;
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [newUser, setNewUser] = useState(false);
    const [emailTaken, setEmailTaken] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setWrongPassword(false);
    };

    const handleOk = () => {
        navigate('/login')
    }

    const handleCancel = () => {
        navigate('/register')
    }

    const verifyEmail = async () => {
        const response = await axios.get(`${url}/user/check-email?email=${formData.email}`);
        if (response.data.exists) {
            setEmailTaken(true);
            return
        }
        setEmailTaken(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        if (!formData.firstname || !formData.lastname || !formData.email || !formData.password) {
            alert('All fields are required!');
            return;
        }

        if (formData.password.length < 6) {
            alert('Password must be at least 6 characters long');
            setIsLoading(false);
            return;
        }

        if (formData.password !== formData.confirmedPassword) {
            setWrongPassword(true);
            setIsLoading(false);
            return
        }

        try {
            await axios.post(`${url}/auth/register`, formData);
            setIsLoading(false);
            setNewUser(true);
            
        } catch (err) {
            console.error('Error:', err);
            setError(err.response?.data?.message || err.message);
            alert(error)
            setIsLoading(false);
        } 
    };
    return (
        <>
            <div className="w-full h-full flex flex-col justify-center items-center">
                <div className="w-[90%] p-[25px] bg-white/50 rounded-[10px] relative shadow-md mb-[50px]">
                    <div className="text-title text-[20px] font-bold mb-[50px]">Inscription</div>
                    <form onSubmit={handleSubmit} className="grid grid-rows-[repeat(5, auto)] gap-[20px]">
                        <label className="firstname text-title text-[16px] font-bold flex flex-col">Prénom
                            <input className="rounded-sm  h-[30px] px-[2px] py-0 border-b border-solid border-black/12" type="text" name="firstname" onChange={handleChange} value={formData.firstname} />
                        </label>
                        <label className="lastname text-title text-[16px] font-bold flex flex-col">Nom
                            <input className="rounded-sm  h-[30px] px-[2px] py-0 border-b border-solid border-black/12" type="text" name="lastname" onChange={handleChange} value={formData.lastname} />
                        </label>
                        <label className="email text-title text-[16px] font-bold flex flex-col">Email
                            <input className={`rounded-sm h-[30px] px-[2px] pr-[100px] py-0 border-b border-solid ${emailTaken ? 'border-red-500 bg-red-100' : 'border-black/12'}`} type="email" name="email" onChange={handleChange} value={formData.email} onBlur={verifyEmail} />
                        </label>
                        {emailTaken ? <span className="text-red-500 text-sm pt-0">Email déjà utilisé</span> : ''}
                        <label className="password text-title text-[16px] font-bold flex flex-col">Mot de passe
                            <input className="rounded-sm  h-[30px] px-[2px] py-0 border-b border-solid border-black/12" type="password" name="password" onChange={handleChange} value={formData.password} />
                        </label>
                        <label className="confirmed-password text-title text-[16px] font-bold flex flex-col">Confirmation du mot de passe
                            <input className={`rounded-sm h-[30px] px-[2px] pr-[100px] py-0 border-b border-solid ${wrongPassword ? 'border-red-500 bg-red-100' : 'border-black/12'}`} type="password" name="confirmedPassword" onChange={handleChange} value={formData.confirmedPassword} />
                        </label>
                        {wrongPassword ? <span className="text-red-500 text-sm pt-0">Les mots de passe ne correspondent pas</span> : ''}
                        <div className="grid grid-cols-[30%_60%] gap-[10%]">
                            <button className="py-1 bg-white border border-solid border-orange-dark rounded-md font-bold shadow-md" onClick={handleCancel}>Annuler</button>
                            <button className="py-1 bg-orange-dark text-white font-bold rounded-md shadow-md" type="submit" disabled={isLoading}>S'inscrire</button>
                        </div>
                    </form>
                </div>
            </div>
            {newUser && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
                        <p className="text-center text-lg font-semibold">Compte créé avec succès.</p>
                        <p className="text-center text-sm">Vous pouvez maintenant vous connecter au site.</p>
                        <div className="flex mt-3 gap-3 justify-center">
                            <button className="bg-orange-dark border-orange-dark font-bold text-white border rounded-lg shadow-lg flex-1 transform btn-active btn-hover btn-flex max-w-40"
                                onClick={handleOk}
                            >OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default RegisterMember