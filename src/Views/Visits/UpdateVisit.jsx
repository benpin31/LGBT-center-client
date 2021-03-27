import React, { Component } from 'react';
import UpdateVisitForm from './../../Components/Visits/CreateVisitForm';

class UpdateVisit extends Component {
    render() {

        if(this.props.location.state) {
            const { visitId } = this.props.location.state;
        }

        return (
            <>
                {this.props.location.state.visitId &&
                 <UpdateVisitForm visitId={this.props.location.state.visitId}/>
                }
            </>
        )
    }
}

export default UpdateVisit
