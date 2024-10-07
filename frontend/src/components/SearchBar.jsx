import React, { useState } from 'react';

function SearchBar(){
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchInput, setSearchInput] = useState(false)

  const toggleSearch = () => {
    setIsSearchVisible(prev => !prev);
  };

  return (
    <>
        <div className="flex items-center">
        <button onClick={toggleSearch} className={"flex justify-center items-center hover:text-orange-light transform hover:scale-105 transition duration-500 focus:outline-none"}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`transition-transform duration-300 ease-in-out transform mr-4 w-8 text-orange-dark absolute ${isSearchVisible ? "opacity-0 rotate-45 scale-0" : "opacity-100 rotate-0 scale-100"}`} viewBox="0 0 20 20" fill="currentColor">
              <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
              />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className={`transition-transform duration-300 ease-in-out transform mr-4 w-8 text-orange-dark ${isSearchVisible ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-45 scale-0"}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
        </button>
        </div>
        {isSearchVisible && 
        <div className='fixed left-0 mt-24 w-full h-6 bg-off-white flex z-0'>
          <div className='flex w-full'>
            <select className="outline-none mx-4 font-text text-center text-orange-dark font-semibold bg-off-white text-sm" name="search">
                <option value="Annonces">Annonces</option>
                <option value="Missions">Missions</option>
                <option value="Parrainages">Parrainages</option>
            </select>
            <input autoFocus className='bg-off-white w-[61.5%] -ml-1 mb-1 outline-none caret-green-dark border-b border-green-dark text-black' type="text" />
          </div>
        </div>}
    </>
  );
};

export default SearchBar;
