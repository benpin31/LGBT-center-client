import React from 'react';
import { withUser } from "./../Components/Auth/withUser";
import { withRouter } from "react-router";

import FormLogIn from './../Components/FormLogIn';
import './../Styles/LogIn.css';

import apiHandler from './../apiHandler/apiHandler'

class Home extends React.Component {
    state = {
        signInStyle : null,
        flagStyle : null,
        helloStyle : null,

        isValidSignin: true
    };

    componentDidMount() {
        //Dealing with arriving on Home page animation
        if(!this.props.context.isLoggedIn & !this.props.context.isLoading) {
            //css deals with making flag move up
            // then after 700ms I want the "bonjour" to display 
            setTimeout(() => {
                this.setState({
                    helloStyle : {
                        display : 'block',
                    }
                })
            }, 700);
            //then after 900ms I want the login form to move down
            setTimeout(() => {
                this.setState({
                    signInStyle: {
                        display : 'block',
                        animation : 'signinsweep 0.9s ease-out'
                    }
                })
            }, 900);
        }
    }

    componentDidUpdate(prevProps) {
        //Dealing with arriving at Home page animation
        //but same time dealing with loading isLoggedIn asynchrone issues

        //TO REFACTOR : we have the same animation twice
        if (prevProps.context.isLoading !== this.props.context.isLoading) {
            if (this.props.context.isLoggedIn) {
                this.props.history.push("/new-visit")
            } else  {
                setTimeout(() => {
                    this.setState({
                        helloStyle : {
                            display : 'block',
                        }
                    })
                }, 700);

                setTimeout(() => {
                    this.setState({
                        signInStyle: {
                            display : 'block',
                            animation : 'signinsweep 0.9s ease-out'
                        }
                    })
                }, 900);
            }
        }
    }

    handleLoggedin = (user) => {
        //changer de route après le timeOut
        apiHandler
            .signin(user)
            .then((data) => {
                this.props.context.setUser(data);

                this.setState({
                    signInStyle: {
                        display : 'block',
                        transform : 'translateY(-100%)',
                        animation : 'outro-sweep 1s ease-out'
                    },
                    helloStyle : {
                        display : 'none',
                    }
                })
        
                setTimeout(() => {
                    this.setState({
                        flagStyle : {
                            display : 'block',
                            transform : 'translateY(calc(-100% + 6px))',
                            animation : 'outro-sweep 0.5s ease-out'
                        }
                    })
        
                }, 700);
        
                setTimeout(() => this.props.history.push("/history"), 1500) ;
            })
            .catch((error) => {
                this.setState({isValidSignin: false})
                console.log(error);
            });
    }

    //show error message if sign in is not good
    //to do = setState only if !isValidSignin
    updateValidSignin = () => {
        this.setState({isValidSignin: true})
    }

    render() {

        const flags = ["red", "orange", "yellow", "green", "blue", "purple"];
        const {isValidSignin} = this.state ;

        return (
            <div>
                <div id="signin" style={this.state.signInStyle}>
                    <FormLogIn 
                        onLoggedIn={this.handleLoggedin} 
                        isValidSignin={isValidSignin}
                        updateValidSignin={this.updateValidSignin}
                    />
                </div>

                <div id="flag-container">
                    <p style={this.state.helloStyle}>bonjour</p>
                    {flags.map(flag => 
                        <div key={flag} id={flag} style={this.state.flagStyle}></div>
                    )} 
                </div>
            </div>
        )
    }
}

export default withRouter(withUser(Home))
