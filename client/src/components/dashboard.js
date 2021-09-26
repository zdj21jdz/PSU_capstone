import React from "react";
import Button from '@mui/material/Button';
import ZNav from './Custom_Nav/z_nav';

// Main landing page after a user has logged in

const Dashboard = props => {
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