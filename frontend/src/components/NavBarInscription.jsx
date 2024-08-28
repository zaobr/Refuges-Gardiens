import React from 'react';

const NavBarInscription = () => {
  return (
    <div className='NavBar'>
      <img src="../public/logo_rg_petit.png" alt="logo" />
      <div className='title'>
      <span className='and'>&</span>
      <div className='regard'>
      <span className='refuges'>Refuges</span>
      <span className='gardiens'>Gardiens</span>
      </div>
      </div>
      <div className='icon'>
       <svg className='search' xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="50px" fill="#F9A243"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
      <svg className='menu' xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="50px" fill="#F9A243"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg> 
      </div>
    </div>
    
    
  );
};

export default NavBarInscription;