import { useState } from "react";
import axios from 'axios';
import Cookies from 'universal-cookie'


function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        const response = await axios.post('http://localhost:5000/auth/login', formData);
        console.log('Login successful:', response.data);
        const accessToken = response.data.data.access_token
        console.log(accessToken)
        const cookies = new Cookies(null, {path: '/'})
        cookies.set('userLogin', accessToken)
        } catch (err) {
            console.error('Error:', err);
        } 
    }

    return (
        <div className="w-[90%] p-[25px] bg-white/50 rounded-[10px] relative shadow-md mb-[50px]">
            <div className="text-title text-[20px] font-bold mb-[50px]">Connexion</div>
            <form onSubmit={handleSubmit} className="grid grid-rows-[repeat(3, auto)] gap-[20px]">
                <label className="email text-title text-[16px] font-bold flex flex-col">Email
                    <input className="rounded-sm h-[30px] px-[2px] py-0 border-b border-solid border-black/12" type="email" name="email" onChange={handleChange} value={formData.email}/>
                </label>
                <label className="password text-title text-[16px] font-bold flex flex-col">Password
                    <input className="rounded-sm h-[30px] px-[2px] py-0 border-b border-solid border-black/12" type="password" name="password" onChange={handleChange} value={formData.password}/>
                </label>
                <div className="grid grid-cols-[30%_60%] gap-[10%]">
                    <button className="py-1 bg-white border border-solid border-orange-dark rounded-md font-bold shadow-md">Annuler</button>
                    <button className="py-1 bg-orange-dark text-white font-bold rounded-md shadow-md" type="submit">Se connecter</button>
                </div>
            </form>
        </div>
    )
}

export default Login 