import React from "react";
import AppBar from "@mui/material/AppBar";
import "./z_nav.css"
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
// import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import { Link } from "react-router-dom";

// Main Navbar used throughout the website
const ZNav = props => {

    return (
        <React.Fragment>
          <AppBar position="fixed">
            <Toolbar>
                <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
                <MenuIcon />
            </IconButton>

            <a href="/home" className="navbar-brand lt">PSUTrade</a>

            <div className="navbar-nav me-auto" id="sub-links">
                <li className="nav-item">
                    <Link to={"/home"} className="nav-link">
                    Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/insights"} className="nav-link">
                    Insights
                    </Link>
                </li>
            </div>

            <div className="container mt-3"></div> {/* Divider */}

            <Button color="inherit">
                    <Link to={"/"} className="nav-link" id="logout-button">
                        Logout
                    </Link>
            </Button>

            </Toolbar>
          </AppBar>
        <Toolbar /> {/* Added to ensure things don't go behind toolbar */}
        </React.Fragment>
      );
};

export default ZNav;