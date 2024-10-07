import React, { useState, useEffect } from 'react';

const ConsentBanner = () => {
  const [bannerVisible, setBannerVisible] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setBannerVisible(true), 1500);

    return () => {
      clearTimeout(timer1);
    };
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setBannerVisible(false);
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div className="fixed left-2 bottom-0 z-40">
      <div
        className={`fixed sm:left-4 bottom-16 rounded-lg bg-white shadow-2xl w-[95%] sm:w-1/2 xl:w-1/4 max-w-[450px] overflow-hidden transition-all duration-300 ease-in-out transform ${
          bannerVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
        }`}
        style={{ display: bannerVisible ? 'block' : 'none' }}
      >
        <div className="relative overflow-hidden px-8 pt-8">
          <div className="absolute -top-10 -right-10 text-orange-dark">
            <svg width="120" height="119" viewBox="0 0 120 119" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                opacity="0.3"
                d="M6.38128 49.1539C3.20326 32.893 13.809 17.1346 30.0699 13.9566L70.3846 6.07751C86.6455 2.89948 102.404 13.5052 105.582 29.7661L113.461 70.0808C116.639 86.3417 106.033 102.1 89.7724 105.278L49.4577 113.157C33.1968 116.335 17.4384 105.729 14.2604 89.4686L6.38128 49.1539Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className="flex flex-col pb-4">
            <small className='text-2xl mb-1 font-bold'>Bienvenue !</small>
            <span className="text-xl">Votre sécurité avant tout</span>
          </div>
          <div className="pb-4 text-sm">
            <p>
              Nous utilisons uniquement des cookies nécessaires à des fins
              d'authentification et de sécurité, afin de garantir une navigation optimale
              sur notre site. Merci de votre visite !
            </p>
          </div>
        </div>

        <div className="w-full flex justify-center items-center border-t border-solid border-gray-200 text-sm">
          <button
            className="border-r border-gray-200 flex-1 px-4 py-3 text-gray-500 hover:text-white hover:bg-orange-light duration-150"
            onClick={() => setBannerVisible(false)}
          >
            Non merci.
          </button>
          <button
            className="flex-1 px-4 py-3 text-gray-500 hover:text-white hover:bg-green-light duration-150"
            onClick={() => setBannerVisible(false)}
          >
            Avec plaisir !
          </button>
        </div>
      </div>

      <button
        className="fixed left-4 bottom-2 text-sm px-4 py-3 bg-green-dark text-white rounded-full"
        onClick={() => setBannerVisible(!bannerVisible)}
      >
        Cookies
      </button>
    </div>
  );
};

export default ConsentBanner;
