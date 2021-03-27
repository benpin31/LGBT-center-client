import React, { Component } from 'react';
import CreateVisitForm from '../../Components/Visits/CreateVisitForm';


class CreateVisit extends Component {
    state = {
        categoryCurrent: true,
        contactCurrent: false,
        validationCurrent: false,
    }

    render() {
        const {categoryCurrent} = this.state;
        return (
            <>
                {categoryCurrent &&
                    <CreateVisitForm />
                }
            </>
        )
    }
}

export default CreateVisit
