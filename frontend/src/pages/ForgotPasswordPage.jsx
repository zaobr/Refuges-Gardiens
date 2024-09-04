import ContactButton from "../components/ContactButton";

export default function ForgotPasswordPage() {
    return (
        <>
            <div className="w-full h-full flex flex-col justify-center items-center">
                <div className="w-[90%] p-[25px] bg-white/50 rounded-[10px] relative shadow-md mb-[50px]">
                    <div className="text-title text-[20px] font-bold mb-[50px]">Mot de passe oublié</div>
                    <form className="grid grid-rows-[repeat(5, auto)] gap-[20px]">
                        <label className="email text-title text-[16px] font-bold flex flex-col">Email
                            <input className="rounded-sm h-[30px] px-[2px] py-0 border-b border-solid border-black/12" type="text" name="email" />
                        </label>
                        <label className="username text-title text-[16px] font-bold flex flex-col">Nom d'utilisateur
                            <input className="rounded-sm h-[30px] px-[2px] py-0 border-b border-solid border-black/12" type="text" name="username"/>
                        </label>
                        <label className="password text-title text-[16px] font-bold flex flex-col">Mot de passe
                            <input className="rounded-sm h-[30px] px-[2px] py-0 border-b border-solid border-black/12" type="password" name="password"/>
                        </label>
                        <label className="confirmed-password text-title text-[16px] font-bold flex flex-col">Confirmation du mot de passe
                            <input className="rounded-sm h-[30px] px-[2px] py-0 border-b border-solid border-black/12" type="password" name="confirmed-password"/>
                    </label>
                    <div className="grid grid-cols-[30%_60%] gap-[10%]">
                            <button className="py-1 bg-white border border-solid border-orange-dark rounded-md font-bold shadow-md">Annuler</button>
                            <button className="py-1 bg-orange-dark text-white font-bold rounded-md shadow-md">Réinitialiser</button>
                    </div>
                    </form>
                </div>
            </div>
            <ContactButton/>
        </>
    )
}