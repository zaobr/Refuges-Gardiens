import { Link } from "react-router-dom"
import HamburgerMenu from "./HamburgerMenu"
import SearchBar from "./SearchBar"

function Navbar() {

    return (
        <nav className="flex items-center mr-4">
            <SearchBar />
            <HamburgerMenu />
        </nav>
    )
}

export default Navbar