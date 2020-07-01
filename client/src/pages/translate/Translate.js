import React, { useState, useEffect } from "react";
import "./translate.css";

export const Translate = (props) => {
  const [searchTerm, setSearchTerm] = useState({});
  const [input,setInput]=useState('');

 const [ wordStatus,setStatus]= useState('Add word to your list');


  let item = localStorage.getItem("sendWord");
  useEffect(() => {
    const sendWordToServer = async () => {
      const result = await fetch(`http://localhost:5000/api/translate`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ translate: item }),
      });
      const resultJson = await result.json();
      setSearchTerm(resultJson);
    };
    sendWordToServer(item);
  }, [item]);
   const saveWord =  async(e)=>{e.preventDefault()
    console.log(input)
  if (!input){return}
   let result = await fetch(`/api`, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({ listName:input, listItems: {[item]:searchTerm.data.translate} }),
  });
 let resultJson=  await result.json();
  setStatus(resultJson.act)
}
  let data = searchTerm.data;
  return data ? (
    <div className="translate-container">
      <div className="translate">
        {" "}
        <div className="word">{item} </div>
        <div className="ukr-translate">{data.translate}</div>
      </div>{" "}
      <div className="transcript"> {data.transcript}</div>
      <form className="add-to-list" onSubmit={ e=>saveWord(e)} >
        {" "}
        <div className="container-input"><div className="title-input">{wordStatus}</div>
        <input  className="input" type="text"   onChange= {e => setInput(e.target.value)} placeholder='enter your list name'/></div>
        
        <input type="submit" value="add"   className="myButton" />
      </form>
      <div className="synonym"> Інші переклади</div>
      <div className="synonym-container">
        {data.allNames.map((elem, i) => (
          <div key ={elem+i}>
            <div  className="synonym-name">
              {elem}
            </div>
            {Object.keys(data.allSynonim[i]).map((elem) => (
              <div  key={elem}  className="container-for-list">
                <div    className="ukraine-translate">{elem}</div>
                <div className="container-others">
                  {data.allSynonim[i][elem].map((element, i) => (
                    <div key ={element+i}>
                      <div    className="english-syn"> {element}</div>
                     
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="synonym-name">Приклади</div>
      <div className="examples">
        {data.allExamples.map((elem,i) => (
          <div key ={elem+i} className="example-element">{elem}</div>
        ))}{" "}
      </div>
    </div>
  ) : (
    <div>loading...</div>
  );
};
