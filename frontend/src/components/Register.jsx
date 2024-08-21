import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
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
            <form onSubmit={handleSubmit}>
                <label>Firstname <br />
                    <input type="text" name="firstname" onChange={handleChange} value={formData.firstname} />
                </label><br />
                <label>Lastname <br />
                    <input type="text" name="lastname" onChange={handleChange} value={formData.lastname} />
                </label><br />
                <label>Email <br />
                    <input type="email" name="email" onChange={handleChange} value={formData.email} />
                </label><br />
                <label>Password <br />
                    <input type="text" name="password" onChange={handleChange} value={formData.password} />
                </label><br /><br />
                <button type="submit" disabled={isLoading}>Submit</button>
            </form>
        </>
    )
}

export default Register