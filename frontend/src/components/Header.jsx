import Navbar from './Navbar'

function Header() {
    return (
        <header className=''>
            <div className="app-icon">
                <h1>Refuge & Gardiens</h1>
            </div>
            <Navbar/>
        </header>
    )
}

export default Header

// TODO: FAIRE BOUTON LOGOUT QUI EFFACE LE COOKIE DE NAVIGATION