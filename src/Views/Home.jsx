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
    };

    componentDidUpdate(prevProps) {
        if (this.props.context.isLoggedIn) {
            this.props.history.push("/dashboard/new-visit")
        } else  if (prevProps.context.isLoading !== this.props.context.isLoading) {
            setTimeout(() => {
                this.setState({
                    signInStyle: {
                        display : 'block',
                        animation : 'signinsweep 0.9s ease-out'
                    }
                })
            }, 900);
    
            setTimeout(() => {
                this.setState({
                    helloStyle : {
                        display : 'block',
                    }
                })
            }, 700);
        }
    }

    componentDidMount() {
        if(!this.props.context.isLoggedIn & !this.props.context.isLoading) {
            setTimeout(() => {
                this.setState({
                    signInStyle: {
                        display : 'block',
                        animation : 'signinsweep 0.9s ease-out'
                    }
                })
            }, 900);
    
            setTimeout(() => {
                this.setState({
                    helloStyle : {
                        display : 'block',
                    }
                })
            }, 700);
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
        
                setTimeout(() => this.props.history.push("/dashboard/new-visit"), 1500) ;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const flags = ["red", "orange", "yellow", "green", "blue", "purple"];

        return (
            <div>
                <div id="signin" style={this.state.signInStyle}>
                    <FormLogIn onLoggedIn={this.handleLoggedin}/>
                </div>

                <div id="flag-container">
                    <p style={this.state.helloStyle}>hello</p>
                    {flags.map(flag => 
                        <div key={flag} id={flag} style={this.state.flagStyle}></div>
                    )} 
                </div>
            </div>
        )
    }
}

export default withRouter(withUser(Home))
