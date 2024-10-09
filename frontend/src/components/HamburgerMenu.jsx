import { Link } from "react-router-dom"
import classNames from 'classnames';
import { useState } from 'react';

export default function HamburgerMenu() {
  const [opened, setOpened] = useState(false);
  const [logged, setLogged] = useState(false)

  const toggle = () => {
    setOpened(prev => !prev)
  }

  const log = () => {
    setLogged(prev => !prev)
  }

  return (
    <>
    <div onClick={toggle} className={classNames(`-mr-2 tham tham-e-squeeze tham-w-6 z-30`, { 'tham-active': opened })}>
      <div className="tham-box z-30">
        <div className="tham-inner bg-orange-dark z-30" />
      </div>
    </div>
    {opened &&  
    <div className="flex w-full h-full">
      <div className="bg-white/30 w-full h-full backdrop-blur-sm fixed left-0 top-20">
      </div>
      <div className="bg-green-dark fixed right-0 h-full w-[50%] top-0 z-20 shadow-md">
          <div className="w-full h-20"></div>
            <div className="flex flex-col justify-between h-full text-sm text-off-white">
              <div className="flex flex-col text-center mt-6 mx-auto px-10 rounded-md">
                {!logged && 
                <>
                  <Link className="font-bold my-3" to={`/register`}>M'inscrire</Link>
                  <hr className="mx-auto w-10 border-turquoise"/>
                  <Link onClick={log} className="my-3" to={``}>Connexion</Link>
                  <hr className="mx-auto w-10 border-turquoise"/>
                </>}
                {logged && 
                  <>
                    <Link className="my-3 font-bold" to={`/profile`}>Mon Profil </Link>
                    <hr className="mx-auto w-10 border-turquoise"/>
                  </>
                }
                <Link className="my-3 mx-auto" to={`/mission`}>Missions</Link>
                <hr className="mx-auto w-10 border-turquoise"/>
                <Link className="my-3" to={`/annonce`}>Annonces</Link>
                <hr className="mx-auto w-10 border-turquoise"/>
                <Link className="my-3" to={`/parrainage`}>Parrainage</Link>
              </div>
              {logged && 
                <button onClick={log} className="mb-44 text-sm font-semibold text-orange-light" >Déconnexion</button>
              }
            </div>
            {logged && 
            <>
              <div className="fixed bottom-0 text-gray-800 flex w-full mx-auto bg-orange-light p-3">
                <img className="rounded-full border-spacing border-2 border-green-dark drop-shadow-xl w-14" src="https://placecats.com/50/50" alt="" />
                <div className="flex flex-col mt-2 ml-3 font-text text-sm">
                  <span className="mr-1 font-semibold">Steven Miaou</span>
                  <span className="text-[13px]">Bénévole</span>
                </div>
              </div>
            </>
          }
      </div>
    </div>}
    </>
  );
}