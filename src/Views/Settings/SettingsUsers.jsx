import React, { Component } from "react";

import Admins from "../../Components/UsersSettings/Admins";
import Volunteer from "../../Components/UsersSettings/Volunteer";
import api from "../../apiHandler/apiHandler";
import FormUser from "../../Components/UsersSettings/FormCreateUpdateAdmin";
import DeleteUserPopup from './../../Components/UsersSettings/DeleteUser';

import "../../Styles/SettingsUsers.css";
import plusIcon from "../../Assets/plus-icon.svg";

class SettingsUsers extends Component {
  state = {
    users: null,
    isShownCreate: false,
    isShownUpdate: null,
    isShownDelete: null
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

  handlePopupDelete = (user) => {
    this.setState({ isShownDelete: user });
  }

  handleHidePopup = () => {
    this.setState({ isShownUpdate: null, isShownCreate: false, isShownDelete: null });
  };

  render() {
    const {users, isShownCreate, isShownUpdate, isShownDelete} = this.state;

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
            users={users}
            handlePopup={this.handlePopupUpdate}
            getAllUsers={this.getAllUsers}
            handlePopupDelete={this.handlePopupDelete}
          />
        </div>
        <div className="users-container">
          <Volunteer
            users={users}
            handlePopup={this.handlePopupUpdate}
            getAllUsers={this.getAllUsers}
          />
        </div>
        {isShownCreate && (
          <FormUser
            formAction={api.createUser}
            handlePopup={this.handleHidePopup}
            getAllUsers={this.getAllUsers}
            users={users}
            action="ajouter"
          />
        )}
        {isShownUpdate && (
          <FormUser
            formAction={(value) =>
              api.updateUser(isShownUpdate._id, value)
            }
            handlePopup={this.handleHidePopup}
            getAllUsers={this.getAllUsers}
            value={isShownUpdate}
            users={users}
            action="modifier"
          />
        )}
        {isShownDelete && (
          <DeleteUserPopup 
            handlePopup={this.handleHidePopup}
            user={isShownDelete}
            getAllUsers={this.getAllUsers}
          />
        )}
      </div>
    );
  }
}

export default SettingsUsers;
