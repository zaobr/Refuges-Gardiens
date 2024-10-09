import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { BsFillXSquareFill, BsFillCheckSquareFill, BsFillDashSquareFill } from "react-icons/bs";

function Applicant() {
    const { missionId } = useParams();
    const [mission, setMission] = useState();
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState();
    const [accepted, setAccepted] = useState([]);
    const [loginCookie, setLoginCookie] = useState();
    const [applications, setApplications] = useState([]);

    const navigate = useNavigate();
    const url = import.meta.env.VITE_API_URL
    const cookie = new Cookies();

    useEffect(() => {
        setLoginCookie(cookie.get('userLogin'))
    })

    // récupère les données de la mission (pour on id)
    useEffect(() => {
        const fetchMissionDetails = async () => {
            if (!missionId) {
                console.error("Mission ID is not defined");
                return;
            }
            try {
                const response = await axios.get(`${url}/mission/${missionId}`);
                setMission(response.data);
            } catch (error) {
                console.error("Error fetching mission details:", error.response ? error.response.data : error.message);
            }
        };
        fetchMissionDetails();
    }, [missionId]);

    // récupère id du user connecté
    useEffect(() => {
        if (mission) {
            setUserId(cookie.get('userId'));
        }
    }, [mission]);

    // vérifie si le user connecté est le créateur de la mission, sinon 403
    useEffect(() => {
        if (mission && userId) {
            const missionCreator = mission.organization.user.id;
            if (userId !== missionCreator) {
                navigate('/403')
            }
        }
    }, [mission, userId]);

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                // Fetch all applications for the mission
                const response = await axios.get(`${url}/application/mission/${missionId}/users`);
                const applications = response.data;
    
                // Fetch user details for each applicant
                const userRequests = applications.map(applicant =>
                    axios.get(`${url}/user/${applicant.userId}`)
                );
                const userResponses = await Promise.all(userRequests);
                const userDetails = userResponses.map(res => res.data);
    
                // Combine applications with user details
                const applicantsWithDetails = applications.map((applicant, index) => ({
                    applicationId: applicant.applicationId,
                    ...userDetails[index], // Add user details
                }));
    
                setApplications(applications); // Set raw applications data
    
                // Fetch application details (is_accepted status)
                const applicationDetailsRequests = applications.map(application =>
                    axios.get(`${url}/application/${application.applicationId}`, {
                        headers: { 'Authorization': `Bearer ${loginCookie}` }
                    })
                );
                const applicationDetailsResponses = await Promise.all(applicationDetailsRequests);
                const applicationDetails = applicationDetailsResponses.map(res => res.data);
    
                // Sort applications by acceptance status
                const acceptedApplicants = applicantsWithDetails.filter(
                    (applicant, index) => applicationDetails[index].is_accepted === 1
                );
                const pendingApplicants = applicantsWithDetails.filter(
                    (applicant, index) => applicationDetails[index].is_accepted === 0
                );
    
                // Set both accepted and pending applicants
                setAccepted(acceptedApplicants);
                setApplicants(pendingApplicants);
            } catch (error) {
                console.error('Error fetching applicants or details:', error);
            } finally {
                setLoading(false);
            }
        };
    
        if (missionId) {
            fetchApplicants();
        }
    }, [missionId, loginCookie]);
    
    

    const handleSeeProfile = (applicantId) => {
        navigate(`/user/${applicantId}`)
    }

    const handleGoBack = () => {
        navigate(`/mission/${missionId}`)
    }

    const handleAccept = async (applicant) => {
        try {
            if (accepted.some(acc => acc.id === applicant.id)) {
                return;
            }
            await axios.put(`${url}/application/${applicant.applicationId}`, { is_accepted: 1 }, {
                headers: { 'Authorization': `Bearer ${loginCookie}` }
            });
            setAccepted(prevAccepted => [...prevAccepted, applicant]);
            setApplicants(prevApplicants => prevApplicants.filter(acc => acc.id !== applicant.id)); 
        } catch (error) {
            console.error('Error accepting applicant:', error);
        }
    };

    const handleRemove = async (applicant) => {
        try {
            await axios.put(`${url}/application/${applicant.applicationId}`, { is_accepted: 0 }, {
                headers: { 'Authorization': `Bearer ${loginCookie}` }
            });
            setAccepted(prevAccepted => prevAccepted.filter(acc => acc.id !== applicant.id));
            setApplicants(prevApplicants => [...prevApplicants, applicant]);
        } catch (error) {
            console.error('Error removing applicant:', error);
        }
    };

    const handleDelete = async (applicant) => {
        try {
            await axios.delete(`${url}/application/${applicant.applicationId}`, {
                headers: { 'Authorization': `Bearer ${loginCookie}` }
            });
            
            setAccepted(prevAccepted => prevAccepted.filter(acc => acc.id !== applicant.id));
            setApplicants(prevApplicants => prevApplicants.filter(acc => acc.id !== applicant.id)); 
        } catch (error) {
            console.error('Error deleting applicant', error);
        }
    }

    if (!mission || loading) {
        return <p>Loading applicants...</p>;
    }

    return (
        <div>
            <button
                onClick={handleGoBack}
                className="bg-orange-dark border-orange-dark max-w-28 px-3 mx-2 text-sm font-bold text-white border rounded-lg shadow-lg flex-1 transform btn-active btn-hover btn-flex absolute left-0">
                Retour
            </button>
            <div className="bg-white bg-opacity-60 m-2 mb-5 mt-6 rounded-xl">
                <h1 className="mb-4">Volontaires en attente pour la mission {mission.title}: {applicants.length}</h1>
                <ul>
                    {applicants.map(applicant => (
                        <div className="flex flex-row">
                            <li key={applicant.id}
                                className="bg-off-white hover:bg-orange-light w-full pr-3 flex flex-row text-xs mb-2 h-20 hover:cursor-pointer"
                                onClick={() => handleSeeProfile(applicant.id)}
                            >
                                <img src={applicant.picture_url} alt="Photo de profil" />
                                <div className="flex flex-col ml-2">
                                    <p>{applicant.firstname} {applicant.lastname}</p>
                                    <p>Email: {applicant.email}</p>
                                    <p>Téléphone: {applicant.phone_number}</p>
                                </div>
                            </li>
                            <div className="flex flex-row gap-2 ml-2">
                                <button onClick={() => handleAccept(applicant)}>
                                    <BsFillCheckSquareFill size={30} className="text-green-600 hover:text-green-700" />
                                </button>
                                <button onClick={() => handleDelete(applicant)}>
                                    <BsFillXSquareFill size={30} className="text-red-600 hover:text-red-700" />
                                </button>
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
            {accepted.length > 0 && (
                <div className="mt-4">
                    <h2>Volontaires retenus:  {accepted.length}/{mission.volunteer_number}</h2>
                    <ul>
                        {accepted.map(applicant => (
                            <div className="flex flex-row">
                                <li key={applicant.id}
                                    className="bg-green-light hover:bg-orange-light w-full pr-3 flex flex-row text-xs mb-2 h-20 hover:cursor-pointer"
                                    onClick={() => handleSeeProfile(applicant.id)}
                                >
                                    <img src={applicant.picture_url} alt="Photo de profil" />
                                    <div className="flex flex-col ml-2">
                                        <p>{applicant.firstname} {applicant.lastname}</p>
                                        <p>Email: {applicant.email}</p>
                                        <p>Téléphone: {applicant.phone_number}</p>
                                    </div>
                                </li>
                                <div className="flex flex-row gap-2 ml-2">
                                    <button onClick={() => handleRemove(applicant)}>
                                        <BsFillDashSquareFill size={30} className="text-orange-500 hover:text-orange-600" />
                                    </button>
                                    <button onClick={handleDelete}>
                                        <BsFillXSquareFill size={30} className="text-red-600 hover:text-red-700" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>)}
        </div>
    );
};

export default Applicant