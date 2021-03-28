import React, { Component } from 'react';
import UpdateVisitForm from './../../Components/Visits/CreateVisitForm';
import FormHeader from '../../Components/GlobalElements/FormHeader';

class UpdateVisit extends Component {
    render() {

        return (
            <>
                <FormHeader title="modifier une visite"/>
                {this.props.location.state.visitId &&
                 <UpdateVisitForm visitId={this.props.location.state.visitId}/>
                }
            </>
        )
    }
}

export default UpdateVisit
