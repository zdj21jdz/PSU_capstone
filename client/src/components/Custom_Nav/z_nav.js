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

            {/* TODO - on click, bring back home */}
            <Button color="inherit" id="Navbar-Brand">
                PSUTrade
            </Button>

            <div className="navbar-nav me-auto" id="sub-links">
                <li className="nav-item">
                    <Link to={{
                            pathname: "/home",
                            state: {
                                username: props.username,
                                tokenExp: props.tokenExp
                            }
                        }} 
                            className="nav-link">
                        <Button className="link-buttons">
                            Insights (home)
                        </Button>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={{
                            pathname: "/buysell",
                            state: {
                                username: props.username,
                                tokenExp: props.tokenExp
                            }
                        }} 
                            className="nav-link">
                        <Button className="link-buttons">
                            Buy / Sell
                        </Button>
                    </Link>
                </li>
            </div>

            <Button color="inherit">
                    <Link to={"/"} className="nav-link" id="logout-button">
                        Logout - {props.username}
                    </Link>
            </Button>

            </Toolbar>
          </AppBar>
        <Toolbar /> {/* Added to ensure things don't go behind toolbar */}
        </React.Fragment>
      );
};

export default ZNav;