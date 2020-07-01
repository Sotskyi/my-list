import React, { useState, useEffect } from "react";

import "./allWords.css";
export const AllWords = () => {
  const [data, setData] = useState({});


  useEffect(() => {
    async function fetchData() {
      const result = await fetch("/api/list");
      const resultJson = await result.json();

      setData(resultJson.value);
    }

    fetchData();
  }, []);


  return (
    <div className="container-row">
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
