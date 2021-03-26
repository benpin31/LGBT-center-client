import React, { Component } from "react";
import { Route, Switch } from "react-router";
import Admins from "../../Components/UsersSettings/Admins";
import Volunteer from "../../Components/UsersSettings/Volunteer";
import plusIcon from "../../Assets/plus-icon.svg";
import api from "../../apiHandler/apiHandler";
import FormUser from "../../Components/UsersSettings/FormCreateUpdateAdmin";

class SettingsUsers extends Component {
  state = {
    users: null,
    isShown: false,
  };

  componentDidMount() {
    api
      .getUsers()
      .then((response) => this.setState({ users: response }))
      .catch((error) => console.log(error));
  }

  handlePopup = () => {
    this.setState({ isShown: !this.state.isShown });
  };

  render() {
    if (this.state.users === null) {
      return <div className="loading">Loading...</div>;
    }

    return (
      <div>
        <div className="header-dashboard">
          <h1>utilisateur.ices</h1>
          <button onClick={this.handlePopup}>
            <img src={plusIcon} alt="plus-icon" /> Ajouter un.e nouvel.le
            utilisateur.ice
          </button>
        </div>
        <Admins users={this.state.users} />
        <Volunteer users={this.state.users} />
        {this.state.isShown && (
          <FormUser
            users={this.state.users}
            isShown={this.state.isShown}
            handlePopup={this.handlePopup}
          />
        )}
      </div>
    );
  }
}

export default SettingsUsers;
