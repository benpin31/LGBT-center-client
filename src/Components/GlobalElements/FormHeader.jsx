import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './../../Styles/FormHeader.css';


class FormHeader extends Component {
    handleCancel = () => {
        this.props.history.push('/dashboard/history');
    } 

    render() {
        return (
            <div className="FormHeader">
                <h1>{this.props.title}</h1>
                <button onClick={this.handleCancel}> <p> Annuler </p> </button>
            </div>
        )
    }
}

export default withRouter(FormHeader);
