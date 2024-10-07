import MissionsTop from '../components/MissionsTop'
import SponsorShipTop from '../components/SponsorShipTop'
import GiveawayTop from '../components/GiveawayTop'

export default function HomePage() {
    return (
        <>
            <div className='bg-off-white flex flex-col text-[17px]'>
                <h1 className='mt-8 mb-1 w-[80%] mx-auto text-green-dark font-bold font-open font-title text-center'>Effectuez des missions en tant que bénévoles, sauvez la nature et ses habitants.</h1>
                <img src="/Refuge.png"/>
                <h1 className='mb-8 mt-3 w-[85%] mx-auto text-green-dark font-bold font-open font-title text-center'>Partagez et offrez votre aide aux associations. Donnez, participez.</h1>
            </div>
            <SponsorShipTop/>
            <MissionsTop/>
            <GiveawayTop/>
        </>
    )
}