import { useState } from "react";
import "./App.css";
import Cards from "./components/cards/cards";
import Navbar from "./components/navbar/navbar";

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    console.log(term)
    setSearchTerm(term);
  };

  return (
    <div>
      <Navbar handleSearch={handleSearch} />
      <Cards searchTerm={searchTerm} />
    </div>
  );
}

export default App;
