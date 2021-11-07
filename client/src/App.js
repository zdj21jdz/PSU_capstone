import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


// Routes
import TestLogin from "./Pages/TestLogin";
// import Profile from "./Pages/Profile";
import PageNotFound from "./Pages/NotFound";
import Dashboard from "./components/dashboard";
import NewUser from "./Pages/NewUser";

// TODO - add logic to route to login page first, then dashboard
//<Dashboard />


class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" 
                            component={TestLogin} 
                            type="guest"
                    />
    
                    <Route exact path="/home"
                            component={Dashboard}
                            type="private"
                    />

                    <Route exact path="/newuser"
                            component={NewUser}
                            type="guest"
                    />
    
                    <Route path="*" component={PageNotFound} />
                </Switch>
            </Router>
        );
    }
}

export default App;