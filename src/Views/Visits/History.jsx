import React, { Component } from 'react';
import apiHandler from './../../apiHandler/apiHandler';

class History extends Component {
    state = {
        allVisits: null
    } 

    componentDidMount() {
        apiHandler
        .getVisits()
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                history page

            </div>
        )
    }
}

export default History
