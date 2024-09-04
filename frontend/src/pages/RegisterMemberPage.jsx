import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ContactButton from "../components/ContactButton";

function RegisterMember() {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!formData.firstname || !formData.lastname || !formData.email || !formData.password) {
            alert('All fields are required!');
            return;
        }

        if (formData.password.length < 6) {
            alert('Password must be at least 6 characters long');
            setIsLoading(false);
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/auth/register', formData);

            console.log('Registration successful:', response.data);
            navigate('/');
            
        } catch (err) {
            console.error('Error:', err);
            setError(err.response?.data?.message || err.message);
        } 
    };
    return (
        <>
            <div className="w-full h-full flex flex-col justify-center items-center">
                <div className="w-[90%] p-[25px] bg-white/50 rounded-[10px] relative shadow-md mb-[50px]">
                    <div className="text-title text-[20px] font-bold mb-[50px]">Inscription</div>
                    <form onSubmit={handleSubmit} className="grid grid-rows-[repeat(5, auto)] gap-[20px]">
                        <label className="firstname text-title text-[16px] font-bold flex flex-col">Firstname
                            <input className="rounded-sm  h-[30px] px-[2px] py-0 border-b border-solid border-black/12" type="text" name="firstname" onChange={handleChange} value={formData.firstname} />
                        </label>
                        <label className="lastname text-title text-[16px] font-bold flex flex-col">Lastname
                            <input className="rounded-sm  h-[30px] px-[2px] py-0 border-b border-solid border-black/12" type="text" name="lastname" onChange={handleChange} value={formData.lastname} />
                        </label>
                        <label className="email text-title text-[16px] font-bold flex flex-col">Email
                            <input className="rounded-sm  h-[30px] px-[2px] py-0 border-b border-solid border-black/12" type="email" name="email" onChange={handleChange} value={formData.email} />
                        </label>
                        <label className="password text-title text-[16px] font-bold flex flex-col">Password
                            <input className="rounded-sm  h-[30px] px-[2px] py-0 border-b border-solid border-black/12" type="text" name="password" onChange={handleChange} value={formData.password} />
                        </label>
                        <div className="grid grid-cols-[30%_60%] gap-[10%]">
                            <button className="py-1 bg-white border border-solid border-orange-dark rounded-md font-bold shadow-md">Annuler</button>
                            <button className="py-1 bg-orange-dark text-white font-bold rounded-md shadow-md" type="submit" disabled={isLoading}>S'inscrire</button>
                        </div>
                    </form>
                </div>
            </div>
            <ContactButton/>
        </>
    )
}

export default RegisterMember