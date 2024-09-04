import SponsorCard from "./SponsorCard";

export default function SponsorShipTop() {
    return (
        <div className="w-full my-[10px] px-[20px] border-b-[1px] border-solid border-black/75">
            <div className="text-title text-[14px] font-bold mb-[5px]">Parrainez-moi</div>
            <div className="cards grid grid-cols-4">
                <SponsorCard/>
                <SponsorCard/>
                <SponsorCard/>
                <SponsorCard/>
            </div>
        </div>
    )
}