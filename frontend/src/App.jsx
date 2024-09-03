import "./styles/index.css";
import { Outlet } from "react-router-dom";
import Header from "../src/components/Header"



function App (){
  return (
    <>
    <Header />
      <main>
        <Outlet/>
      </main>
    </>
  )
};

export default App;