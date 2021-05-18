import React, { useEffect, useState } from "react";
import BarChart from "./components/BarChart";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://gist.githubusercontent.com/josejbocanegra/d3b9e9775ec3a646603f49bc8d3fb90f/raw/3a39300c2a2ff8644a52e22228e900251ec5880a/population.json"
      )
      .then((res) => setData(res.data));
  }, []);

  return (
    <div className="App">
      <BarChart data={data} />
    </div>
  );
}

export default App;
