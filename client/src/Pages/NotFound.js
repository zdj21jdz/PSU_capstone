import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
    return (
        <>
        <h1>Page not found</h1>
        <Link to={{
            pathname: "/"
        }}
        >
            <button>Login Page</button>
        </Link>
        </>
    );
};

export default PageNotFound;