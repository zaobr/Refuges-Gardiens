import { useState } from "react";
import axios from 'axios';
import Cookies from 'universal-cookie'


//composant test
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
        <>
            <form onSubmit={handleSubmit}>
                <label>Email <br/>
                    <input type="email" name="email" onChange={handleChange} value={formData.email}/>
                </label><br/>
                <label>Password <br/>
                    <input type="text" name="password" onChange={handleChange} value={formData.password}/>
                </label><br/><br/>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default Login 