import React, { useState, useEffect } from 'react';

import './ownButton.css'

 export const OwnButton=()=> {
   
  const [inputValue,setInputValue]=useState('')
   function formSubmit (e){
    const input = e.currentTarget.querySelector('input');
    
    setInputValue(input.value)}
  return (
    <form onClick={ (e)=>formSubmit(e)}>
     < div className="a-btn-3"> <span className="left-text">get your</span>
	
		<span className="a-btn-3-slide-text"> <input spellCheck="false" className="input-list" type ="text" placeholder="list name"  autoFocus  values={inputValue} /></span>
		<span className="a-btn-3-icon-right">list<span></span></span>
		</div>
     </form>
  );

}

