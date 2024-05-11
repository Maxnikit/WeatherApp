import React from "react";

import "./App.css";
import WeatherDashboard from "./containers/WeatherDashboard";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <div className="App">
      <SearchBar />
      <WeatherDashboard />
    </div>
  );
}

export default App;
