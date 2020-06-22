
import React, {  } from "react";
import {useLocation} from "react-router";


 export const OwnList=()=> {
  let location = useLocation()

  
let items=location.state.data.listItems;
// let listName= location.state.data.listName;


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
