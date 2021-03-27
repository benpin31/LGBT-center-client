import React, { Component } from "react";
import binIcon from "../../Assets/trash-icon.svg";
import editIcon from "../../Assets/edit-icon.svg";
import { withUser } from "../Auth/withUser";
import api from "../../apiHandler/apiHandler";

class CardAdminsVolunteer extends Component {
  handleDelete = (userId) => {
    api
      .deleteUser(userId)
      .then((response) => {
        console.log(response)
        this.props.getAllUsers()
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div>
        {this.props.users.isAdmin && (
          <>
            <div>Admin</div>
            <p>{this.props.users.login}</p>
            {!this.props.context.isLoading &&
              this.props.context.user._id === this.props.users._id && (
                <button onClick={this.props.handlePopup}>
                  <img src={editIcon} alt="edit-icon" />
                </button>
              )}
            <button onClick={() => this.handleDelete(this.props.users._id)}>
              <img src={binIcon} alt="trash-icon" />
            </button>
          </>
        )}
        {!this.props.users.isAdmin && (
          <>
            <div>Bénévole</div>
            <p>{this.props.users.login}</p>
            <button onClick={this.props.handlePopup}>
              <img src={editIcon} alt="edit-icon" />
            </button>
          </>
        )}
      </div>
    );
  }
}

export default withUser(CardAdminsVolunteer);
