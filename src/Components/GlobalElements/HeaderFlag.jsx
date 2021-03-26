import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

export class HeaderFlag extends Component {
    render() {
        const flags = ["red", "orange", "yellow", "green", "blue", "purple"];
        return (
            <>
                {this.props.location.pathname !== '/' &&
                    <div id="header-flag">
                        
                        {flags.map(flag => 
                            <div key={flag} id={flag}></div>
                        )} 
                        
                    </div>
                }
            </>
        )
    }
}

export default withRouter(HeaderFlag);
