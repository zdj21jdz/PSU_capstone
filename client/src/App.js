// import { Switch } from "@mui/material";
// import { Router } from "express";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Dashboard from "./components/dashboard";
// import "bootstrap/dist/css/bootstrap.min.css";
// var mongo = require('mongodb').MongoClient;

// Routes
import TestLogin from "./Pages/TestLogin";
import Profile from "./Pages/Profile";

// TODO - add logic to route to login page first, then dashboard
//<Dashboard />

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={TestLogin} />
                <Route exact path="/home" 
                        component={() => <Profile authorized={true} />}
                />
            </Switch>
        </Router>
        
    );
}

export default App;