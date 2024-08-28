import { useParams } from "react-router-dom"
import MissionCard from "../components/MissionCard";

//Affichage d'une mission sélectionnée (via son id en param)
const MissionPage = () => {
    const { missionId } = useParams();
    return <MissionCard missionId={missionId} />
}

export default MissionPage