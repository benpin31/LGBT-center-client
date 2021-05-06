import React, { Component } from "react";
import Card from "./CardAdminsVolunteer";

class Admins extends Component {
  render() {
    const { users, handlePopup, handlePopupDelete, getAllUsers } = this.props;

    return (
      <>
        {users && 
        users.map(user => {
          return (
            user.isAdmin 
              && 
            <Card 
              key={user._id} 
                users={user} 
                handlePopup = {() => handlePopup(user)}
                getAllUsers={getAllUsers}  
                handlePopupDelete={() => handlePopupDelete(user)}   
              />)
        })}
      </>
    );
  }
}

export default Admins;
