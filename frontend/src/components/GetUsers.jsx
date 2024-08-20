import { useState } from "react"
import axios from 'axios'
import Cookies from "universal-cookie"

//composant test
const cookies = new Cookies(null, { path: '/' });
function GetUsers() {
    const [result, setResult] = useState([])

    const handleGetUsers = async () => {
    const response = await axios.get('http://localhost:5000/user', {headers: {'Authorization': 'Bearer ' + cookies.get('userLogin')}
    });
    setResult(response)
    console.log(result)

    }
    return (
        <>
        <button onClick={handleGetUsers}>Search users</button>
        </>
    )
}

export default GetUsers