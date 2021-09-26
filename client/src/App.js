import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


// Routes
import TestLogin from "./Pages/TestLogin";
import Profile from "./Pages/Profile";
import PageNotFound from "./Pages/NotFound";

// TODO - add logic to route to login page first, then dashboard
//<Dashboard />

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" 
                        component={TestLogin} 
                        type="guest"
                />

                <Route exact path="/home"
                        component={Profile}
                        type="private"
                />

                <Route path="*" component={PageNotFound} />
            </Switch>
        </Router>
        
    );
}

export default App;