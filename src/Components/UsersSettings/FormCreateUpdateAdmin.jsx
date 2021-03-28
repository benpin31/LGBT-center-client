import React, { Component } from "react";

class FormCreateUpdateAdmin extends Component {
  state = {
    login: this.props.value ? this.props.value.login : "",
    password: "",
    isAdmin: true,
  };

  handleChange = (event) => {
    const key = event.target.name;
    this.setState({ [key]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.formAction(this.state)
      .then((response) => {
          this.props.getAllUsers() ;
          this.props.handlePopup() ;
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
            value={this.state.login}
            id="login"
            type="text"
            name="login"
          />
          <label htmlFor="password">mot de passe</label>
          <input
            onChange={this.handleChange}
            value={this.props.password}
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
