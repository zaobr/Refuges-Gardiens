import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
        <header className="sticky pt-2 top-0 w-full h-[5rem] p-2 bg-off-white grid-cols-card-info items-center flex justify-between z-20">
        <Link to={"/"}>
        <div className="ml-2 flex">
            <img className="mr-1 w-[65px] h-[65px] z-20" src="/logo_RG_petit.png" alt="logo" />
            <div className="title flex justify-start items-center antialiased ml-1">
            <div class="mr-4 h-[55px]  bg-orange-light w-[1px]"></div>
            <div className="flex flex-col">
                <span className="mb-1 z-20 font-title font-bold text-[18px] text-orange-dark text-center tracking-wide">Refuges</span>
                <hr className="mx-auto w-16 -mb-3.5 border-light-blue"/>
                <span className="z-10 -mb-2.5 mx-auto w-7 font-title font-bold text-[16px] text-orange-dark bg-off-white text-center">&</span>
                <span className="z-20 font-title font-bold text-[18px] text-orange-dark text-center tracking-wide">Gardiens</span>
            </div>
            </div>
        </div>
        </Link>
        <Navbar />
        </header>
    </>
    
  );
}

export default Header;

// TODO: FAIRE BOUTON LOGOUT QUI EFFACE LE COOKIE DE NAVIGATION
