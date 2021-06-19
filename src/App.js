import React from "react";
import {Switch,Route} from 'react-router-dom'

function App() {
  return (
    <Switch>
        <Route exact path="/">
          This is working!
        </Route>
        <Route exact path="/1547">
            This is working or not!
        </Route>

        <Route>
            <h1>Page not Found!!</h1>
        </Route>
    </Switch>
  );
}

export default App;
