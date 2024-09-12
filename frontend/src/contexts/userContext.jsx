import { createContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(undefined);
    const url = import.meta.env.VITE_API_URL;
    const cookie = new Cookies();
    const userId = cookie.get('userId');
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${url}/user/${userId}`)
                setUser(response.data)
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        fetchUserData();
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

// pour l'utiliser:  const { user } = useContext(UserContext);