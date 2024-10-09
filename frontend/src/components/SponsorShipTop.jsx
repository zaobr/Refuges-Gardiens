import SponsorCard from "./SponsorCard";

export default function SponsorShipTop() {
    return (
        <div className="mx-auto w-full bg-orange-smooth">
            <div className="mt-5 ml-5 font-title text-orange-dark text-[16px] font-bold mb-2">Parrainez-moi! 🧡 </div>
            <div className="flex justify-evenly w-full mb-3">
                <SponsorCard url="https://placecats.com/200/200" name="Chouquette" organization="Pain Suisse"/>
                <SponsorCard url="https://placecats.com/201/200" name="Tiramuisu" organization="Pied Bouche"/>
                <SponsorCard url="https://placecats.com/200/199" name="Tacos" organization="Brouette"/>
                <SponsorCard url="https://placecats.com/200/201" name="Fajitas" organization="Cale Porte"/>
            </div>
        </div>
    )
}