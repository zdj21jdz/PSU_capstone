import React from "react";
import { Switch, Route, Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// Components
import Login from "./components/login";


const App = () => {
    const [user, setUser] = React.useState(null);

    async function login(user = null) {
        setUser(user);
    }

    async function logout() {
        setUser(null)
    }

    return (
        <>

        <div>
        <nav className="navbar navbar-expand navbar-dark bg-primary">
        <div class="container-fluid">
            {/* Brand */}
            <a href="/" className="navbar-brand">
            PSUTrade
            </a>

            {/* Navbar Left */}
            <div className="navbar-nav me-auto">
                <li className="nav-item">
                    <Link to={"/"} className="nav-link">
                    Home
                    </Link>
                </li>
            </div>

            {/* Navbar Right */}
            <div className="navbar-nav ms-auto">
                <li className="nav-item" >
                    { user ? (
                    <a onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
                        Logout {user.name}
                    </a>
                    ) : (            
                    <Link to={"/login"} className="nav-link">
                    Login
                    </Link>
                    )}
                </li>
            </div>
        </div>
        </nav>

        <div className="container mt-3">
            <Switch>
            <Route 
                path="/login"
                render={(props) => (
                <Login {...props} login={login} />
                )}
            />
            </Switch>
        </div>
        </div>

        </>
    );
}

export default App;