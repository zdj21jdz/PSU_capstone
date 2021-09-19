import React from "react";
import { Redirect } from "react-router-dom";
import Dashboard from "../components/dashboard";

function Profile({ authorized }) {

    if (!authorized) {
        return <Redirect to="/" />;
    } else {
        return <Dashboard />;
    }
}

export default Profile;