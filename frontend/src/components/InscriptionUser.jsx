import React, { useState } from 'react';


const InscriptionUser = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, vous pouvez ajouter la logique pour envoyer les données au backend
    console.log('Données du formulaire:', formData);
  };

  return (
    <div className="inscription-form">
      <h2>Inscription (Utilisateur)</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="lastname">Nom:</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="firstname">Prénom:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirmation du mot de passe:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className='btn'>
        <button className='btn-1' type="submit">Annuler</button>
        <button className='btn-2' type="button">S'inscrire</button>
        </div>
      </form>
      <div className='contact'>
            <p>Contactez-nous</p>
        </div>
    </div>
  );
};

export default InscriptionUser;

