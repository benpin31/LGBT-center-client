import React, { Component } from 'react';
import {withRouter, NavLink} from 'react-router-dom';
import { withUser } from "./../../Components/Auth/withUser";
import apiHandler from './../../apiHandler/apiHandler'

import './../../Styles/NavDashboard.css';
import logo from './../../Assets/logo.svg';
import logout from './../../Assets/exit-icon.svg';

class DashboardNavBar extends Component {

    handleLogout = () => {
        const {context} = this.props ;

        apiHandler
          .logout()
          .then(() => {
            context.removeUser();
          })
          .catch((error) => {
            console.log(error);
          });
      }

    render() {

        const { context } =this.props ;

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
                        to="/dashboard/rapport"
                        className="link" 
                        activeClassName="selected"
                    >
                        Rapport
                    </NavLink>

                    {
                        !context.isLoading && context.isLoggedIn && context.user.isAdmin &&
                        <NavLink 
                            exact
                            to="/dashboard/parameters"
                            className="link" 
                            activeClassName="selected"
                        >
                        Paramètres
                        </NavLink>
                    }

                    {
                        !context.isLoading && context.isLoggedIn && context.user.isAdmin &&
                        <NavLink 
                            exact
                            to="/dashboard/users"
                            className="link" 
                            activeClassName="selected"
                        >
                        Utilisateurs
                        </NavLink>
                    }


                    <div className="logout" onClick={this.handleLogout}>
                        <img src={logout} alt=""/>
                        <p>Déconnexion</p>
                    </div>
                </div>
            }
            </>
        )
    }
}

export default withUser(withRouter(DashboardNavBar))
