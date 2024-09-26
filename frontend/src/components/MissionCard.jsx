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
    const [isDoneCheck, setIsDoneCheck] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [finalIsDone, setFinalIsDone] = useState(false);
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
        if (mission && mission.is_done) {
            setIsDone(true)
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
    };

    useEffect(() => {
       if (mission) {
            const cookie = new Cookies();
        const userId = cookie.get('userId');
        const missionCreator = mission.organization.user.id
        if (userId === missionCreator) {
            setIsCreator(true)
        }
    }
    }, [mission]);

    const handleCheck = () => {
        setIsDoneCheck(true)
    };

    const handleCancelCheck = () => {
        setIsDoneCheck(false)
    };

    const handleConfirmCheck = async () => {
        try {
            const cookie = new Cookies();
            const loginCookie = cookie.get('userLogin')
            const organizationUserId = mission.organization.user.id
            await axios.put(`${url}/mission/${missionId}`, {is_done: 1, organizationUserId}, {headers: {'Authorization': `Bearer ${loginCookie}`}})
            setIsDone(true)
            setIsDoneCheck(false)
            setFinalIsDone(true)
        } catch (error) {
            console.error('Error validating mission', error)
        }
    }

    const handleFinalOk = () => {
        setFinalIsDone(false)
        setIsCreator(false)
    }

    //TODO: handlePostuler pour bouton postuler
    //TODO: same with partager

    if (!mission) return <div>Chargement...</div>

    return (
        <div className='grid gap-4 mr-2 ml-2 text-sm'>
            <div className='grid gap-4 h-full'>
                {/* Row 1 */}
                <div>
                    <img src={mission.picture_url} alt={`Photo de ${mission.title}`} className="max-h-60 w-full" />
                </div>
                {/* Row 2 */}
                <div className='grid grid-cols-card-info h-auto'>
                    {/* Column 1 */}
                    <div className="content-center">
                        <h2 className='font-bold'>{mission.title}</h2>
                        <p className='text-sm'>Posté le {formatDate(mission.created_at)}</p>
                    </div>
                    {/* Column 2 */}
                    <div className="flex items-center justify-center">
                    </div>
                    {/* Column 3 */}
                    <div className='grid grid-cols-2'>
                        <div className="align-self-center justify-self-end flex h-16 w-16">
                            <img src={mission.user_picture_url} alt={`Photo de ${mission.organization.user.organization_name}`} className="rounded-full w-full h-full" />
                        </div>
                        <div className='content-center ml-2'>
                            <p className='text-left font-bold'>{mission.organization.user.organization_name}</p>
                            <button className='text-sm text-center hover:bg-orange-light hover:border-orange-dark hover:border hover:rounded-lg' onClick={handleConsultProfile}>Consulter le profil</button>
                        </div>
                    </div>
                </div>
                {/* Row 3 */}
                <div>
                {isCreator && (<div className="flex justify-center">
                    <button 
                       onClick={handleEditing}
                       className="bg-orange-dark border-orange-dark max-w-28 px-3 mx-2 text-sm font-bold text-white border rounded-lg shadow-lg flex-1 transform btn-active btn-hover btn-flex">
                        Modifier
                        </button>
                        <button onClick={handleCheck}
                       className="bg-orange-dark border-orange-dark max-w-28 px-3 mx-2 text-sm font-bold text-white border rounded-lg shadow-lg flex-1 transform btn-active btn-hover btn-flex">
                        Terminée
                        </button>
                    </div>)}
                    <div className='grid grid-cols-card-info h-auto'>
                        {/* Column 1 */}
                        <div className="mt-3">
                            <h3 className='font-bold'>Description</h3>
                            <p className='text-sm'>Catégorie: {mission.category}</p>
                            <p className='text-sm'>Durée: {mission.number_of_hours}h</p>
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
                        <p>Besoin de {mission.volunteer_number == 1 ? '1 bénévole.' : `${mission.volunteer_number} bénévoles.`}</p>
                    </div>
                </div>
            </div>
            <div className='flex flex-col text-center justify-center mt-8'>
                {isDone && (<p>Cette mission est terminée.</p>)}
                <div className='flex space-x-4 max-w-sm w-full my-4'>
                    <button onClick={handleContact} className='bg-off-white border-orange-dark border rounded-lg shadow-lg flex-1 transform btn-active btn-hover btn-flex'>
                        Contacter
                    </button>
                    <button className='bg-orange-dark border-orange-dark disabled:hidden  font-bold text-white border rounded-lg shadow-lg flex-1 transform btn-active btn-hover btn-flex'
                    disabled={isDone}>
                        Postuler
                    </button>
                    <button className='bg-off-white border-orange-dark border rounded-lg shadow-lg sm:flex-1 flex-shrink-0 w-10 sm:w-auto transform btn-active btn-hover sm:btn-flex-shrink'>
                        <span className="hidden sm:block">Partager</span>
                        <FaShare size={20} className='inline mb-0.5 sm:hidden ml-0.5' />
                    </button>
                </div>
            </div>
            <div>
                <p className="mb-1">Misssions dans la même ville</p>
                <MissionList missions={missions} />
            </div>
            {isDoneCheck && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
                        <p className="text-center text-lg font-semibold">Marquer la mission comme terminée ?</p>
                        <p className="text-center text-sm font-semibold">(cette action est irréversible)</p>
                        <div className="flex mt-3 gap-3">
                            <button className="bg-orange-dark border-orange-dark font-bold text-white border rounded-lg shadow-lg flex-1 transform btn-active btn-hover btn-flex"
                                onClick={handleConfirmCheck}
                            >Oui
                            </button>
                            <button className="bg-orange-dark border-orange-dark font-bold text-white border rounded-lg shadow-lg flex-1 transform btn-active btn-hover btn-flex"
                                onClick={handleCancelCheck}
                            >Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}
             {finalIsDone && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
                        <p className="text-center text-lg font-semibold">Maission terminée !</p>
                        <div className="flex mt-3 gap-3">
                            <button className="bg-orange-dark border-orange-dark font-bold text-white border rounded-lg shadow-lg flex-1 transform btn-active btn-hover btn-flex"
                                onClick={handleFinalOk}
                            >Ok
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MissionCard