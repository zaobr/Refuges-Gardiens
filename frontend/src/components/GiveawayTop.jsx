import GiveawayCard from '../components/GiveawayCard'
import { Link } from 'react-router-dom'

export default function GiveawayTop(){

    return(
        <>
            <div className="mx-auto w-full bg-orange-smooth">
                <div className="mt-4 ml-5 font-title text-gray-800 text-[17px] font-bold">Annonces 🤝🏼</div>
                    <div className="flex flex-wrap justify-evenly w-[95%] -mt-1 mb-4 mx-auto">
                        <GiveawayCard url="https://picsum.photos/150/100" nameGiveaway="Croquettes" date="12/01" categoryOfAnimal="Chat/Chien"/>
                        <GiveawayCard url="https://picsum.photos/149/100" nameGiveaway="Brosses" date="21/02" categoryOfAnimal="Cheval"/>
                        <GiveawayCard url="https://picsum.photos/150/99" nameGiveaway="Fourrage" date="07/01" categoryOfAnimal="Hamster"/>
                        <GiveawayCard url="https://picsum.photos/151/100" nameGiveaway="Cage" date="09/03" categoryOfAnimal="Lapin"/>
                    </div>
                    <div className="flex justify-end mb-8">
                        <Link to={`/giveaway`}>
                        <button className="px-3 py-1 mr-5 shadow-md bg-orange-dark rounded font-semibold text-sm text-white">Voir +</button>
                        </Link>
                    </div>
            </div>
        </>
    )
}