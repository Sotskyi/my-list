import React from "react";
import { BrowserRouter as  Router ,Switch, Route} from "react-router-dom";
import { AllWords } from "./pages/allWords/allWords.js";
import { Main } from "./pages/main/Main";
import { OwnList } from "./pages/ownList/OwnList";
import {Translate } from "./pages/translate/Translate";

export const useRoutes = () => {
  
   return(  
     
  <Switch>
    <Route path="/" exact>
      <Main/>
    </Route>

    <Route path="/allWords" exact>
      <AllWords/>
    </Route>
    <Route path="/translate" exact>
      <Translate/>
    </Route>
    <Route path="/ownList" exact>
      <OwnList/>
    </Route>
  </Switch>
 
)
};
