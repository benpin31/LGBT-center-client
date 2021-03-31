import React, { Component } from "react";
import Card from "./CardAdminsVolunteer";

class Volunteer extends Component {
  render() {
    return (
      <>
        {this.props.users &&
        this.props.users.map(user => {
          return (
            !user.isAdmin 
              && 
            <Card 
              key={user._id} 
              users={user} 
              handlePopup = {() => this.props.handlePopup(user)}
              getAllUsers={this.props.getAllUsers}            
            />)
        })}
      </>
    );
  }
}

export default Volunteer;
