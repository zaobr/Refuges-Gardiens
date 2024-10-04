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
    const [userId, setUserId] = useState();
    const [applied, setApplied] = useState(false);
    const [applicationId, setApplicationId] = useState();
    const [loginCookie, setLoginCookie] = useState();
    const [applyPopup, setApplyPopup] = useState(false);

    const url = import.meta.env.VITE_API_URL

    const cookie = new Cookies();

    useEffect(() => {
        setLoginCookie(cookie.get('userLogin'))
    })

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
            setUserId(cookie.get('userId'));
        }
    }, [mission]);

    useEffect(() => {
        if (mission && userId) {
            const missionCreator = mission.organization.user.id;
            if (userId === missionCreator) {
                setIsCreator(true);
            }
        }
    }, [mission, userId]);

    //Vérifier si user a postulé
    useEffect(() => {
        const fetchApplicationStatus = async () => {
            try {
                const response = await axios.get(`${url}/application/mission/${mission.id}/users`);
                const application = response.data.find(application => application.userId === userId);

                const userApplied = !!application;
                setApplied(userApplied);

                if (application) {
                    setApplicationId(application.applicationId);
                }

            } catch (error) {
                console.error('Error fetching application status', error)
            }
        }
        if (mission && userId) {
            fetchApplicationStatus();
        }
    }, [mission, userId]);

    const handleIsDone = () => {
        setIsDoneCheck(true)
    };

    const handleCancel = () => {
        setIsDoneCheck(false)
        setApplyPopup(false)
    };

    const handleConfirmIsDone = async () => {
        try {
            const organizationUserId = mission.organization.user.id
            await axios.put(`${url}/mission/${missionId}`, { is_done: 1, organizationUserId }, { headers: { 'Authorization': `Bearer ${loginCookie}` } })
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

    const handleApply = async () => {
        if (loginCookie) {
            try {
                const applicationData = {
                    user_id: userId,
                    mission_id: mission.id,
                };
                const response = await axios.post(`${url}/application/`, applicationData, {
                    headers: {
                        'Authorization': `Bearer ${loginCookie}`
                    }
                });
                if (response.status === 201) {
                    setApplied(true);
                    const newApplicationId = response.data.application_id;
                    setApplicationId(newApplicationId);
                }
            } catch (error) {
                console.error('Error applying to this mission', error)
            }
        } else {
            setApplyPopup(true);
        }
    }

    const handleRetireApplication = async () => {
        try {
            const response = await axios.delete(`${url}/application/${applicationId}`, { headers: { 'Authorization': `Bearer ${loginCookie}` } })
            if (response.status === 200) {
                setApplied(false);
            }
        } catch (error) {
            console.error('Error canceling application', error)
        }
    }

    const handleSeeApplications = () => {
        navigate('applicants')
    }

    const handleGoLogin = () => {
        navigate('/login')
    }

    //TODO: bouton partager

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
                        <button onClick={handleIsDone}
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
                {applied && (<p>Vous avez candidaté à cette mission.</p>)}
                <div className='flex space-x-4 max-w-sm w-full my-4'>
                    {!isCreator && (<button onClick={handleContact} className='bg-off-white border-orange-dark border rounded-lg shadow-lg flex-1 transform btn-active btn-hover btn-flex'>
                        Contacter
                    </button>)}
                    {!applied && !isCreator && (<button className='bg-orange-dark border-orange-dark disabled:hidden  font-bold text-white border rounded-lg shadow-lg flex-1 transform btn-active btn-hover btn-flex'
                        disabled={isDone} onClick={handleApply}>
                        Postuler
                    </button>)}
                    {applied && (<button className='bg-orange-dark border-orange-dark disabled:hidden  font-bold text-white border rounded-lg shadow-lg flex-1 transform btn-active btn-hover btn-flex'
                        disabled={isDone} onClick={handleRetireApplication}>
                        Retirer candidature
                    </button>)}
                    {isCreator && (<button className='bg-orange-dark border-orange-dark disabled:hidden  font-bold text-white border rounded-lg shadow-lg flex-1 transform btn-active btn-hover btn-flex'
                        disabled={isDone} onClick={handleSeeApplications}>
                        Voir les candidatures
                    </button>)}
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
                                onClick={handleConfirmIsDone}
                            >Oui
                            </button>
                            <button className="bg-orange-dark border-orange-dark font-bold text-white border rounded-lg shadow-lg flex-1 transform btn-active btn-hover btn-flex"
                                onClick={handleCancel}
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
             {applyPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
                        <p className="text-center text-lg font-semibold">Vous devez vous connecter pour postuler à cette mission</p>
                        <div className="flex mt-3 gap-3">
                            <button className="bg-orange-dark border-orange-dark font-bold text-white border rounded-lg shadow-lg flex-1 transform btn-active btn-hover btn-flex"
                                onClick={handleGoLogin}
                            >Connexion
                            </button>
                            <button className="bg-off-white border-orange-dark font-bold text-black border rounded-lg shadow-lg flex-1 transform btn-active btn-hover btn-flex"
                                onClick={handleCancel}
                            >Fermer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MissionCard