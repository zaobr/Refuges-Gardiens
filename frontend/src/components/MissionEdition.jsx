import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { jwtDecode } from "jwt-decode";
import Cookies from 'universal-cookie';
import { useNavigate, useParams } from "react-router-dom";
import { ImCross } from "react-icons/im";

function MissionEdition() {
    const { missionId } = useParams();
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
    const [mission, setMission] = useState()
    const [user, setUser] = useState([]);
    const navigate = useNavigate();
    const [newMission, setNewMission] = useState(false);
    const fileInputRef = useRef(null);
    const [preview, setPreview] = useState(null);
    const [userId, setUserId] = useState();

    const cookies = new Cookies();  
    const url = import.meta.env.VITE_API_URL;

    // récupère les info du user connecté
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = cookies.get('userLogin');
                if (token) {
                    const decodedToken = jwtDecode(token);
                    const userId = decodedToken.id;
                    const response = await axios.get(`${url}/user/${userId}`);
                    const user = response.data;

                    if (user && !user.is_organization) {
                        navigate('/403');

                    } else {
                        setUser(response.data);
                    }
                } else {
                    console.error('No Token provided');
                }
            } catch (error) {
                console.error('Error fetching connected user', error);
            }
        }
        fetchUserDetails();
    }, []);

    // récupération des infos de la mission à modifier
    useEffect(() => {
        const fetchMissionDetails = async () => {
            try {
                const response = await axios.get(`${url}/mission/${missionId}`);
                const missionData = response.data
                setFormData({
                    title: missionData.title || '',
                    picture: missionData.picture || '',
                    number_of_hours: missionData.number_of_hours || '',
                    deadline: missionData.deadline || '',
                    volunteer_number: missionData.volunteer_number || '',
                    description: missionData.description || '',
                    category: missionData.category || '',
                    city: missionData.city || '',
                    organizationUserId: missionData.organization.user.id || '',
                    picture_url: missionData.picture_url,
                })
                setMission(response.data)
                setPreview(missionData.picture_url)
            } catch (error) {
                console.error("Error fetching mission details:", error);
            }
        };
        fetchMissionDetails();
    }, [missionId]);

      // récupère id du user connecté
      useEffect(() => {
        if (mission) {
            setUserId(cookies.get('userId'));
        }
    }, [mission]);

    // vérifie si le user connecté est le créateur de la mission, sinon 403
    useEffect(() => {
        if (mission && userId) {
            const missionCreator = mission.organization.user.id;
            if (userId !== missionCreator) {
                navigate('/403')
            }
        }
    }, [mission, userId]);

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

    const handleCancel = (e) => {
        e.preventDefault()
        navigate(`/mission/${missionId}`)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const loginCookie = cookies.get('userLogin')           
            const data = new FormData();

            data.append('organizationUserId', formData.organizationUserId);

            for (const key in formData) {
                // Handle picture separately
                if (key !== 'picture' && key !== 'organization') {
                    data.append(key, formData[key]);
                }
            }

            if (formData.picture instanceof File) {
                // If a new picture is uploaded, append it
                data.append('picture', formData.picture);

            } else if (formData.picture === null) {
                // If the picture was deleted, append null
                data.append('picture', 'null');

            } else {
                // If the picture wasn't changed, append the current picture URL
                data.append('picture', preview || '');
            }

            const response = await axios.put(`${url}/mission/${missionId}`, (data), {
                headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${loginCookie}` }
            })
            
            //si mission modifiée enregistre la nouvelle mission pour afficher la popup et récupérer son id
            if (response.status === 200) {
                setNewMission(true)
            }
            
        } catch (error) {
            console.error('Error editing mission', error)
        }
    }

    //après modification, voir son profil
    const handleSeeProfile = () => {
        try {
            navigate(`/user/${user.id}`)
        } catch (error) {
            console.error('Error trying to access user profile', error)
        }
    }

    //après modification, voir la nouvelle mission
    const handleSeeMission = () => {
        navigate(`/mission/${missionId}`)
    }

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
        setFormData({ ...formData, picture: null });
        setPreview(null);
        document.getElementById('fileInput').value = '';
    };

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
                            alt="Avatar"
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
                        <h2 className="text-center font-bold">Modification de mission</h2>
                        <div className="text-center m-3 font-bold">
                            <label>Titre:
                                <input type="text" name="title" onChange={handleChange} className="border pl-1 ml-2 rounded-md border-orange-dark" value={formData.title} />
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
                                        <input type="number" name="number_of_hours" onChange={handleChangeNumber} value={formData.number_of_hours} className="border block pl-1 w-28 rounded-md border-orange-dark" />
                                    </label>
                                    <label>Besoin de bénévoles
                                        <input type="number" name="volunteer_number" min={1} onChange={handleChangeNumber} value={formData.volunteer_number} className="border block pl-1 w-28 rounded-md border-orange-dark" />
                                    </label>
                                    <label>Catégorie
                                        <select name="category" onChange={handleChange} value={formData.category} className="border block w-28 rounded-md border-orange-dark">
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
                                        <input type="text" name="city" onChange={handleChange} value={formData.city} className="border block pl-1 rounded-md border-orange-dark" />
                                    </label>
                                    <label>Date
                                        <input type="date" name="deadline" onChange={handleChange} value={formData.deadline} className="border block pl-1 rounded-md border-orange-dark" />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold ml-1">Description</h3>
                            <div className="flex justify-center">
                                <textarea name="description" onChange={handleChange} value={formData.description} className="border block pl-1 rounded-md border-orange-dark m-1 h-32 w-5/6" />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="flex space-x-4 mt-3 max-w-sm w-full">
                                <button onClick={handleCancel}
                                    className='bg-off-white border-orange-dark border rounded-lg shadow-lg flex-1 transform btn-active btn-hover btn-flex ml-1'>
                                    Annuler
                                </button>
                                <button
                                className='bg-orange-dark border-orange-dark font-bold text-white border rounded-lg shadow-lg flex-1 transform btn-active btn-hover btn-flex mr-1'>
                                    Confirmer
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            {newMission && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
                        <p className="text-center text-lg font-semibold">Mission modifiée avec succès !</p>
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

export default MissionEdition