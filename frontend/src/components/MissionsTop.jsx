import MissionCardTop from "./MissionCardTop";
import { Link } from "react-router-dom";

export default function MissionsTop() {
    return (
        <div className="w-full bg-off-white flex flex-col font-text">
            <div className="font-title text-[16px] font-bold mt-5 mb-4 ml-5 text-green-dark">Missions à la une <span className="ml-1">⛑️</span></div>
            <div className="cards w-full flex flex-col justify-start items-center mb-2">
                <MissionCardTop url="https://picsum.photos/100/99" missionName="Assitance aux soins" organization="Chacha" date="12/03/2025" volunteers={2} />
                <MissionCardTop url="https://picsum.photos/99/100" missionName="Nettoyage des espaces" organization="Patoune" date="04/02/2025" volunteers={1} />
                <MissionCardTop url="https://picsum.photos/101/100" missionName="Gardiennage" organization="Museau" date="21/01/2025" volunteers={4} />
            </div>
            <div className="flex justify-end mb-6">
            <Link to={`/annonces`}>
                <button className="px-3 py-1 mr-5 shadow-md bg-orange-dark rounded font-semibold text-sm text-white/90">Voir +</button>
            </Link>
            </div>
        </div>
    )
}