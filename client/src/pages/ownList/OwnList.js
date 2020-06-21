
import React, { useState, useEffect } from "react";
import {useLocation} from "react-router";


 export const OwnList=()=> {
  let location = useLocation()
 console.log(location.state.data)
  
let items=location.state.data.listItems;
let listName= location.state.data.listName;
let keys= Object.keys(items);

  return (
    
     
    <div>
    {" "}
    {Object.keys(items).map((elem) => (
      <div key={elem} className="container-words">
        {" "}
        <div className="english"> {elem}</div> <div className="ukraine"> {items[elem]}</div>
      </div>
    ))}{" "}
  </div>
     
  );
}
