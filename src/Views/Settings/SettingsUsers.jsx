import React, { Component } from "react";

import Admins from "../../Components/UsersSettings/Admins";
import Volunteer from "../../Components/UsersSettings/Volunteer";
import api from "../../apiHandler/apiHandler";
import FormUser from "../../Components/UsersSettings/FormCreateUpdateAdmin";

import "../../Styles/SettingsUsers.css";
import plusIcon from "../../Assets/plus-icon.svg";

class SettingsUsers extends Component {
  state = {
    users: null,
    isShownCreate: false,
    isShownUpdate: null,
  };

  componentDidMount() {
    api
      .getUsers()
      .then((response) => this.setState({ users: response }))
      .catch((error) => console.log(error));
  }

  getAllUsers = () => {
    api
      .getUsers()
      .then((response) => this.setState({ users: response }))
      .catch((error) => console.log(error));
  };

  handlePopupCreate = () => {
    this.setState({
      isShownCreate: !this.state.isShownCreate,
      isShownUpdate: null,
    });
  };

  handlePopupUpdate = (user) => {
    this.setState({ isShownUpdate: user, isShownCreate: false });
  };

  handleHidePopup = () => {
    this.setState({ isShownUpdate: null, isShownCreate: false });
  };

  render() {
    if (this.state.users === null) {
      return <div className="loading">Loading...</div>;
    }

    return (
      <div id="settings-users">
        <div id="header-users">
          <h1>utilisateur·ices</h1>
          <button onClick={this.handlePopupCreate}>
            <img src={plusIcon} alt="plus-icon" />
            <p>Ajouter un·e utilisateur·ice</p>
          </button>
        </div>
        <div className="users-container">
          <Admins
            users={this.state.users}
            handlePopup={this.handlePopupUpdate}
            getAllUsers={this.getAllUsers}
          />
        </div>
        <div className="users-container">
          <Volunteer
            users={this.state.users}
            handlePopup={this.handlePopupUpdate}
            getAllUsers={this.getAllUsers}
          />
        </div>
        {this.state.isShownCreate && (
          <FormUser
            formAction={api.createUser}
            handlePopup={this.handleHidePopup}
            getAllUsers={this.getAllUsers}
            users={this.state.users}
          />
        )}
        {this.state.isShownUpdate && (
          <FormUser
            formAction={(value) =>
              api.updateUser(this.state.isShownUpdate._id, value)
            }
            handlePopup={this.handleHidePopup}
            getAllUsers={this.getAllUsers}
            value={this.state.isShownUpdate}
            users={this.state.users}
          />
        )}
      </div>
    );
  }
}

export default SettingsUsers;
