import React, { Component } from 'react';
import './../Styles/LogIn.css';
import logo from './../Assets/logo.svg';

class FormLogIn extends Component {
    state = {
        username : "",
        password : ""
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const {username: login, password} = this.state ;        

        try {
            await this.props.onLoggedIn({login, password});
        } catch(err) {
            console.log(err)
        }
    } 

    render() {

        const { isValidSignin } = this.props ;

        return (
            <div className="form-container">
                <img src={logo} alt=""/>
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
                        type="password" 
                        id="password" 
                        name="password"
                    />
                    {   !isValidSignin 
                            && 
                        <div><p>Invalid credentials</p></div>
                    }
                    <button >Connexion</button>
                </form> 
            </div>
        )
    }
}

export default FormLogIn



