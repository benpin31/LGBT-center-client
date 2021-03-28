import React, { Component } from 'react';
import CreateVisitForm from '../../Components/Visits/CreateVisitForm';
import FormHeader from '../../Components/GlobalElements/FormHeader';


class CreateVisit extends Component {

    render() {
        
        return (
            <>
                <FormHeader title="ajouter une nouvelle visite"/>
                <CreateVisitForm />
            </>
        )
    }
}

export default CreateVisit
