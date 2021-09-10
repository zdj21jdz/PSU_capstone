import React from "react";
import './bootstrap.min.css';


const main_nav = (
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
        <a class="navbar-brand" href=".">PSUTrade</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav me-auto">
            <li class="nav-item">
            <a class="nav-link active" href=".">Home
                <span class="visually-hidden">(current)</span>
            </a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href=".">Features</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href=".">Pricing</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href=".">About</a>
            </li>   
        </ul>
        <form class="d-flex">
            <input class="form-control me-sm-2" type="text" placeholder="Search"></input>
            <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
        </form>
        </div>
    </div>
    </nav>
);

export default main_nav;