import { useState } from "react"

export default function ContactPage() {

    const [formData, setFormData] = useState({
        email: '',
        subject: '',
        message: ''
    })
    
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = async (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        
        e.preventDefault()
        setError(null)
    
        if (!formData.email || !formData.subject || formData.message) {
            alert('All fields are required !')
            return
        }
    
    }

    return (
        <>
            <div className="w-full h-full flex flex-col justify-center items-center">
                <div className="w-[90%] p-[25px] bg-white/50 rounded-[10px] mb-[70px] relative shadow-md">
                    <div className="text-title text-[20px] font-bold mb-[10px] text-center">Contactez-nous</div>
                    <div className="flex flex-col justify-center items-center mb-[40px]">
                        <span>Une question, une suggestion ?</span>
                        <span>Envoyez-nous un message</span>
                    </div>
                    <form className="grid grid-rows-[repeat(6, auto)] gap-[20px]" onSubmit={handleSubmit}>
                        <label className="text-title text-[16px] font-bold flex flex-col">Email
                            <input className="rounded-sm h-[30px] p-[2px] border-b border-solid border-black/12" type="email" name="email" onChange={handleChange} value={formData.email}/>
                        </label>
                        <label className="text-title text-[16px] font-bold flex flex-col">Sujet
                            <input className="rounded-sm h-[30px] p-[2px] border-b border-solid border-black/12" type="text" name="subject" onChange={handleChange} value={formData.subject}/>
                        </label>
                        <label className="text-title text-[16px] font-bold flex flex-col">Message
                            <input className="rounded-sm h-[300px] p-[2px] border border-solid border-black/12" type="text" name="message" onChange={handleChange} value={formData.message}/>
                        </label>
                        <div className="grid grid-cols-[30%_60%] gap-[10%]">
                            <button className="py-1 bg-white border border-solid border-orange-dark rounded-md font-bold shadow-md">Annuler</button>
                            <button className="py-1 bg-orange-dark text-white font-bold rounded-md shadow-md" type="submit" disabled={isLoading}>Envoyer</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )

}