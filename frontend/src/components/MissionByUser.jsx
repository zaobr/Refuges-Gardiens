import { useState, useEffect } from "react";
import MissionList from "./MissionList";
import { useParams } from "react-router-dom";
import axios from "axios";

function MissionByUser() {
    const { userId } = useParams();
    const [missions, setMissions] = useState([]);
    const [oldMissions, setOldMissions] = useState([]);
    const [oldMissionsCheck, setOldMissionsCheck] = useState(false);
    const [user, setUser] = useState();

    const url = import.meta.env.VITE_API_URL

    useEffect(() => {
        const fetchMissions = async () => {
            try {
                const organization = await axios.get(`${url}/organization/${userId}`);
                const organizationId = organization.data.id;
                const response = await axios.get(`${url}/mission`, {
                    params: { organizationId: organizationId }
                });
                const responseOldMissions = await axios.get(`${url}/mission`, {
                    params: { organizationId: organizationId, isDone: 1, }
                });
                setMissions(response.data)
                setOldMissions(responseOldMissions.data)
            } catch (error) {
                console.error('Error fetching missions', error);
            }
        }
        fetchMissions();
    }, [userId]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${url}/user/${userId}`);
                setUser(response.data)
            } catch (error) {
                console.error('Error fetching user details', error);
            }
        }
        fetchUser();
    }, [userId])

    const handleSeeOldMissions = () => {
        setOldMissionsCheck(!oldMissionsCheck);
    }

    return (
        <div className="min-h-screen w-full">
            <div className="h-1/2 w-full bg-[url('/background_rg.jpg')] bg-cover bg-center mb-1 flex justify-center">
                <div className="h-1/2 w-11/12 bg-white/70 mt-3 rounded-lg shadow-md my-4 flex items-center justify-center text-center font-bold">
                    <div>
                        <h2 >Missions de l'association</h2>
                        {user && (<h2>{user.organization_name}</h2>)}
                    </div>
                </div>
            </div>
            <div className="flex justify-start items-center ml-2 mb-2">
                <p className="pb-1 mr-2 text-sm">Voir les missions terminées</p>
                <label className="relative inline-flex cursor-pointer items-center">
                    <input id="switch-2" type="checkbox" className="peer sr-only" onClick={handleSeeOldMissions}/>
                    <label className="hidden"></label>
                    <div className="peer h-4 w-11 rounded-full border bg-slate-200 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-orange-dark peer-checked:after:translate-x-full peer-focus:ring-orange-light"></div>
                </label>
            </div>
            <MissionList missions={missions} />
            {oldMissionsCheck && (
                <div>
                    <h3>Missions terminées</h3>
                    <MissionList missions={oldMissions} />
                </div>
            )}
        </div>
    )
}

export default MissionByUser