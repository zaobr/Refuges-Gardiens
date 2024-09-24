import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { jwtDecode } from "jwt-decode";
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import { ImCross } from "react-icons/im";


function MissionCreation() {
    const [formData, setFormData] = useState({
        title: '',
        picture: '',
        number_of_hours: '',
        deadline: '',
        volunteer_number: '',
        description: '',
        category: '',
        city: '',
        organization: '',
    });
    const [user, setUser] = useState([]);
    const navigate = useNavigate();
    const [newMission, setNewMission] = useState(undefined);
    const fileInputRef = useRef(null);
    const [preview, setPreview] = useState(null);
    const cookies = new Cookies();

    //useEffect pour fetch l'utilisateur connecté 
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = cookies.get('userLogin');
                if (token) {
                    const decodedToken = jwtDecode(token);
                    const userId = decodedToken.id;
                    const url = import.meta.env.VITE_API_URL;
                    const response = await axios.get(`${url}/user/${userId}`);
                    const user = response.data;

                    if (user && !user.is_organization) {
                        navigate('/403');

                    } else {
                        setUser(response.data);
                    }
                } else {
                    console.error('No Token provided');
                    navigate('/403');
                }
            } catch (error) {
                console.error('Error fetching connected user', error);
            }
        }
        fetchUserDetails();
    }, []);

    useEffect(() => { //récupération de l'id de l'organization
        const fetchUserOrganization = async () => {
            const url = import.meta.env.VITE_API_URL;
            const response = await axios.get(`${url}/organization/${user.id}`);
            const organizationId = response.data.id;
            setFormData(prevFormData => ({
                ...prevFormData,
                organization: organizationId
            }))
        }
        fetchUserOrganization();
    }, [user])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleChangeNumber = (event) => {
        const { name, value } = event.target;
        // Convert the value to a number
        const numericValue = value === '' ? '' : Number(value);
        setFormData({
            ...formData,
            [name]: numericValue
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const loginCookie = cookies.get('userLogin')
            const url = import.meta.env.VITE_API_URL
            const response = await axios.post(`${url}/mission`, formData, {
                headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${loginCookie}` }
            })

            const data = new FormData();
            if (formData.picture) {
                data.append('picture', formData.picture);
            }

            //si mission créée enregistre la nouvelle mission pour afficher la popup et récupérer son id
            if (response.status === 201) {
                setNewMission(response.data.id)
            }
        } catch (error) {
            console.error('Error creating mission', error)
        }
    }

    //après création, voir son profil
    const handleSeeProfile = () => {
        try {
            navigate(`/user/${user.id}`)
        } catch (error) {
            console.error('Error trying to access user profile', error)
        }
    };

    //après création, voir la nouvelle mission
    const handleSeeMission = () => {
        navigate(`/mission/${newMission}`)
    };

    const handleDivClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            setFormData({ ...formData, picture: file });
        }
    };

    const handleDeletePicture = (e) => {
        e.preventDefault();
        setFormData({ ...formData, picture: undefined });
        setPreview(null);
        document.getElementById('fileInput').value = '';
    }


    return (
        <div>
            <div className="relative w-full h-64">
                <img
                    src={user.banner}
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />
                <div className="relative z-10 flex flex-col justify-end h-full p-3 text-white">
                    <div className="grid grid-cols-card-info bg-black bg-opacity-50">
                        <img
                            src={user.picture}
                            alt="Logo"
                            className="w-16 h-16"
                        />
                        <div className="pr-2">
                            <h3 className="text-2xl text-right font-bold">{user.organization_name}</h3>
                            <p className="text-lg text-right">{user.city}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div>
                        <h2 className="text-center font-bold">Création de mission</h2>
                        <div className="text-center m-3 font-bold">
                            <label>Titre:
                                <input type="text" name="title" onChange={handleChange} className="border ml-2 rounded-md border-orange-dark pl-1" value={formData.title} />
                            </label>
                        </div>
                        <div>
                            <h3 className="font-bold ml-1">Photos</h3>
                            <div className="flex">
                                <div onClick={handleDivClick} className="border rounded-lg inline-block m-2 hover:scale-95 transition-transform duration-200 ease-in-out cursor-pointer"><MdOutlineAddAPhoto className="m-4" size={45} />
                                </div>
                                <input
                                    id="fileInput"
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                {preview && <div className="flex">
                                    <img src={preview} alt="Preview" className="w-24 h-24 object-cover m-2 mb-0 border rounded-lg" />
                                    <button onClick={handleDeletePicture}><ImCross />
                                    </button>
                                </div>}
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold ml-1">Informations</h3>
                            <div className="grid grid-cols-card-info m-1">
                                <div>
                                    <label>Nombre d'heures
                                        <input type="number" name="number_of_hours" onChange={handleChangeNumber} value={formData.number_of_hours} className="border block w-28 rounded-md border-orange-dark pl-1" />
                                    </label>
                                    <label>Besoin de bénévoles
                                        <input type="number" name="volunteer_number" min={1} onChange={handleChangeNumber} value={formData.volunteer_number} className="border block w-28 rounded-md border-orange-dark pl-1" />
                                    </label>
                                    <label>Catégorie
                                        <select name="category" onChange={handleChange} value={formData.category} className="border block w-28 rounded-md border-orange-dark pl-1">
                                            <option></option>
                                            <option>Animal</option>
                                            <option>Nature</option>
                                            <option>Refuge</option>
                                            <option>Autre</option>
                                        </select>
                                    </label>
                                </div>
                                <div></div>
                                <div>
                                    <label>Ville
                                        <input type="text" name="city" onChange={handleChange} value={formData.city} className="border block rounded-md border-orange-dark pl-1" />
                                    </label>
                                    <label>Date
                                        <input type="date" name="deadline" onChange={handleChange} value={formData.deadline} className="border block rounded-md border-orange-dark pl-1" />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold ml-1">Description</h3>
                            <div className="flex justify-center">
                                <textarea name="description" onChange={handleChange} value={formData.description} className="border block rounded-md border-orange-dark m-1 h-32 w-5/6 pl-1" />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="flex space-x-4 mt-3 max-w-sm w-full">
                                <button onClick={handleSeeProfile}
                                    className='bg-off-white border-orange-dark border rounded-lg shadow-lg flex-1 transform btn-active btn-hover btn-flex ml-1'>
                                    Annuler
                                </button>
                                <button type="submit"
                                    className='bg-orange-dark border-orange-dark font-bold text-white border rounded-lg shadow-lg flex-1 transform btn-active btn-hover btn-flex mr-1'>
                                    Poster
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            {newMission && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
                        <p className="text-center text-lg font-semibold">Mission créée avec succès !</p>
                        <div className="flex mt-3 gap-3">
                            <button className="bg-orange-dark border-orange-dark font-bold text-white border rounded-lg shadow-lg flex-1 transform btn-active btn-hover btn-flex"
                                onClick={handleSeeMission}
                            >Voir la mission
                            </button>
                            <button className="bg-orange-dark border-orange-dark font-bold text-white border rounded-lg shadow-lg flex-1 transform btn-active btn-hover btn-flex"
                                onClick={handleSeeProfile}
                            >Retour au profil
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MissionCreation