import React, { Component } from 'react';
import apiHandler from './../../apiHandler/apiHandler';
import CardInfo from '../../Components/Visits/VisitCardInfo';
import {Link} from 'react-router-dom';

import './../../Styles/History.css';
import plusIcon from './../../Assets/plus-icon.svg';

class History extends Component {
    state = {
        allVisits: null
    } 

    componentDidMount() {
        apiHandler
        .getVisits()
        .then(res => {
            this.setState({allVisits : res});
        })
        .catch(err => console.log(err))
    }

    onDelete = (visitId) => {
        apiHandler
        .deleteVisit(visitId)
        .then(res => {
            const filterDeletedVisit = this.state.allVisits
            .filter(visit => visit._id !== res._id);
            
            this.setState({allVisits : filterDeletedVisit});
        })
    }

    render() {
        const {allVisits} = this.state;

        return (
            <div id="History">
                <div id="header">
                    <p>dernières visites</p>
                    <Link
                        exact="true"
                        to='/dashboard/new-visit'
                        className="link"
                    >
                        <button>
                            <img src={plusIcon} alt=""/>
                            <p>Ajouter une visite </p>
                        </button>
                    </Link>
                </div>
                {allVisits && allVisits.map(visit =>
                    <CardInfo 
                        key={visit._id}
                        visit={visit}
                        onDelete={this.onDelete}
                    />
                )}
            </div>
        )
    }
}

export default History
