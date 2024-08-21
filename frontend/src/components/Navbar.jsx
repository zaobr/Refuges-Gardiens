import { Link } from "react-router-dom"

function Navbar() {

    return (
        <div>
        <Link to={`/register`}>Register</Link>
        <Link to={`/login`}>login</Link>
        <Link to={`/`}>Home</Link>
        </div>
    )
}

export default Navbar