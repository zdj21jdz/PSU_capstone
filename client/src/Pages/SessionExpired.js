import React from "react";
import { Link } from "react-router-dom";

function SessionExpired() {
    return (
        <>
        <h1>Session Expired - please log back in</h1>
        <Link to={{
            pathname: "/"
        }}
        >
            <button>Login Page</button>
        </Link>
        </>
    );
};

export default SessionExpired;