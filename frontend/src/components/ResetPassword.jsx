import { useState } from 'react';
import { useLocation } from 'react-router-dom'
import axios from 'axios';

function ResetPassword() {
    const [formData, setFormData] = useState({
        password: ''
    });

    const location = useLocation();

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
        try {
            const response = await axios.post(`http://localhost:5000/auth/reset-password?token=${token}&email=${email}`, formData);
            return response.data.message;
        } catch (error) {
            console.error('Error resetting password:', error);
        }
    }

    return (
        <>
            <h2>Réinitialiser mot de passe</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>Nouveau mot de passe <br />
                        <input type="text" name="password" onChange={handleChange} value={formData.password} />
                    </label> <br /><br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}

export default ResetPassword