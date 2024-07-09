import React from "react";
import Illustration from "./components/Illustration";

import "./styles/App.css";

function App (){
  return (
    <>
      <main className="container">
        <div className="links" align="center">
          <h1>Refuges & Gardiens arrive bientôt.</h1>
        </div>
        <div align="center">
          <Illustration />
        </div>
      </main>
    </>
  );
};

export default App;