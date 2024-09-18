import {format} from 'date-fns';
import { useNavigate } from "react-router-dom";

function MissionList({ missions }) {
    const navigate = useNavigate();

    if (!Array.isArray(missions)) {
        return <p>Aucun Résultat</p>; // Fallback for non-array data
    }

    const truncateDescription = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '..... (voir plus)';
    };

    const handleClickMission = (missionId) => {
        navigate(`/mission/${missionId}`);
    };

    return (
        <div>
            {missions.length > 0 ? (
                <ul className="w-full">
                    {missions.map((mission) => (
                        <li
                            key={mission.id}
                            onClick={() => handleClickMission(mission.id)}
                            className="bg-off-white hover:bg-orange-light w-full flex flex-row text-xs mb-2"
                        >
                            <img src={mission.picture_url} className="w-1/5 object-contain" />
                            <div className="flex flex-col px-1 w-full">
                                <div className="flex w-full justify-between">
                                    <h3 className="font-bold">{mission.title}</h3>
                                    <p>{mission.city}</p>
                                </div>
                                <div className="relative overflow-hidden w-full">
                                    <p className="relative pr-12 text-xs">
                                        {truncateDescription(mission.description, 120)}
                                    </p>
                                </div>
                                <div className="flex w-full justify-between">
                                    <p>
                                        Besoin: {mission.volunteer_number == 1
                                            ? '1 bénévole.'
                                            : `${mission.volunteer_number} bénévoles.`}
                                    </p>
                                    <p>{format(new Date(mission.deadline), 'dd/MM/yyyy')}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Aucun Résultat</p>
            )}
        </div>
    );
}


export default MissionList