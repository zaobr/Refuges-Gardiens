import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../utils/dateFormatUtils";
import { FaShare } from "react-icons/fa";
import MissionList from "./MissionList";
import Cookies from 'universal-cookie';

function MissionCard() {
    const { missionId } = useParams();
    const [mission, setMission] = useState();
    const navigate = useNavigate();
    const [missions, setMissions] = useState([]);
    const [isCreator, setIsCreator] = useState(false);
    const url = import.meta.env.VITE_API_URL

    useEffect(() => {
        const fetchMissionDetails = async () => {
            try {
                const response = await axios.get(`${url}/mission/${missionId}`);
                setMission(response.data);
            } catch (error) {
                console.error("Error fetching mission details:", error);
            }
        };
        fetchMissionDetails();
    }, [missionId]);

    useEffect(() => {
        if (mission && mission.city) {
            const fetchMoreMissions = async () => {
                try {
                    const response = await axios.get(`${url}/mission`, {
                        params: { city: mission.city, limit: 10, excludeMissionId: Number(missionId) }
                    });
                    setMissions(response.data);
                } catch (error) {
                    console.error('Error fetching similar missions', error);
                }
            };
            fetchMoreMissions();
        }
    }, [mission]);

    const handleConsultProfile = () => {
        navigate(`/user/${mission.organization.user.id}`)
    };

    const handleContact = () => {
        const email = `${mission.organization.user.email}`;
        const subject = encodeURIComponent(`Mission ${mission.title}`);

        window.location.href = `mailto:${email}?subject=${subject}`;
    };

    const handleEditing = () => {
        navigate(`edition`)
    }

    useEffect(() => {
       if (mission) {
            const cookie = new Cookies();
        const userId = cookie.get('userId');

        const missionCreator = mission.organization.user.id
        if (userId === missionCreator) {
            setIsCreator(true)
        }
    }

    }, [mission])

    //TODO: handlePostuler pour bouton postuler
    //TODO: same with partager

    if (!mission) return <div>Chargement...</div>

    return (
        <div className='grid gap-4 mr-2 ml-2'>
            <div className='grid gap-4 h-full'>
                {/* Row 1 */}
                <div>
                    <img src={mission.picture} alt={`Photo de ${mission.title}`} className="max-h-60 w-full" />
                </div>
                {/* Row 2 */}
                <div className='grid grid-cols-card-info h-auto'>
                    {/* Column 1 */}
                    <div className="content-center">
                        <h2 className='font-bold'>{mission.title}</h2>
                        <p className='text-sm'>Posté le {formatDate(mission.createdAt)}</p>
                    </div>
                    {/* Column 2 */}
                    <div className="flex items-center justify-center">
                       {isCreator && (<button 
                       onClick={handleEditing}
                       className="bg-orange-dark border-orange-dark max-w-28 px-3 font-bold text-white border rounded-lg shadow-lg flex-1 transform btn-active btn-hover btn-flex">
                        Modifier
                        </button>)}
                    </div>
                    {/* Column 3 */}
                    <div className='grid grid-cols-2'>
                        <div className="content-center flex justify-end">
                            <img src={mission.organization.user.picture} alt={`Photo de ${mission.organization.user.organizationName}`} className="h-20" />
                        </div>
                        <div className='content-center'>
                            <p className='text-left'>{mission.organization.user.organizationName}</p>
                            <button className='text-sm text-center' onClick={handleConsultProfile}>Consulter le profil</button>
                        </div>
                    </div>
                </div>
                {/* Row 3 */}
                <div>
                    <div className='grid grid-cols-card-info h-auto'>
                        {/* Column 1 */}
                        <div>
                            <h3 className='font-bold'>Description</h3>
                            <p className='text-sm'>Catégorie: {mission.category}</p>
                            <p className='text-sm'>Durée: {mission.numberOfHours}h</p>
                        </div>
                        {/* Column 2 */}
                        <div></div>
                        {/* Column 3 */}
                        <div className='text-right'>
                            <p>{mission.city}</p>
                            <p className='text-sm'>{formatDate(mission.deadline)}</p>
                        </div>
                    </div>
                    <div>{mission.description}</div>
                    <div className="flex justify-end">
                        <p>Besoin de {mission.volunteerNumber == 1 ? '1 bénévole.' : `${mission.volunteerNumber} bénévoles.`}</p>
                    </div>
                </div>
            </div>
            <div className='flex justify-center mt-8'>
                <div className='flex space-x-4 max-w-sm w-full my-4'>
                    <button onClick={handleContact} className='bg-off-white border-orange-dark border rounded-lg shadow-lg flex-1 transform btn-active btn-hover btn-flex'>
                        Contacter
                    </button>
                    <button className='bg-orange-dark border-orange-dark font-bold text-white border rounded-lg shadow-lg flex-1 transform btn-active btn-hover btn-flex'>
                        Postuler
                    </button>
                    <button className='bg-off-white border-orange-dark border rounded-lg shadow-lg sm:flex-1 flex-shrink-0 w-10 sm:w-auto transform btn-active btn-hover sm:btn-flex-shrink'>
                        <span className="hidden sm:block">Partager</span>
                        <FaShare size={20} className='inline mb-0.5 sm:hidden ml-0.5' />
                    </button>
                </div>
            </div>
            <div>
                <p>Misssions dans la même ville</p>
                <MissionList missions={missions} />
            </div>
        </div>
    )
}

export default MissionCard