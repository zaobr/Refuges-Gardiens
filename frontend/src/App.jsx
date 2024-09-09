import "./styles/App.css";
import "./styles/NavBarInscription.css";
import "./styles/Dispo.css"
import "./styles/index.css";
import NavBarInscription from "./components/NavBarInscription";
import Dispo from "./components/Dispo";
import Annonces from "./components/Annonces";

function App (){
  return (
    <>
    <NavBarInscription />
    <Annonces />
    
    </>
  );
};

export default App;