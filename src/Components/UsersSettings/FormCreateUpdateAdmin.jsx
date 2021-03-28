import React, { Component } from "react";
import api from "../../apiHandler/apiHandler";
import '../../Styles/CreateUsers.css'

class FormCreateUpdateAdmin extends Component {
  state = {
    login: this.props.value ? this.props.value.login : "",
    password: "",
    isAdmin: true,

    //  input validation
    isLoginLengthValidated: true,
    isLoginFree: true,
    isPasswordValidated : true,
  };

  handleChange = (event) => {
    const key = event.target.name;
    this.setState({ [key]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { login, password, isAdmin } = this.state ;
    const { users } = this.props ;

    try {
      const newValue = {login, isAdmin} ;

      //  input validation
      let  isLoginLengthValidated = true, isLoginFree = true, isPasswordValidated = true ;

      if(users.find(user => user.login === login && user.login !== this.props.value?.login)) {
        //  search if the login is already used. In the case it is an update (in that case, this.props.value
        //  is not null), the user name is of course a valid one 
        isLoginFree = false ;
      }

      if(login.length < 3) {
        isLoginLengthValidated = false ;
      }

      if(password.length < 3) {
        if(password.length !== 0 || !this.props.value) {
          // in case of update (when this.props.value is not empty ), the input may be "" which mean that the user keep the same password
          isPasswordValidated = false ;
        }
      }

      if (!isLoginLengthValidated || !isLoginFree || !isPasswordValidated) {
        this.setState({isLoginLengthValidated, isLoginFree, isPasswordValidated}) ;
        return ;
      }

      if (password !== "") {
        newValue.password = password ;
      }

      await this.props.formAction(newValue)
      this.props.getAllUsers() ;
      this.props.handlePopup() ;


    } catch(err) {
      console.log(err)
    }

  };

  render() {

    const {isLoginLengthValidated, isLoginFree, isPasswordValidated} = this.state ;

    return (
      <div id="BackFormUser">
        <div id="FormUser">
          <div id="header-form-user">
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
            {!isLoginLengthValidated && <div><p>Le login doit contenir au moins 3 caractères.</p></div> }
          {!isLoginFree && <div><p>Ce nom d’utilisateur est déjà pris.</p></div> }
            <label htmlFor="password">mot de passe</label>
            <input
              onChange={this.handleChange}
              value={this.props.password}
              id="password"
              type="password"
              name="password"
            />
            {!isPasswordValidated && <div><p>Le mot de passe doit contenir au moins 3 caractères.</p></div> }
            <button>Créer</button>
          </form>
        </div>
      </div>
    );
  }
}

export default FormCreateUpdateAdmin;
