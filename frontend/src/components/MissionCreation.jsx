import { MdOutlineAddAPhoto } from "react-icons/md";

function MissionCreation() {

    //useEffect pour fetch l'utilisateur connecté
    //prévoir un composant si user non connecté va sur cette page (cf redux)

    return (
        <div>
            <div className="relative w-full h-64">
                <img
                    src="https://www.ifsa-nature.fr/wp-content/uploads/sites/2/2022/03/travailler-dans-un-refuge-pour-animaux.jpg"
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />
                <div className="relative z-10 flex flex-col justify-end h-full p-3 text-white">
                    <div className="grid grid-cols-card-info bg-black bg-opacity-50">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/fr/archive/0/00/20161112112229%21Logo_de_la_SPA_%28France%29.png"
                            alt="Logo"
                            className="w-16 h-16"
                        />
                        <div className="pr-2">
                            <h3 className="text-2xl text-right font-bold">Nom de l'association</h3>
                            <p className="text-lg text-right">Ville</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <form>
                    <div>
                        <h2 className="text-center font-bold">Création de mission</h2>
                        <div className="text-center m-3 font-bold">
                            <label>Titre:
                                <input type="text" name="title" className="border ml-2 rounded-md border-orange-dark" />
                            </label>
                        </div>
                        <div>
                            <h3 className="font-bold ml-1">Photos</h3>
                            <div>
                                <div className="border rounded-lg inline-block m-2"><MdOutlineAddAPhoto className="m-4" size={45} /></div>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold ml-1">Informations</h3>
                            <div className="grid grid-cols-card-info m-1">
                                <div>
                                    <label>Nombre d'heures
                                        <input type="number" name="numberOfHours" className="border block w-28 rounded-md border-orange-dark" />
                                    </label>
                                    <label>Besoin de bénévoles
                                        <input type="number" name="volunteer" min={1} className="border block w-28 rounded-md border-orange-dark" />
                                    </label>
                                    <label>Catégorie
                                        <select name="category" className="border block w-28 rounded-md border-orange-dark">
                                            <option>Animal</option>
                                            <option>Nature</option>
                                            <option>Refuge</option>
                                            <option>Autre</option>
                                        </select>
                                    </label>
                                </div>
                                <div></div>
                                <div>
                                    <label>Lieu
                                        <input type="text" name="city" className="border block rounded-md border-orange-dark" />
                                    </label>
                                    <label>Date
                                        <input type="date" name="deadline" className="border block rounded-md border-orange-dark" />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold ml-1">Description</h3>
                            <div className="flex justify-center">
                                <input type="textarea" name="description" className="border block rounded-md border-orange-dark m-1 h-32 w-5/6" />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="flex space-x-4 mt-3 max-w-sm w-full">
                                <button className='bg-off-white border-orange-dark border rounded-lg shadow-lg flex-1 transform btn-active btn-hover btn-flex ml-1'>
                                    Annuler
                                </button>
                                <button className='bg-orange-dark border-orange-dark font-bold text-white border rounded-lg shadow-lg flex-1 transform btn-active btn-hover btn-flex mr-1'>
                                    Poster
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default MissionCreation