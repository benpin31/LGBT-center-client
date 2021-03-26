import React from 'react';
import FormLogIn from './../Components/FormLogIn';
import './../Styles/LogIn.css';

class Home extends React.Component {
    state = {
        signInStyle : null,
        flagStyle : null,
        helloStyle : null,
    };

    componentDidMount() {
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

    handleLoggedin = () => {
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

        //changer de route après le timeOut
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

export default Home
