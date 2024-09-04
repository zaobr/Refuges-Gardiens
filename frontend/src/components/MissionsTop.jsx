import MissionCardTop from "./MissionCardTop";

export default function MissionsTop() {
    return (
        <div className="w-full my-[10px] px-[20px]">
            <div className="text-title text-[14px] font-bold mb-[5px]">Missions à la une</div>
            <div className="cards w-full flex flex-col justify-start items-center">
                <MissionCardTop/>
                <MissionCardTop/>
                <MissionCardTop/>
            </div>
        </div>
    )
}