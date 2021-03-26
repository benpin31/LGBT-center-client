import React, { Component } from 'react';
import './../Styles/LogIn.css';

class FormLogIn extends Component {
    state = {
        username : "",
        password : ""
    }

    handleSubmit = (event) => {
        event.preventDefault();
        //if successfully logged in
        this.props.onLoggedIn();
    } 

    render() {
        return (
            <form className="form-signin" onSubmit={this.handleSubmit}>
                <label htmlFor="username">Nom d'utilisateur</label>
                <input 
                    onChange={(event) => this.setState({username : event.target.value})}
                    value={this.state.username}
                    type="text" 
                    id="username" 
                    name="username"
                />

                <label htmlFor="password">Mot de passe</label>
                <input 
                    onChange={(event) => this.setState({password : event.target.value})}
                    value={this.state.password}
                    type="text" 
                    id="password" 
                    name="password"
                />
                <button >Click me</button>
            </form> 
        )
    }
}

export default FormLogIn



