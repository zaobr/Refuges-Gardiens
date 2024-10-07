export default function SponsorCard({url, name, organization}) {
    return (
        <div className="card-sponsor w-[18%] flex flex-col my-2">
            <div className="pet-icon border-b-4 border-orange-dark drop-shadow-md">
                <img className="mx-auto" src={url}/>
            </div>
            <div className="informations font-text text-[12px] mt-2 mb-1">
                <div className="petname text-center font-bold text-gray-800">{name}</div>
                <div className="orgname text-center text-gray-800 line-clamp-1">{organization}</div>
            </div>
        </div>
    )
}