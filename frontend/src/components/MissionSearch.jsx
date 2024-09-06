import { useState } from "react";
import axios from "axios";
import MissionList from "./MissionList";

function MissionSearch() {
    const [keyword, setKeyword] = useState("");
    const [city, setCity] = useState("");
    const [date, setDate] = useState("");
    const [missions, setMissions] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = import.meta.env.VITE_API_URL;
            const response = await axios.get(`${url}/mission`, { params: { keyword, city, date } });
            setMissions(response.data);
        } catch (error) {
            console.error('Error fetching missions:', error);
        }
    };
    return (
        <div>
            <div style={{
                backgroundImage: `url(https://c4.wallpaperflare.com/wallpaper/632/226/393/dog-backgrounds-for-desktop-hd-backgrounds-wallpaper-preview.jpg)`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }}
                className="pb-5 p-1">
                <div className="bg-white bg-opacity-60 m-2 mb-5 rounded-xl">
                    <div className="p-2 text-center">
                        <h2 className="font-bold">Trouvez la mission faite pour vous</h2>
                        <form onSubmit={handleSubmit} className="flex-col">
                            <div className="flex">
                                <input type="text" name="keyword" placeholder="Quelle mission cherchez-vous" onChange={(e) => setKeyword(e.target.value)}
                                    className="bg-white rounded-md w-full m-1" />
                            </div>
                            <div className="flex">
                                <input type="text" name="city" placeholder="Localité" onChange={(e) => setCity(e.target.value)}
                                    className="bg-white rounded-md m-1 w-4/6" />
                                <input type="date" name="date" onChange={(e) => setDate(e.target.value)}
                                    className="bg-white rounded-md m-1 w-2/6" />
                            </div>
                            <div>
                                <button type="submit" className='bg-orange-dark border-orange-dark m-1 pl-2 pr-2 font-bold text-white border rounded-lg shadow-lg flex-1 transform btn-active btn-hover btn-flex'
                                >Rechercher
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <MissionList missions={missions} />
        </div>
    )
}

export default MissionSearch