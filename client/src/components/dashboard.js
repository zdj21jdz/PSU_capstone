import React from "react";
import { Switch, Route } from "react-router-dom";
import Button from '@mui/material/Button';
import ZNav from './Custom_Nav/z_nav';
import LoginPage from "./Custom_Nav/login";

// Main landing page after a user has logged in

const Dashboard = props => {

    const [user, setUser] = React.useState(null);

    async function login(user = null) {
        setUser(user);
    }

    return (
        <>

        <div>
            <ZNav />
        </div>

        <div>
            <Button variant="contained">Hello World</Button>
        </div>

        </>
    );
};

export default Dashboard;