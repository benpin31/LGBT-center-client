import React, { Component } from 'react' ;
import CardParameterWidget from './../GlobalElements/CardParameterWidget'
import apiHandler from './../../apiHandler/apiHandler' ;

export class AllItems extends Component {

    state = {
        parameters:null
    }

    async componentDidMount() {
        const parameters = await this.props.getParameters() ;
        this.setState({parameters}) ;
    }


    handleUpdateView = async () => {
        const parameters = await this.props.getParameters() ;
        this.setState({parameters})
    }

    render() {

        const {parametersName, parametersButtonName, updateParameter} = this.props ;
        const {parameters} = this.state ;

        let activeParameters, inactiveParameters ;

        if(parameters) {
            activeParameters = parameters.filter(parameter => parameter.isActive)
            inactiveParameters = parameters.filter(parameter => !parameter.isActive)
        }

        return (
            <div>
                <div>
                    <p>
                        {parametersName}
                    </p>
                    <div>
                        {parametersButtonName}
                    </div>
                </div>
                {
                    parameters &&
                    <div>
                        <div>
                            {
                                activeParameters.map(parameter => 
                                    <CardParameterWidget 
                                        parameter={parameter} 
                                        handleUpdateView={this.handleUpdateView}
                                        updateParameter={updateParameter}
                                        key={parameter._id}/>
 
                                )
                            }
                        </div>
                        <div>
                            {
                                inactiveParameters.map(parameter => 
                                    <CardParameterWidget 
                                    parameter={parameter} 
                                    handleUpdateView={this.handleUpdateView}
                                    updateParameter={updateParameter}
                                    key={parameter._id}/>
 
                                )
                            }
                        </div>
                    </div>
                }

            </div>
        )
    }
}

export default AllItems
