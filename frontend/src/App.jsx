import "./styles/App.css";
import "./styles/Inscription.css";
import "./styles/NavBarInscription.css";
import NavBarInscription from "./components/NavBarInscription";
import InscriptionUser from "./components/InscriptionUser";

function App (){
  return (
    <>
    <NavBarInscription />
    <InscriptionUser />
    </>
  );
};

export default App;