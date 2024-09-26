import { useParams } from "react-router-dom"
import MissionByUser from "../components/MissionByUser";

//Affichage d'une mission sélectionnée (via son id en param)
const MissionByUserPage = () => {
    const { userId } = useParams();
    return <MissionByUser userId={userId} />
}

export default MissionByUserPage