import React, { Component } from 'react';
import {withRouter, NavLink} from 'react-router-dom';

import './../../Styles/NavDashboard.css';
import logo from './../../Assets/logo.svg';
import logout from './../../Assets/exit-icon.svg';

class DashboardNavBar extends Component {
    render() {
        return (
            <>
            {this.props.location.pathname !== '/' &&
                <div id="DashboardNavBar">
                    <img className="logo" src={logo} alt=""/>

                    <NavLink 
                        exact
                        to="/dashboard/history"
                        className="link" 
                        activeClassName="selected"
                    >
                        Visits
                    </NavLink>

                    <NavLink 
                        exact
                        to="/"
                        className="link" 
                        activeClassName="selected"
                    >
                        Rapport
                    </NavLink>

                    <NavLink 
                        exact
                        to="/"
                        className="link" 
                        activeClassName="selected"
                    >
                        Paramètres
                    </NavLink>

                    <NavLink 
                        exact
                        to="/"
                        className="link" 
                        activeClassName="selected"
                    >
                        Utilisateurs
                    </NavLink>

                    <div className="logout">
                        <img src={logout} alt=""/>
                        <p>Déconnexion</p>
                    </div>
                </div>
            }
            </>
        )
    }
}

export default withRouter(DashboardNavBar)
