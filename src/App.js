import React from "react";
import './App.css';
import Header from "./struttura/header"
import Jumbo from './componenti/jumbotron';
import CardList from './componenti/grid';
import InputSearch from "./componenti/inputsearch";




function App() {
  let [inputValue, setInputValue] = React.useState("");
  
  return (
    <div className="App">
      <div>
        <Header/>
      </div>
      <Jumbo/>
      <div className="container p-3">
      <form className="col-12 col-lg-auto mb-2 mb-lg-0 me-lg-auto" role="search">
            <InputSearch value={inputValue} setInputValue={setInputValue} />
        </form>
      </div>

      <CardList inputValue={inputValue} />
    </div>
    

  );
}

export default App;
