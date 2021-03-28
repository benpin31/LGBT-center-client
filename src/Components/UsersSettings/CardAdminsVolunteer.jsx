import React, { Component } from "react";
import binIcon from "../../Assets/trash-icon.svg";
import editIcon from "../../Assets/edit-icon.svg";
import { withUser } from "../Auth/withUser";
import api from "../../apiHandler/apiHandler";
import "../../Styles/CardAdminsVolunteer.css";

class CardAdminsVolunteer extends Component {
  state = {
    isHovering: false,
  };

  handleDelete = (userId) => {
    api
      .deleteUser(userId)
      .then((response) => {
        this.props.getAllUsers();
      })
      .catch((error) => console.log(error));
  };

  handleMouseEnterCard = () => {
    this.setState({ isHovering: true });
  };

  handleMouseLeaveCard = () => {
    this.setState({ isHovering: false });
  };

  render() {
    return (
      <div
        onMouseEnter={this.handleMouseEnterCard}
        onMouseLeave={this.handleMouseLeaveCard}
        className="CardContainerAdminsVolunteer"
      >
        {this.props.users.isAdmin && (
          <div>
            <div className="card-info-admins-volunteer">
              <div>Admin</div>
              <p>{this.props.users.login}</p>
            </div>
            {this.state.isHovering && (
              <aside>
                {!this.props.context.isLoading &&
                  this.props.context.user._id === this.props.users._id && (
                    <img
                      onClick={this.props.handlePopup}
                      src={editIcon}
                      alt="edit-icon"
                    />
                  )}
                {!this.props.context.isLoading &&
                  this.props.context.user._id !== this.props.users._id && (
                    <img
                      onClick={() => this.handleDelete(this.props.users._id)}
                      src={binIcon}
                      alt="trash-icon"
                    />
                  )}
              </aside>
            )}
          </div>
        )}
        {!this.props.users.isAdmin && (
          <div>
            <div className="card-info-admins-volunteer">
              <div>Bénévole</div>
              <p>{this.props.users.login}</p>
            </div>
            {this.state.isHovering && (
              <aside onClick={this.props.handlePopup}>
                <img src={editIcon} alt="edit-icon" />
              </aside>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default withUser(CardAdminsVolunteer);
