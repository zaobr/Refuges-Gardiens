export default function SponsorCard() {
    return (
        <div className="card-sponsor p-[10px]">
            <div className="pet-icon">
                <img className="w-[100px] h-[80px] rounded-[50%] text-center" src="./public/logo_RG_petit.png"/>
            </div>
            <div className="informations flex flex-col justify-center items-center text-text text-[12px]">
                <div className="pername text-center font-bold">Animal</div>
                <div className="orgname">Association</div>
            </div>
        </div>
    )
}