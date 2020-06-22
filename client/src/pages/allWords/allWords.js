import React, { useState, useEffect } from "react";

import "./allWords.css";
export const AllWords = () => {
  const [data, setData] = useState({});


  useEffect(() => {
    async function fetchData() {
      const result = await fetch("http://localhost:5000/api/list");
      const resultJson = await result.json();

      setData(resultJson.value);
    }

    fetchData();
  }, []);


  return (
    <div>
      {" "}
      {Object.keys(data).map((elem) => (
        <div key={elem} className="container-words">
          {" "}
          <div className="english"> {elem}</div> <div className="ukraine"> {data[elem]}</div>
        </div>
      ))}{" "}
    </div>
  );
};
