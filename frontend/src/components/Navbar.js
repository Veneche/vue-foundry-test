import { Component } from "react";
import {NavLink} from "react-router-dom";
import "./Navbar.css";

class Navbar extends Component{

    render(){
        return(
            <div className="Navbar">
                <NavLink exact activeClassName="active-link" className="Navbar-link" to="/clients">Clients&nbsp;</NavLink>
                <NavLink exact activeClassName="active-link" className="Navbar-link" to="/employees">Employees</NavLink>
                <NavLink exact activeClassName="active-link" className="Navbar-link" to="/engagements">Engagements</NavLink>
            </div>
        );
    }
}

export default Navbar;