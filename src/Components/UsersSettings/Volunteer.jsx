import React, { Component } from "react";
import Card from "./CardAdminsVolunteer";

class Volunteer extends Component {
  render() {
    return (
      <div>
        {this.props.users.map((user, i) => {
          return !user.isAdmin && <Card key={i} users={user} />;
        })}
      </div>
    );
  }
}

export default Volunteer;
