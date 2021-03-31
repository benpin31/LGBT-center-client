import React, { Component } from 'react';
import './../../Styles/FormCreateCatCont.css';

export default class FormCreateUpdateContact extends Component {

    state={
        name: this.props.values ? this.props.values.name: "",
        //  if update type, this.props.values is given and the initial values of the item are given
        isNameValidated: true 
    }

    componentDidUpdate(prevProps) {
        //  when the user want to change the updateform without closing the previous one
        if (prevProps.values) {
            // the fact that the props contains values property indicates the form is used for update
            const {name: prevName} = prevProps.values ;
            if (this.props.values.name !== prevName) {
                // update only if change or name
                this.setState({name: this.props.values.name}) ;
            }
        }
    }

    handleChange = event => {
        this.setState({name: event.target.value, isNameValidated:true})
    }

    handleSubmit =  async event => {
        event.preventDefault()

        const {formAction, handleUpdateView, closeForm} = this.props ;
        const {name} = this.state ;

        if (name.length < 3) {
            this.setState({isNameValidated: false}) ;
            return ;
        }

        try {
            await formAction({name, isActive: true}) 
            handleUpdateView() ;
            closeForm() ;
        } catch(err) {
            console.log(err) ;
            closeForm() ;

        }

    }

    render() {
        const { formName,closeForm } = this.props ;
        const { name, isNameValidated}  = this.state ;
        return (
            <div className="shadow-pop-up">
                <div className="FormCreateUpdateContact">
                    <div>
                        <h1>{formName}</h1>
                        <div className="close-pop-up" onClick={closeForm}>Annuler</div>
                    </div>
                    <form className="form-update-create" onSubmit={this.handleSubmit}>
                        <label htmlFor="name">Name</label>
                        <input 
                            className={!isNameValidated ?  "error-input" : ""}
                            type="text" 
                            name="name" 
                            id="name"
                            value={name}
                            onChange={this.handleChange}
                        />
                        {!isNameValidated && 
                            <div className="error-message name-error-contact">
                            <p>Le nom doit contenir au moins 3 caractères</p>
                            </div> 
                        }
                    <button>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}
