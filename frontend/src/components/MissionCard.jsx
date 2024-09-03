import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/dateFormatUtils";
import { FaShare } from "react-icons/fa";

const MissionCard = ({ missionId }) => {
    const [mission, setMission] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMissionDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/mission/${missionId}`);
                setMission(response.data);
            } catch (error) {
                console.error("Error fetching mission details:", error);
            }
        };
        fetchMissionDetails();
    }, [missionId]);

    const handleConsultProfile = () => {
        navigate(`/user/${mission.organization.user.id}`)
    };

    const handleContact = () => {
        const email = `${mission.organization.user.email}`;
        const subject = encodeURIComponent(`Mission ${mission.title}`);

        window.location.href = `mailto:${email}?subject=${subject}`;
    };

    //TODO: handlePostuler pour bouton postuler
    //TODO: same with partager
    //TODO: Fonction pour modifier la page quand on en est le créateur

    if (!mission) return <div>Loading...</div>

    return (
        <div className='grid-rows-3 gap-4 mr-2 ml-2'>
            <div className='grid grid-rows-3 gap-4'>
                <div>
                    <img src={mission.picture} alt={`Photo de ${mission.title}`} />
                </div>
                <div className='grid grid-cols-card-info'>
                    {/* Column 1 */}
                    <div>
                        <h2 className='font-bold'>{mission.title}</h2>
                        <p className='text-sm'>Posté le {formatDate(mission.createdAt)}</p>
                    </div>
                    {/* Column 2 */}
                    <div></div>
                    {/* Column 3 */}
                    <div className='grid grid-cols-2'>
                        <div>
                            <img src={mission.organization.user.picture} alt={`Photo de ${mission.organization.user.organizationName}`} />
                        </div>
                        <div className='ml-3'>
                            <p className='text-center'>{mission.organization.user.organizationName}</p>
                            <button className='text-sm text-center' onClick={handleConsultProfile}>Consulter le profil</button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='grid grid-cols-card-info'>
                        {/* Column 1 */}
                        <div>
                            <h3 className='font-bold'>Description</h3>
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
                <div className='flex space-x-4 max-w-sm w-full'>
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
        </div>
    )
}
//TODO: missions similaires

export default MissionCard