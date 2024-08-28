import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

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
        if (mission?.user) {
            navigate(`user/${mission.user.id}`)
        }
    };

    if (!mission) return <div>Loading...</div>

    return (
        <div>
            <div>
                <img src={mission.picture} alt={`Photo de ${mission.title}`} />
            </div>
            <div>
                <h2>{mission.title}</h2>
                <p>Posté le {mission.createdAt}</p>
                <div>
                    <img src={mission.user.picture} />
                    <p>{mission.user.organizationName}</p>
                    <button onClick={handleConsultProfile}>Consulter le profil</button>
                </div>
                <div>
                    <h3>Description</h3>
                    <p>Durée: {mission.numberOfHours}h</p>
                    <p>{mission.city}</p>
                    <p>{mission.deadline}</p>
                </div>
                <div>{mission.description}</div>
            </div>
            <div>
                <button>Contacter</button>
                <button>Postuler</button>
                <button>Partager</button>
            </div>
        </div>
    )
}

export default MissionCard