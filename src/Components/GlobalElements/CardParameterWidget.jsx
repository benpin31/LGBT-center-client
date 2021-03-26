import React, { Component } from 'react' ;
import archiveIcon from './../../Assets/archive-icon.svg'
import editIcon from './../../Assets/edit-icon.svg'
import onOffIcone from './../../Assets/on-off-icon.svg'

export class CardParameterWidget extends Component {


    onOffParameter = async () => {
        const {_id, isActive, name, description} = this.props.parameter
        await this.props.updateParameter(_id, {name, description, isActive: !isActive})
        this.props.handleUpdateView()
    }

    render() {
        return (
            <div>
                {this.props.parameter.isActive? "ACTIF": "ARCHIVÉ"}
                {this.props.parameter.name}
                {
                    this.props.parameter.isActive
                        &&
                    <>
                        <img src={editIcon} alt="edit-icone" onClick={this.props.handleOpenUpdate}/>
                        <img src={archiveIcon} alt="archive-icon" onClick={this.onOffParameter}/>
                    </>
                }
                {
                    !this.props.parameter.isActive
                        &&
                    <>
                        <img src={onOffIcone} alt="archive-icon" onClick={this.onOffParameter}/>
                    </>
                }
                

            </div>
        )
    }
}

export default CardParameterWidget

