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
  }

  handlePopupCreate = () => {
    this.setState({ isShownCreate: !this.state.isShownCreate, isShownUpdate: null });
  };

  handlePopupUpdate = user => {
    this.setState({ isShownUpdate: user, isShownCreate: false });
  };

  render() {
    console.log("toto" ,this.state.isShownUpdate)
    if (this.state.users === null) {
      return <div className="loading">Loading...</div>;
    }

    return (
      <div>
        <div className="header-dashboard">
          <h1>utilisateur.ices</h1>
          <button onClick={this.handlePopupCreate}>
            <img src={plusIcon} alt="plus-icon" /> Ajouter un.e nouvel.le
            utilisateur.ice
          </button>
        </div>
        <Admins 
          users={this.state.users} 
          handlePopup = {this.handlePopupUpdate}
          getAllUsers={this.getAllUsers}
        />
        <Volunteer 
          users={this.state.users} 
          handlePopup = {this.handlePopupUpdate}
          getAllUsers={this.getAllUsers}
        />
        {
          this.state.isShownCreate 
            && 
          <FormUser
            formAction={api.createUser}
            handlePopup={this.handlePopupCreate}
            getAllUsers={this.getAllUsers}
          />
        }
        {
          this.state.isShownUpdate 
            &&
          <FormUser
            formAction={value => api.updateUser(this.state.isShownUpdate._id, value)}
            handlePopup={this.handlePopupUpdate}
            getAllUsers={this.getAllUsers}
            value={this.state.isShownUpdate}
          />
        }
      </div>
    );
  }
}

export default SettingsUsers;
