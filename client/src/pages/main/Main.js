import React, { useState, useEffect } from "react";

import useDebounce from "./use-debounce";
import { OwnButton } from "../ownList/Own-button.js";
import { AllWordsButton } from "../allWords/allwords-button.js";
import "./main.css";
import { Link, Redirect } from "react-router-dom";
export const Main = () => {
  const [inputValue, setInputValue] = useState("");

  // API search results
  const [results, setResults] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [props, SetProps] = useState({});
  // Searching status (whether there is pending API request)
  const [isSearching, setIsSearching] = useState(false);
  // Debounce search term so that it only gives us latest value ...
  // ... if searchTerm has not been updated within last 500ms
  // As a result the API call should only fire once user stops typing
  const debouncedSearchTerm = useDebounce(inputValue, 350);

  useEffect(
    () => {
      let mounted= true
      if(mounted)  { if (debouncedSearchTerm) {
        setIsSearching(true);
        searchCharacters(debouncedSearchTerm).then((listWords) => {
          setIsSearching(false);

          setResults(listWords.value);
        });
      } else {
        setResults([]);
      }
    }
     return ()=>{
       mounted= false
     }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  async function getOwnList(e) {
    const input = e.currentTarget.querySelector("input").value;
    if (input) {
      
      
      let data = await fetch(
        `/api/listname?listname=${input}`
      );
      let dataJson = await data.json();
      SetProps(dataJson);
      let status = dataJson.status;
     
      if (status === "success") {
        return setRedirect(true)
      }
    }
    return;
  }

  if (redirect) {
    return (
      <Redirect
        push to={{
          pathname: "/ownList",
          state:props
        }}
      />
    );
  }
  return (
    <div className="main-container">
      <div className="search">
        <input
          className="search-box"
          type="text"
          value={inputValue || ""}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Link to="/translate">
          {" "}
          <input
            type="submit"
            value=""
            className="search-btn"
            onClick={
              (e) => localStorage.setItem("sendWord", inputValue)
              // sendWordToServer()
            }
          />
        </Link>
      </div>

      {isSearching && <div className="searching">Searching ...</div>}

      <div
        className="container"
        onClick={(e) => setInputValue(e.target.getAttribute("value"))}
      >
        {results.map((result, i) => (
          <div className="result-element" key={result + i} value={result}>
            {result}
          </div>
        ))}
        <div className="container-button">
          <div className="all-words">
            {" "}
            <Link to={{ pathname: "/allWords" }}>
              <AllWordsButton />
            </Link>{" "}
          </div>
          <div className="own-button" onClick={(e) => getOwnList(e)}>
            <OwnButton />
          </div>
        </div>
      </div>
    </div>
  );
};

function searchCharacters(search) {
  return fetch(`/api?word=${search}`, {
    method: "GET",
  }).then((r) => r.json());
}
