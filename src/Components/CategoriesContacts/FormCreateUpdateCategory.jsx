import React, { Component } from "react";
import "./../../Styles/FormCreateCatCont.css";

export default class FormCreateUpdateCategory extends Component {
    state={
        name: this.props.values ? this.props.values.name: "",
        description: this.props.values ? this.props.values.description: "",

        isNameValidated: true,
        isdescriptionValidated : true
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

    handleSubmit =  async event => {
        event.preventDefault()

        const {formAction, handleUpdateView, closeForm} = this.props ;
        const {name, description} = this.state ;

        if (name.length < 3 || description.length < 3) {
            this.setState({isNameValidated: name.length >= 3, isdescriptionValidated: description.length >= 3}) ;
            return ;
        }

        try {
            await formAction({...this.state, isActive: true}) ;
            handleUpdateView() ;
            closeForm() ;
        } catch(err) {
            console.log(err) ;
            closeForm() ;
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };


  render() {
    const { formName, closeForm } = this.props;
    const {name, description, isNameValidated, isdescriptionValidated} = this.state ;

    return (
      <div className="shadow-pop-up">
        <div className="FormCreateUpdateContact">
            <div>
                <p>{formName}</p>
                <div className="close-pop-up" onClick={closeForm}>
                Annuler
                </div>
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
            {!isNameValidated && <div><p>Le nom doit contenir au moins 3 caractères</p></div> }
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              value={description}
              onChange={this.handleChange}
            />
            {!isdescriptionValidated && <div><p>La description doit contenir au moins 3 caractères</p></div> }
            <button>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}
