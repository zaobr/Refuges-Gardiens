export default function GiveawayCard({url, nameGiveaway, date, categoryOfAnimal}){
    return(
        <div className="w-[50%]">
            <div className="flex flex-col w-[90%] mx-auto text-off-white mt-5 font-text text-sm rounded drop-shadow-lg">
                <div className="">
                    <img className="rounded-t-lg mx-auto w-[100%] h-full[100%]" src={url} alt="" />
                </div>
                <div className="rounded-b-lg flex flex-col border-t-4 border-orange-dark bg-slate-600">
                    <div className="flex justify-between mt-2 mx-2">
                        <span className="justify-start font-semibold text-orange-light">{nameGiveaway}</span>
                        <span className="justify-end text-[12px]">{date}</span>
                    </div>
                    <div className="flex justify-between mt-2 mx-2 mb-2">
                        <span className="text-[12px]">Animal:</span>
                        <span className="text-green-light text-[12px] font-bold">{categoryOfAnimal}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}