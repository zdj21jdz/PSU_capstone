import React from "react";
import { Redirect } from "react-router-dom";
import Dashboard from "../components/dashboard";
import { useLocation } from "react-router";

export default function Profile() {

    const location = useLocation();

    if (location.state === undefined) {
        return <Redirect to="/" />;
    } else {
        return <Dashboard username={(location.state).userName} />;
    }
}