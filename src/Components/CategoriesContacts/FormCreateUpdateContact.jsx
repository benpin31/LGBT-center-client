import React, { Component } from 'react'

import "./../../Styles/CatCont.css"

export default class FormCreateUpdateContact extends Component {

    state={
        name: this.props.values ? this.props.values.name: "",
        //  if update type, this.props.values is given and the initial values of the item are given
    }

    handleChange = event => {
        this.setState({name: event.target.value})
    }

    handleSubmit =  async event => {
        event.preventDefault()
        try {
            await this.props.formAction({...this.state, isActive: true}) 
            this.props.handleUpdateView() ;
            this.props.closeForm() ;
        } catch(err) {
            console.log(err) ;
            this.props.closeForm() ;

        }

    }

    render() {
        const { formName,closeForm } = this.props
        const {name} = this.state
        return (
            <div className="FormCreateUpdateContact">
                <div>
                    <p>{formName}</p>
                    <div onClick={closeForm}>Annuler</div>
                </div>
                <form action="" onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name"
                        value={name}
                        onChange={this.handleChange}
                    />
                <button>Submit</button>
                </form>
            </div>
        )
    }
}
