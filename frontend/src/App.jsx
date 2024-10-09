import "./styles/index.css";
import { Outlet } from "react-router-dom";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer"
import ConsentBanner from "../src/components/ConsentBanner";
import "./styles/index.css";

function App (){
  return (
    <>
    <Header/>
      <main className="flex flex-col justify-start items-center">
        <Outlet/>
      </main>
    <Footer/>
    <ConsentBanner/>
    </>
  )
};

export default App;