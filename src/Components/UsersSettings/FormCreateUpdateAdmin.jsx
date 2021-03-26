import React, { Component } from "react";
import api from "../../apiHandler/apiHandler";

class FormCreateUpdateAdmin extends Component {
  state = {
    login: "",
    password: "",
    isAdmin: true,
  };

  handleChange = (event) => {
    const key = event.target.name;
    this.setState({ [key]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    api
      .createUser(this.state)
      .then((response) => {
          console.log(response);
          //REFRESH
        })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div>
        <div>
          <h1>ajouter un.e utilisateur.ice</h1>
          <button onClick={this.props.handlePopup}>Annuler</button>
        </div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="login">nom utilisateur.ice</label>
          <input
            onChange={this.handleChange}
            id="login"
            type="text"
            name="login"
          />
          <label htmlFor="password">mot de passe</label>
          <input
            onChange={this.handleChange}
            id="password"
            type="password"
            name="password"
          />
          <button>Créer</button>
        </form>
      </div>
    );
  }
}

export default FormCreateUpdateAdmin;
