import React, { Component } from "react";
import "../../Styles/FormCreateCatCont.css";

class FormCreateUpdateAdmin extends Component {
  state = {
    login: this.props.value ? this.props.value.login : "",
    password: "",
    isAdmin: this.props.value ? this.props.value.isAdmin : true,

    //  input validation
    isLoginLengthValidated: true,
    isLoginFree: true,
    isPasswordValidated: true,
  };

  handleChange = (event) => {
    const key = event.target.name;
    this.setState({ [key]: event.target.value, isLoginLengthValidated:true,  isPasswordValidated: true});
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { login, password, isAdmin } = this.state;
    const { users } = this.props;

    try {
      const newValue = { login, isAdmin };

      //  input validation
      let isLoginLengthValidated = true,
        isLoginFree = true,
        isPasswordValidated = true;

      if (
        users.find(
          (user) =>
            user.login === login && user.login !== this.props.value?.login
        )
      ) {
        isLoginFree = false;
      }

      if (login.length < 3) {
        isLoginLengthValidated = false;
      }

      if (password.length < 3) {
        if (password.length !== 0 || !this.props.value) {
          // in case of update (when this.props.value is not empty ), the input may be "" which mean that the user keep the same password
          isPasswordValidated = false;
        }
      }

      if (!isLoginLengthValidated || !isLoginFree || !isPasswordValidated) {
        this.setState({
          isLoginLengthValidated,
          isLoginFree,
          isPasswordValidated,
        });
        return;
      }

      if (password !== "") {
        newValue.password = password;
      }

      await this.props.formAction(newValue);
      this.props.getAllUsers();
      this.props.handlePopup();
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const {
      isLoginLengthValidated,
      isLoginFree,
      isPasswordValidated,
    } = this.state;

    return (
      <div className="shadow-pop-up">
        <div className="FormCreateUpdateContact">
          <div>
            <h1>{this.props.action} un·e utilisateur·ice</h1>
            <div className="close-pop-up" onClick={this.props.handlePopup}>Annuler</div>
          </div>
          <form onSubmit={this.handleSubmit} className="form-update-create">
            <label htmlFor="login">nom utilisateur.ice</label>
            <input
              onChange={this.handleChange}
              value={this.state.login}
              type="text"
              name="login"
              id={!isLoginLengthValidated || !isLoginFree ?  "error-input" : ""}
            />
            {!isLoginLengthValidated && (
              <div className="error-message user-name-error">
                <p>Le login doit contenir au moins 3 caractères.</p>
              </div>
            )}
            {!isLoginFree && (
              <div className="error-message user-name-error">
                <p>Ce nom d’utilisateur est déjà pris.</p>
              </div>
            )} 

            <label htmlFor="password">mot de passe</label>
            <input
              onChange={this.handleChange}
              value={this.props.password}
              type="password"
              name="password"
              placeholder={this.props.action === "ajouter" ? '' : '●●●●●●'}
              id={!isPasswordValidated || !isLoginFree ?  "error-input" : ""}
            />
            {!isPasswordValidated && (
              <div className="error-message name-error-contact">
                <p>Le mot de passe doit contenir au moins 3 caractères.</p>
              </div>
            )}
            <button>{this.props.action[0].toUpperCase() + this.props.action.substr(1)}</button>
          </form>
        </div>
      </div>
    );
  }
}

export default FormCreateUpdateAdmin;
