import React, { Component } from 'react';
import ChooseCategoryForm from './../../Components/Visits/ChooseCategory';
// import ContactTypeForm from './../../Components/Visits/ChooseContactType';
// import ValidationForm from './../../Components/Visits/ValidationForm';

class CreateVisit extends Component {
    state = {
        categoryCurrent: true,
        contactCurrent: false,
        validationCurrent: false,
    }

    render() {
        const {categoryCurrent, contactCurrent, validationCurrent} = this.state;
        return (
            <>
                {categoryCurrent &&
                    <ChooseCategoryForm />
                }
                {/*                 
                {contactCurrent &&
                    <ContactTypeForm />
                }
                
                {validationCurrent &&
                    <ValidationForm />
                } */}
            </>
        )
    }
}

export default CreateVisit
