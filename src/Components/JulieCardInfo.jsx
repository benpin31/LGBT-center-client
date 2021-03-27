import React, { Component } from 'react';
import './../Styles/CardInfo.css';
import editIcon from './../Assets/edit-icon.svg';
import deleteIcon from './../Assets/trash-icon.svg';

class JulieCardInfo extends Component {
    render() {
        const {visit, onDelete} = this.props;

        const date = new Date(visit.date);
        const hour = date.getHours();
        const minutes = date.getMinutes();

        return (
            <div className="CardContainer">
                <div className="card-info">
                    <p>{`${hour}h${minutes}`}</p>
                    <div>{visit.category.name}</div>
                    <div>{visit.contactType.name}</div>
                </div>
                <aside>
                    <img src={editIcon} alt=""/>
                    <img onClick={() => onDelete(visit._id)} src={deleteIcon} alt=""/>
                </aside>
            </div>
        )
    }
}

export default JulieCardInfo
