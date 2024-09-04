import { useState } from "react";
import axios from 'axios';

function ForgotPassword() {
    const [formData, setFormData] = useState({
        email: ''
    });

    //const resetLink = `http://localhost:5173/reset-password?token=${resetToken}&email=${email}`

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await axios.post('http://localhost:5000/auth/forgot-password', formData);


        if (response.status === 201) {
            const { resetToken, email } = response.data;

            const resetLink = `http://localhost:5173/reset-password?token=${resetToken}&email=${email}`

            await axios.post('http://localhost:5000/auth/send-reset-email', {email, resetLink})
        }
    }
    return (
        <>
            <h2>Mot de passe oublié</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>Votre email <br />
                        <input type="email" name="email" onChange={handleChange} value={formData.email} />
                    </label> <br /><br />
                    <input type="hidden" value={formData.resetLink} />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}

export default ForgotPassword