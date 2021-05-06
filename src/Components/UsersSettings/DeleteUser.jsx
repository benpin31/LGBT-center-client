import React, { Component } from 'react';
import "../../Styles/FormCreateCatCont.css";
import api from "../../apiHandler/apiHandler";

export class DeleteUser extends Component {

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    
    componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    }

    wrapperRef = React.createRef();

    handleClickOutside = event => {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
          this.props.handlePopup();
        }
    }

    handleDelete = () => {
        api
          .deleteUser(this.props.user._id)
          .then(() => {
            this.props.getAllUsers();
            this.props.handlePopup();
          })
          .catch((error) => console.log(error));
    };

    render() {
        const { handlePopup, user } = this.props;
        const nameFirstLetterUp = user.login[0].toUpperCase() + user.login.substring(1)

        return (
            <div className="shadow-pop-up">
                <div ref={this.wrapperRef} className="delete-user-container">
                    <h1>supprimer le compte de {nameFirstLetterUp} ?</h1>
                    <div className="delete-user-buttons">
                        <button
                            onClick={this.handleDelete}
                        >
                            oui
                        </button>

                        <button
                            onClick={handlePopup}
                        >
                            non
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default DeleteUser
