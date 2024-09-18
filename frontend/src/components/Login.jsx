import { useState, useContext } from "react";
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";


function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState({
        status: false,
        message: ''
    })

    const { setUser } = useContext(UserContext);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError({ status: false })
    };

    const handleCancel = () => {
        navigate('/')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = import.meta.env.VITE_API_URL;
            const response = await axios.post(`${url}/auth/login`, formData);
            if (response.data.result.message) {
                setError({
                    status: true,
                    message: response.data.result.message
                })
                return;
            } else {

                const accessToken = response.data.result.access_token;
                const userId = response.data.result.userInfo.userId;
                const isOrganization = response.data.result.userInfo.isOrganization;
                const cookies = new Cookies(null, { path: '/', maxAge: 3600 });

                cookies.set('userLogin', accessToken);
                cookies.set('userId', userId);
                cookies.set('isOrganization', isOrganization);

                const userResponse = await axios.get(`${url}/user/${userId}`);
                setUser(userResponse.data);

                navigate(-1);
            }
        } catch (err) {
            console.error('Error:', err);
        }
    }

    return (
        <div className="w-[90%] p-[25px] bg-white/50 rounded-[10px] relative shadow-md mb-[50px]">
            <div className="text-title text-[20px] font-bold mb-[50px]">Connexion</div>
            <form onSubmit={handleSubmit} className="grid grid-rows-[repeat(3, auto)] gap-[20px]">
                <label className="email text-title text-[16px] font-bold flex flex-col">Email
                    <input className="rounded-sm h-[30px] px-[2px] py-0 border-b border-solid border-black/12" type="email" name="email" onChange={handleChange} value={formData.email} />
                </label>
                <label className="password text-title text-[16px] font-bold flex flex-col">Mot de passe
                    <input className="rounded-sm h-[30px] px-[2px] py-0 border-b border-solid border-black/12" type="password" name="password" onChange={handleChange} value={formData.password} />
                </label>
                <div className="grid grid-cols-[30%_60%] gap-[10%]">
                    <button className="py-1 bg-white border border-solid border-orange-dark rounded-md font-bold shadow-md" onClick={handleCancel}>Annuler</button>
                    <button className="py-1 bg-orange-dark text-white font-bold rounded-md shadow-md" type="submit">Se connecter</button>
                </div>
            </form>
            {error.status && error.message ?
                <p className="text-red-500">{error.message}</p> : ''}
            <div className="font-bold underline hover:text-orange-dark mt-[25px] mb-[20px]">
                <a href="/forgot-password">Mot de passe oublié</a>
            </div>
        </div>
    )
}

export default Login 