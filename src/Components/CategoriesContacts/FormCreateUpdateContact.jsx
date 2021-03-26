import React, { Component } from 'react'

import "./../../Styles/CatCont.css"

export default class FormCreateUpdateContact extends Component {

    state={
        name: this.props.values ? this.props.values.name: "",
    }

    handleChangeName = event => {
        this.setState({name: event.target.value})
    }

    handleChangeIsActiv = event => {
        this.setState({asActive: event.target.checked})
    }

    handleSubmit =  async event => {
        event.preventDefault()
        await this.props.formAction({...this.state, isActive: true}) 
        this.props.handleUpdateView()
        this.props.closeForm()
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
                        onChange={this.handleChangeName}
                    />
                <button>Submit</button>
                </form>
            </div>
        )
    }
}
