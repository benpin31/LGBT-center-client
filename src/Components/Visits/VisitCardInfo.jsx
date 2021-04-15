import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './../../Styles/VisitCardInfo.css';
import editIcon from './../../Assets/edit-icon.svg';
import deleteIcon from './../../Assets/trash-icon.svg';

class VisitCardInfo extends Component {
    state = {
        isHovering: false
    }

    handleMouseEnterCard = () => {
        this.setState({isHovering: true})
      }
    
    handleMouseLeaveCard = () => {
        this.setState({isHovering: false})
    }

    render() {
        const {isHovering} = this.state;
        const {visit, onDelete} = this.props;

        const date = new Date(visit.date);
        const hour = date.getHours();
        let minutes = date.getMinutes();
        minutes = minutes < 10 ? '0' + minutes : minutes;
    
        return (
            <div 
                onMouseEnter={this.handleMouseEnterCard}
                onMouseLeave={this.handleMouseLeaveCard}
                className="CardContainer"
            >
                <div className="card-info">
                    <p>{`${hour}h${minutes}`}</p>
                    <div>{visit.category.name}</div>
                    <div>{visit.contactType.name}</div>
                </div>
                {isHovering &&
                    <aside>
                        <Link to={{
                            pathname:"/update-visit",
                            state: {
                                visitId: visit
                            }
                        }}>
                            <img src={editIcon} alt=""/>
                        </Link>
                        <img onClick={() => onDelete(visit._id)} src={deleteIcon} alt="trash-can"/>
                    </aside>
                }
            </div>
        )
    }
}

export default VisitCardInfo
