import React from "react";
import { useHistory } from "react-router-dom";

function TestLogin() {
    let history = useHistory();

    return (
        <div>
            <input type="text" placeholder="username" />
            <input type="text" placeholder="password" />
            <button
                onClick={() => {
                    history.push("/home");
                }}>
                    Login
            </button>
        </div>
    );
}

export default TestLogin;