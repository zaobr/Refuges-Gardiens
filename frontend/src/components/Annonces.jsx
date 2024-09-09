<link
  href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap"
  rel="stylesheet"
></link>;

import React from "react";

const Annonces = () => {
  return (
    <div className="dispo flex bg-green-500/75  m-3 pb-3 rounded-lg justify-start flex-col">
      <div className="flex justify-between items-center ">
        <h1 className="p-5 font-Raleway text-left text-base font-bold leading-[18.78px]">
          Mes Annonces
        </h1>
        <button className=" font-Raleway px-4 py-1 m-2 text-white bg-orange-500/95 rounded-full">
          Consulter
        </button>
        <button className=" font-Raleway px-4 py-1 m-2 text-white bg-orange-500/95 rounded-full">
          Créer
        </button>
      </div>

      <div className="bg-orange-200 p-3 mx-2 rounded-lg flex flex-col justify-center items-center ">
        <div className="flex items-center w-full">
          <div>
            <img
              className="w-24 rounded-full"
              src="../public/profil.png"
              alt=""
            />
          </div>
          
            <div className="flex justify-between  w-full ml-4 mb-12">
              <h1>Titre de l'annonce</h1>
              <span>Utilisateur</span>
            </div>
            <div className="mt-">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit
              </p>
            </div>
          </div>
        </div>
      </div>

  );
};

export default Annonces;
