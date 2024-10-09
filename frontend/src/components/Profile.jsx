import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import MissionList from "./MissionList";


function Profile() {
    const [user, setUser] = useState();
    const [isOrganization, setIsOrganization] = useState(false);
    const [isCreator, setIsCreator] = useState(false);
    const [missions, setMissions] = useState([]);
    const { userId } = useParams();

    const url = import.meta.env.VITE_API_URL

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`${url}/user/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };
        fetchUserDetails();
    }, [userId]);

    useEffect(() => {
        if (user) {
            const cookie = new Cookies();
            const userId = cookie.get('userId');

            const userCreator = user.id
            if (userId === userCreator) {
                setIsCreator(true);
            }

            if (user.is_organization) {
                setIsOrganization(true);
            }
        }
    }, [user]);

    useEffect(() => {
        const fetchMissions = async () => {
            if (user && user.is_organization) {
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
            else if (user) {
                try {
                    const response = await axios.get(`${url}/application/user/${userId}/missions`);
                    const missionIds = response.data.map((item) => item.missionId);
    
                    const missionRequests = missionIds.map((missionId) => {
                      return axios.get(`${url}/mission/${missionId}`);
                    });
                
                    const responses = await Promise.all(missionRequests);
                    const missions = responses.map((response) => response.data);
                
                    const notDoneMissions = missions.filter((mission) => mission.is_done === 0);
                    const doneMissions = missions.filter((mission) => mission.is_done === 1);

                    setMissions(notDoneMissions);
                } catch (error) {
                    console.error('Error fetching missions', error);
                }
            }
    }
        fetchMissions();
    }, [userId, user]);

    return (
        <div>
            {user && (
                <div className="flex flex-col pt-6 items-center min-h-screen">
                    <div className="w-11/12 bg-white/50 mt-3 rounded-lg shadow-md my-4">
                        <img src={user.banner_url} className="w-full rounded-t-lg" alt="Banner" />
                        <div className=" mx-3 pb-6">
                            <div className="flex">
                                <div className="relative bottom-10 h-24 w-24">
                                    <img src={user.picture_url} className="rounded-full w-full h-full" alt="Logo" />
                                </div>
                                <div className="ml-3">
                                    {isOrganization && (
                                        <h2 className="font-bold mt-1">
                                            {user.organization_name}
                                        </h2>)}
                                    {!isOrganization && (
                                        <h2 className="font-bold">
                                            {user.firstname} {user.lastname}
                                        </h2>)}
                                    <p className="text-sm">
                                        {user.city}
                                    </p>
                                </div>
                            </div>
                            {isCreator && (
                                <Link to={`/user/edition`}>
                                <button className="bg-orange-dark border-orange-dark font-bold text-white text-xs my-2 px-2 border rounded-lg shadow-md transform btn-active btn-hover">
                                    Modifier profil
                                </button>
                                </Link>
                            )}
                            {user.description && (
                                <div>
                                    <h3 className="font-bold">Description</h3>
                                    <p className="text-justify text-sm">{user.description}</p>
                                </div>)}
                        </div>
                    </div>
                    <div className="w-11/12 bg-white/50 rounded-lg shadow-md px-2 my-4">
                        <div className="flex items-center mb-2">
                            <h3 className="font-bold">Mes missions</h3>
                            <div className="flex justify-end space-x-2 ml-auto">
                                {isCreator && isOrganization && (
                                    <Link to={'/mission/creation'}>
                                    <button className="bg-orange-dark border-orange-dark font-bold text-white text-xs px-2 border rounded-lg shadow-md transform btn-active btn-hover">
                                        Créer
                                    </button>
                                    </Link>
                                )}
                                <Link to={`/user/${userId}/mission`}>
                                <button className="bg-orange-dark border-orange-dark font-bold text-white text-xs px-2 border rounded-lg shadow-md transform btn-active btn-hover">
                                    Consulter
                                </button>
                                </Link>
                            </div>
                        </div>
                        <MissionList missions={missions} />
                    </div>
                    <div className="w-11/12 bg-white/50 rounded-lg shadow-md px-2 my-4">
                        <h3 className="font-bold">Mes Parrainages</h3>
                        <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut dui et lectus luctus mattis bibendum nec est.</p>
                    </div>
                </div>)}
        </div>
    )
}

export default Profile