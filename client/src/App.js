import React from "react";
import './App.css';
import main_nav from "./nav";

const filler_p = (
    <p>
        Taking up some space to see what
        it looks like
    </p>
);

const App = () => {
    return (
        <>
        { main_nav }

        <div id="content">
            <h1>PSU Trade Portal - Main Page</h1>
            <h2>Hello, User!</h2>

            { filler_p }
        </div>
        
        </>
    );
}

export default App;