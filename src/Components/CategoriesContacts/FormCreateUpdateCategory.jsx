import React, { Component } from 'react'

export default class FormCreateUpdateCategory extends Component {
    state={
        name: this.props.values ? this.props.values.name: "",
        description: this.props.values ? this.props.values.description: "",
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit =  async event => {
        event.preventDefault()
        try {
            await this.props.formAction({...this.state, isActive: true}) ;
            this.props.handleUpdateView() ;
            this.props.closeForm() ;
        } catch(err) {
            console.log(err) ;
            this.props.closeForm() ;
        }


    }

    render() {
        const { formName,closeForm } = this.props
        const {name, description} = this.state

        console.log(this.state)

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
                    <label htmlFor="description">Description</label>
                    <textarea 
                        name="description" 
                        id="description"
                        value={description}
                        onChange={this.handleChange}
                    />
                <button>Submit</button>
                </form>
            </div>
        )
    }
}
