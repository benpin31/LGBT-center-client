import React, { Component } from 'react';
import {withRouter, NavLink} from 'react-router-dom';
import { withUser } from "./../../Components/Auth/withUser";
import apiHandler from './../../apiHandler/apiHandler'

import './../../Styles/NavDashboard.css';
import logo from './../../Assets/logo.svg';
import logout from './../../Assets/exit-icon.svg';
import arrowDown from './../../Assets/drop-down-downarrow.svg';
import arrowUp from './../../Assets/drop-down-uparrow.svg';

class DashboardNavBar extends Component {

    state = {
        rapportClicked: false
    }

    handleOpen = () => {
        this.setState({rapportClicked: !this.state.rapportClicked});
    }

    handleClose = () => {
        this.setState({rapportClicked: false});
    }

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

        const { context } = this.props ;
        const { rapportClicked } = this.state

        return (
            <>
            {this.props.location.pathname !== '/' &&
                <div id="DashboardNavBar">
                    <img className="logo" src={logo} alt=""/>

                    <NavLink 
                        exact
                        to="/history"
                        className="link" 
                        activeClassName="selected"
                        onClick={this.handleClose}
                    >
                        Visites
                    </NavLink>
                    <div className="rapport-container">
                        <div 
                            className="rapport" 
                            onClick={this.handleOpen}
                        >
                            <p>Rapport</p>
                            <img src={rapportClicked ? arrowUp : arrowDown} alt=""/>
                        </div>
                        {rapportClicked &&
                            <div className="drop-down-rapport">
                                <NavLink
                                    exact
                                    to="/categories-repartition"
                                    className="sublink" 
                                    activeClassName="selected"
                                >
                                    Répartition des visites
                                </NavLink>

                                <NavLink
                                    exact
                                    to="/jour-affluence"
                                    className="sublink"
                                    activeClassName="selected" 
                                >
                                    Jours d'affluence
                                </NavLink>

                                <NavLink
                                    exact
                                    to="/heure-affluence"
                                    className="sublink" 
                                    activeClassName="selected"
                                >
                                    Heures d'affluence
                                </NavLink>
                            </div>
                        }

                    </div>

                    {
                        !context.isLoading && context.isLoggedIn && context.user.isAdmin &&
                        <NavLink 
                            exact
                            to="/parameters"
                            className="link" 
                            activeClassName="selected"
                            onClick={this.handleClose}
                        >
                        Paramètres
                        </NavLink>
                    }

                    {
                        !context.isLoading && context.isLoggedIn && context.user.isAdmin &&
                        <NavLink 
                            exact
                            to="/users"
                            className="link" 
                            activeClassName="selected"
                            onClick={this.handleClose}
                        >
                        Utilisateur·ices
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
