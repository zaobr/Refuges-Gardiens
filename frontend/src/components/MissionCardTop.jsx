export default function MissionCardTop({url, missionName, organization, date, volunteers}) {
    return (
      <div className="card-mission flex mx-5 mb-2 bg-light-blue/70 rounded border font-text text-gray-800 drop-shadow-lg border-b-4 border-b-orange-dark">
        <img src={url} alt="Mission" className="max-w-40 object-cover rounded-l" />
        <div className="informations ml-2 text-sm mt-1">
          <div className="title flex flex-row justify-between items-center">
            <div className="font-bold text-title text-[13px] mb-1 text-black line-clamp-1">{missionName}</div>
            <div className="text-xs mr-2 text-green-dark font-semibold line-clamp-1">{organization}</div>
          </div>
  
          <div className="content text-balance text-xs mb-2 line-clamp-3 text-off-white">
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem excepturi sit libero voluptates nemo aliquam nihil magnam, corporis, eius culpa aspernatur consequatur. Voluptatem maiores omnis cum hic provident amet veritatis?</p>
          </div>
  
          <div className="plus flex flex-row justify-between items-center text-xs mb-1">
            <div className="volunteers line-clamp-1">
              <span className="font-bold mr-1">Besoin:</span>
              {volunteers} {volunteers > 1 ? "Bénévoles" : "Bénévole"}
            </div>
            <div className="period mr-2 text-black/80">{date}</div>
          </div>
        </div>
      </div>
    );
  }
  