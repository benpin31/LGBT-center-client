import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

class DashboardNavBar extends Component {
    render() {
        console.log(this.props);
        return (
            <>
            {this.props.location.pathname !== '/' &&
                <div>
                    hello dashboard navbar 
                </div>
            }
            </>
        )
    }
}

export default withRouter(DashboardNavBar)
