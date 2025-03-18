import React from "react";
import Hangman from "./components/Hangman";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <Hangman />
    </div>
  );
};

export default App;
