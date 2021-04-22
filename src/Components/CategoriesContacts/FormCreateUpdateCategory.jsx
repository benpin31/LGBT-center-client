import React, { Component } from "react";
import "./../../Styles/FormCreateCatCont.css";

export default class FormCreateUpdateCategory extends Component {
    state={
        name: this.props.values ? this.props.values.name: "",
        description: this.props.values ? this.props.values.description: "",

        isNameValidated: true,
        isdescriptionValidated : true
    }

    wrapperRef = React.createRef();

    handleClickOutside = event => {
      if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
        this.props.closeForm();
      }
    }
  
    componentDidMount() {
      document.addEventListener('mousedown', this.handleClickOutside);
    }
  
    componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
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
        this.setState({ [event.target.name]: event.target.value, isNameValidated: true, isdescriptionValidated: true});
    };


  render() {
    const { formType, formName, closeForm } = this.props;
    const {name, description, isNameValidated, isdescriptionValidated} = this.state ;

    return (
      <div className="shadow-pop-up">
        <div ref={this.wrapperRef} className="FormCreateUpdateContact">
            <div>
                <h1>{formType}{formName}</h1>
                <div className="close-pop-up" onClick={closeForm}>
                Annuler
                </div>
            </div>
          <form onSubmit={this.handleSubmit} className="form-update-create">
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
              <div className="error-message name-error">
                <p>Le nom doit contenir au moins 3 caractères</p>
              </div> 
            }

            <label htmlFor="description">Description</label>
            <textarea
              className={!isdescriptionValidated ?  "error-input" : ""}
              name="description"
              id="description"
              value={description}
              onChange={this.handleChange}
            />
            {!isdescriptionValidated && 
              <div className="error-message description-error">
                <p>La description doit contenir au moins 3 caractères</p>
              </div>
            }
            <button>{formType}</button>
          </form>
        </div>
      </div>
    );
  }
}
