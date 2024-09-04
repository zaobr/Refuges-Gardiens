export default function MissionCardTop() {
    return (
        <div className="card-mission w-full my-[5px] p-[5px] rounded-md grid grid-cols-[auto_1fr] bg-off-white">
            <div className="container-icon flex justify-center items-center">
                <div className="mission-icon bg-[url('./public/placeholder.png')] bg-center bg-cover rounded-[50%] w-[80px] h-[80px]"></div>
            </div>
            <div className="informations ml-[10px] text-text text-[12px]">
                <div className="title flex flex-row justify-between items-center">
                    <div className="font-bold">Nom de la mission</div>
                    <div>Association</div>
                </div>
                <div className="content">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis cumque quis sunt minus harum reprehenderit deleniti ut, doloremque eos fugit beatae quos quasi, sit commodi iure natus, modi quae illo.</div>
                <div className="plus flex flex-row justify-between items-center">
                    <div className="volunteers">
                        <span className="font-bold mr-[10px]">Besoin</span>
                        2 bénévoles
                    </div>
                    <div className="period">01/01/2025</div>
                </div>
            </div>
        </div>
    )
}