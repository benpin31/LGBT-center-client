import React, { Component } from "react";
import Admins from "../../Components/UsersSettings/Admins";
import Volunteer from "../../Components/UsersSettings/Volunteer";

class SettingsUsers extends Component {
  render() {
    return <div>
        <Admins/>
        <Volunteer/>
    </div>;
  }
}

export default SettingsUsers;
