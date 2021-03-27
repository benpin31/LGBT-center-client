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
        console.log(response);
        this.props.getAllUsers();
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div className="CardContainer">
        {this.props.users.isAdmin && (
          <>
            <div className="card-info">
              <div>Admin</div>
              <p>{this.props.users.login}</p>
            </div>
            <aside>
              {!this.props.context.isLoading &&
                this.props.context.user._id === this.props.users._id && (
                  <img
                    onClick={this.props.handlePopup}
                    src={editIcon}
                    alt="edit-icon"
                  />
                )}

              <img
                onClick={() => this.handleDelete(this.props.users._id)}
                src={binIcon}
                alt="trash-icon"
              />
            </aside>
          </>
        )}
        {!this.props.users.isAdmin && (
          <>
            <div className="card-info">
              <div>Bénévole</div>
              <p>{this.props.users.login}</p>
            </div>
            <aside onClick={this.props.handlePopup}>
              <img src={editIcon} alt="edit-icon" />
            </aside>
          </>
        )}
      </div>
    );
  }
}

export default withUser(CardAdminsVolunteer);
