import React, { Component } from "react";
import binIcon from "../../Assets/trash-icon.svg";
import editIcon from "../../Assets/edit-icon.svg";
import { withUser } from "../Auth/withUser";
import "../../Styles/CardAdminsVolunteer.css";


class CardAdminsVolunteer extends Component {
  state = {
    isHovering: false,
  };

  handleMouseEnterCard = () => {
    this.setState({ isHovering: true });
  };

  handleMouseLeaveCard = () => {
    this.setState({ isHovering: false });
  };

  render() {
    const {users, context, handlePopup, handlePopupDelete} = this.props;
    console.log(this.props);
    const name = users.login[0].toUpperCase() + users.login.substring(1);

    return (
      <div
        onMouseEnter={this.handleMouseEnterCard}
        onMouseLeave={this.handleMouseLeaveCard}
        className="CardContainerAdminsVolunteer"
      >
        {users.isAdmin && (
          <div>
            <div className="card-info-admins-volunteer">
              <div>Admin</div>
              <p>{name}</p>
            </div>
            {this.state.isHovering && (
              <aside>
                {!context.isLoading &&
                  context.user._id === users._id && (
                    <img
                      onClick={handlePopup}
                      src={editIcon}
                      alt="edit-icon"
                    />
                  )}
                {!context.isLoading &&
                  context.user._id !== users._id && (
                    <img
                      onClick={ handlePopupDelete }
                      src={binIcon}
                      alt="trash-icon"
                    />
                  )}
              </aside>
            )}
          </div>
        )}
        {!users.isAdmin && (
          <div>
            <div className="card-info-admins-volunteer">
              <div>Bénévole</div>
              <p>{name}</p>
            </div>
            {this.state.isHovering && (
              <aside onClick={handlePopup}>
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
