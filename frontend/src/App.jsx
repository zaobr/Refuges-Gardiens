import "./styles/index.css";
import { Outlet } from "react-router-dom";
import Header from "../src/components/Header"



function App (){
  return (
    <>
    <Header/>
      <main className="flex flex-col justify-start items-center">
        <Outlet/>
      </main>
    </>
  )
};

export default App;