import React, { Component } from 'react'

export default class FormCreateUpdateCategory extends Component {
    state={
        name: this.props.values ? this.props.values.name: "",
        description: this.props.values ? this.props.values.description: "",
    }

    componentDidUpdate(prevProps) {
        //  when the user want to change the upfateform without closing the previous one
        if (prevProps.values) {
            const {name: prevName} = prevProps.values
            if (this.props.values.name !== prevName) {
                this.setState({name: this.props.values.name}) ;
            }
        }
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit =  async event => {
        const {formAction, handleUpdateView, closeForm} = this.props ;
        event.preventDefault()
        try {
            await formAction({...this.state, isActive: true}) ;
            handleUpdateView() ;
            closeForm() ;
        } catch(err) {
            console.log(err) ;
            closeForm() ;
        }


    }

    render() {
        const { formName,closeForm } = this.props
        const {name, description} = this.state

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
