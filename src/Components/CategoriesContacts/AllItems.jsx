import React, { Component } from 'react' ;
import CardParameterWidget from './../GlobalElements/CardParameterWidget'
import apiHandler from './../../apiHandler/apiHandler' ;

export class AllItems extends Component {

    state = {
        parameters:null,
        showCreateForm: false,
        showUpdateForm: null
    }

    async componentDidMount() {
        const parameters = await this.props.getParameters() ;
        this.setState({parameters}) ;
    }

    handleUpdateView = async () => {
        const parameters = await this.props.getParameters() ;
        this.setState({parameters})
    }

    handleOpenCreate = () => {
        this.setState({showCreateForm: true})
    }

    handleOpenUpdate = item => {
        this.setState({showUpdateForm: item})
    }

    handleCloseCreate = () => {
        this.setState({showCreateForm: false})
    }

    handleCloseUpdate = () => {
        this.setState({showUpdateForm: null})
    }

    render() {
        console.log(this.state.showUpdateForm)
        const {parametersName, parametersButtonName, updateParameter, FormCreateUpdate, formCreateAction} = this.props ;
        const {parameters, showCreateForm, showUpdateForm} = this.state ;

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
                    <div onClick={this.handleOpenCreate}>
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
                                        key={parameter._id}
                                        handleOpenUpdate={() => this.handleOpenUpdate(parameter)}
                                    />
 
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
                                        key={parameter._id}
                                        handleOpenUpdate={() => this.handleOpenUpdate(parameter)}
                                    />
 
                                )
                            }
                        </div>
                    </div>
                }

                { 
                    showCreateForm 
                        && 
                    <FormCreateUpdate
                        formAction={formCreateAction}
                        handleUpdateView={this.handleUpdateView} 
                        formName={"Ajouter un "+parametersName}
                        closeForm={this.handleCloseCreate}
                    />    
                }
                    
                {
                    showUpdateForm 
                        && 
                    <FormCreateUpdate
                        formAction={value => updateParameter(this.state.showUpdateForm._id, value)}
                        handleUpdateView={this.handleUpdateView} 
                        formName={"Ajouter un "+parametersName}
                        closeForm={this.handleCloseUpdate}
                        values={this.state.showUpdateForm}
                    />    
                }

            </div>
        )
    }
}

export default AllItems
