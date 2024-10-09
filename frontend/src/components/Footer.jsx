import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-700 text-off-white py-10">
      <div className="container mx-auto px-4 font-text">

        <div className="flex flex-col justify-between">
          <div className='mx-auto'>
            <div className='w-full'>
              <img className='max-h-56 ml-4 my-auto antialiased rounded-full border-orange-dark ' src="/logo-big.png" alt="" />
            </div>

            <div className="ml-4 mb-8 md:mb-0">
              <h4 className="text-xl font-bold text-orange-dark mb-4 mt-4">À propos</h4>
              <p className="text-sm w-[85%]">
              Notre plateforme connecte associations, bénévoles et donateurs pour favoriser l'entraide. Que ce soit pour offrir de votre temps, faire un don matériel ou financier, ou parrainer un animal, nous facilitons l'engagement solidaire et soutenons les associations dans leurs missions. Ensemble, nous pouvons agir concrètement.
              </p>
            </div>
          </div>

          <div className='ml-4 w-full'>
            {/* <div className="mb-8 md:mb-0">
              <h4 className="text-xl font-bold text-orange-dark my-4">Services</h4>
              <ul>
                <li className="mb-2"><a href="#" className="hover:text-orange-500">Missions de bénévolat</a></li>
                <li className="mb-2"><a href="#" className="hover:text-orange-500">Soutien aux associations</a></li>
                <li className="mb-2"><a href="#" className="hover:text-orange-500">Adoption d'animaux</a></li>
              </ul>
            </div> */}

            <div className="mb-8 md:mb-0">
              <h4 className="text-xl font-bold text-orange-dark mb-4">Contact</h4>
              <ul>
                <li className="mb-2 text-sm">Email: contact@refugesetgardiens.org</li>
                <li className="mb-2 text-sm">Téléphone: +33 123 456 789</li>
              </ul>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-600 hover:text-orange-500"><i className="fab fa-facebook fa-2x"></i></a>
                <a href="#" className="text-gray-600 hover:text-orange-500"><i className="fab fa-twitter fa-2x"></i></a>
                <a href="#" className="text-gray-600 hover:text-orange-500"><i className="fab fa-instagram fa-2x"></i></a>
              </div>
          </div>
          </div>
        </div>

        <div className="border-t border-gray-300 my-6"></div>

        <div className="text-center text-sm">
          <p>&copy; 2024 Refuges & Gardiens. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
