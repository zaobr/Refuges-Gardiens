import { useEffect, useState, useRef, useContext } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { ImCross } from "react-icons/im";
import { FaEdit } from "react-icons/fa";
import { UserContext } from "../contexts/userContext";

function ProfileEdition() {
    const [formData, setFormData] = useState({
        email: '',
        city: '',
        picture: '',
        banner: '',
        phone_number: '',
        description: '',
        organization_name: '',
    });
    const [updatedProfile, setUpdatedProfile] = useState(false);
    const cookies = new Cookies();
    const pictureInputRef = useRef(null);
    const bannerInputRef = useRef(null);
    const [previewPicture, setPreviewPicture] = useState(null);
    const [previewBanner, setPreviewBanner] = useState(null);
    const [userId, setUserId] = useState();

    const { user, setUser } = useContext(UserContext)

    const navigate = useNavigate();
    const url = import.meta.env.VITE_API_URL;

    //vérification de l'user arrivant sur la page
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = cookies.get('userLogin');
                if (token) {
                    const decodedToken = jwtDecode(token);
                    const userIdToken = decodedToken.id;
                    const response = await axios.get(`${url}/user/${userIdToken}`);
                    const user = response.data;

                    setUserId(userIdToken);

                    if (user.id !== userIdToken) {
                        navigate('/403');
                    } else {
                        setUser(user)
                        setFormData({
                            email: user.email || '',
                            city: user.city || '',
                            phone_number: user.phone_number || '',
                            description: user.description || '',
                            organization_name: user.organization_name || '',
                            picture_url: user.picture_url || '',
                            banner_url: user.banner_url || '',
                        })
                        setPreviewBanner(user.banner_url);
                        setPreviewPicture(user.picture_url);
                    }
                } else {
                    console.error('No token provided');
                    navigate('/403');
                }
            } catch (error) {
                console.error('Error fetching connected user', error);
            }
        }
        fetchUserDetails();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleBannerClick = () => {
        bannerInputRef.current.click();
    };

    const handlePictureClick = () => {
        pictureInputRef.current.click();
    };

    const handlePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewPicture(URL.createObjectURL(file));
            setFormData({ ...formData, picture: file });
        }
    };

    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewBanner(URL.createObjectURL(file));
            setFormData({ ...formData, banner: file });
        }
    };

    const handleDeletePicture = (e) => {
        e.preventDefault();
        setFormData({ ...formData, picture: null });
        setPreviewPicture(`${url}/uploads/user/picture-default.png`);
        document.getElementById('pictureInput').value = '';
    };

    const handleDeleteBanner = (e) => {
        e.preventDefault();
        setFormData({ ...formData, banner: null });
        setPreviewBanner(`${url}/uploads/user/banner-default.png`);
        document.getElementById('bannerInput').value = '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const loginCookie = cookies.get('userLogin')
            const data = new FormData();

            for (const key in formData) {
                //handle picture and banner separately 
                if (key !== 'picture' && key !== 'banner') {
                    data.append(key, formData[key]);
                }
            }
            if (formData.picture instanceof File) {
                // If a new picture is uploaded, append it
                data.append('picture', formData.picture);

            } else if (formData.picture === null) {
                // If the picture was deleted, append null
                data.append('picture', '');
            }

            if (formData.banner instanceof File) {
                // If a new banner is uploaded, append it
                data.append('banner', formData.banner);

            } else if (formData.banner === null) {
                // If the banner was deleted, append null
                data.append('banner', '');
            }
            const response = await axios.put(`${url}/user/edition`, (data), {
                headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${loginCookie}` }
            })

            if (response.status === 200) {
                setUpdatedProfile(true)
            }

        } catch (error) {
            console.error('Error updating user:', error)
        }
    }


    return (
        <div className="flex justify-center">
            {user &&
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="border w-11/12 bg-white/50">
                    <div className="mx-4">
                        <div className="relative w-full">
                            <div
                                onClick={handleBannerClick}
                                className="border rounded-lg inline-block bg-white bg-opacity-50 m-1 hover:scale-95 transition-transform duration-200 ease-in-out cursor-pointer absolute bottom-2 right-2 z-20">
                                <FaEdit className="m-1 ml-3 mb-2 mt-1" size={40} />
                            </div>

                            <input
                                id="bannerInput"
                                type="file"
                                ref={bannerInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleBannerChange}
                            />

                            <div className="w-full h-full">
                                <img
                                    src={previewBanner}
                                    alt="Preview banner"
                                    className="w-full h-full object-cover border rounded-lg z-10"
                                />
                                {formData.banner !== `${url}/uploads/user/banner-default.png` &&
                                    <button
                                        onClick={handleDeleteBanner}
                                        className="absolute top-2 right-2 z-20 border rounded-lg inline-block bg-white bg-opacity-50">
                                        <ImCross className="m-1" />
                                    </button>}
                            </div>
                        </div>
                        <div className="flex">
                            <div className="relative w-32 h-32">
                                <input
                                    id="pictureInput"
                                    type="file"
                                    ref={pictureInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handlePictureChange}
                                />

                                <div className="w-full h-full relative group cursor-pointer">
                                    <img
                                        src={previewPicture}
                                        alt="Preview picture"
                                        className="w-full h-full object-cover border rounded-full"
                                    />

                                    <div
                                        onClick={handlePictureClick}
                                        className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out z-10 cursor-pointer">
                                        <FaEdit size={20} className="text-black" />
                                    </div>
                                </div>

                                {formData.picture !== `${url}/uploads/user/picture-default.png` && (
                                    <button
                                        onClick={handleDeletePicture}
                                        className="absolute top-0 right-0 z-20">
                                        <ImCross className="m-1" />
                                    </button>
                                )}
                            </div>
                            <div className="w-4/5 ml-4">
                                <p>{user.firstname} {user.lastname}</p>
                                {user.organization_name &&
                                    <p>{user.organization_name}</p>}
                                <p className="text-sm">Pour modifier votre identité, veuillez contacter le <a>support</a></p>
                            </div>
                        </div>
                        <div>
                            <label>Email:
                                <input name="email" type="email" onChange={handleChange} value={formData.email} className="border block rounded-md border-orange-dark pl-1" />
                            </label>
                            <label>Ville:
                                <input name="city" type="text" onChange={handleChange} value={formData.city} className="border block rounded-md border-orange-dark pl-1" />
                            </label>
                            <label>Téléphone:
                                <input name="phone_number" type="text" onChange={handleChange} value={formData.phone_number} className="border block rounded-md border-orange-dark pl-1" />
                            </label>
                            <label>Description:
                                <textarea name="description" onChange={handleChange} value={formData.description} className="border block rounded-md border-orange-dark m-1 h-32 w-5/6 pl-1" />
                            </label>
                        </div>
                        <div className="flex justify-center">
                            <div className="flex space-x-4 mt-3 max-w-sm w-full">
                                <Link to={`/user/${userId}`}>
                                    <button className="bg-orange-dark border-orange-dark font-bold text-white border rounded-lg shadow-lg flex-1 transform btn-active btn-hover btn-flex px-3">
                                        Annuler
                                    </button>
                                </Link>
                                <button type="submit"
                                    className='bg-orange-dark border-orange-dark font-bold text-white border rounded-lg shadow-lg flex-1 transform btn-active btn-hover btn-flex mr-1'>
                                    Confirmer
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            }
            {updatedProfile && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
                        <p className="text-center text-lg font-semibold">Profil modifié avec succès !</p>
                        <div className="flex mt-3 gap-3 justify-center">
                            <Link to={`/user/${userId}`}>
                                <button className="bg-orange-dark border-orange-dark font-bold text-white border rounded-lg shadow-lg flex-1 transform btn-active btn-hover btn-flex px-3">Ok</button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfileEdition