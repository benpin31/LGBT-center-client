import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import apiHandler from '../../apiHandler/apiHandler';

import './../../Styles/CreateVisit.css';
import plusIcon from './../../Assets/purple-plus-icon.svg';
import minusIcon from './../../Assets/minus-icon.svg';
import editIcon from './../../Assets/edit-icon.svg';
import waitIcon from './../../Assets/wait-icon.svg';
import checkedIcon from './../../Assets/check-icon.svg';

export class ChooseCategory extends Component {
    state = {
        nbOfPerson: 1,
        date: new Date(),

        category: null,
        contactType: null,

        allCategories: null,
        allContactTypes: null,

        visitToUpdate: null,
        isUpdateVisit: false
    }

    componentDidMount() {
        apiHandler
        .getCategories()
        .then(res => {
            const activeCategories = res.filter(cat => cat.isActive);
            this.setState({allCategories : activeCategories})
        })
        .catch(err => console.log(err));

        apiHandler
        .getContactTypes()
        .then(res => {
            const activeContacts = res.filter(cont => cont.isActive);
            this.setState({allContactTypes : activeContacts});
        })
        .catch(err => console.log(err));

        if(this.props.visitId) {
            this.setState({visitToUpdate : this.props.visitId, isUpdateVisit: true})
        }
    }

    handleDecrease = () => {
        if(this.state.nbOfPerson > 1) 
            this.setState({nbOfPerson : this.state.nbOfPerson - 1});
    }

    handleIncrease = () => {
        this.setState({nbOfPerson : this.state.nbOfPerson + 1});
    }

    handleSelectItem = (id, name, item) => {
        this.setState({[item] : {id, name}});
    }

    handleChangeItem = (item) => {
        this.setState({[item] : null, isUpdateVisit:false});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const {nbOfPerson, category, contactType, visitToUpdate} = this.state;

        if(visitToUpdate) {

            apiHandler
            .updateVisit(visitToUpdate._id, {
                date: visitToUpdate.date,
                category: category.id,
                contactType: contactType.id
            })
            .then(() => this.props.history.push('/dashboard/history'))
            .catch(error => console.log(error))

        } else {

            for(let i = 0; i < nbOfPerson; i++) {
                apiHandler
                .createVisit({
                    category : category.id,
                    contactType : contactType.id
                })
                .then(() => {
                    if(i === nbOfPerson - 1) {
                        this.props.history.push('/dashboard/history')
                    }
                })
                .catch(error => console.log(error));
            }

        }
    }

    render() {

        const {allCategories, category, allContactTypes, contactType, date, nbOfPerson, visitToUpdate, isUpdateVisit} = this.state
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const dateFormat = date.toLocaleDateString('fr-FR', options);
        
        return (
            <form 
                onSubmit={this.handleSubmit}
                id="CreateForm"
            >
                {!visitToUpdate &&
                    <div id="first-form">
                        <div id="nb-of-person">
                            <div className="input-header">
                                <h2>nombre de personnes</h2>
                                {nbOfPerson && 
                                    <img src={checkedIcon} alt=""/>
                                }
                            </div>
                            <div className="input-content">
                                <img 
                                    onClick={this.handleDecrease}
                                    src={minusIcon} alt=""
                                />
                                <p className="validated-input">
                                    {nbOfPerson} personne{nbOfPerson > 1 ? 's' : ''}
                                </p>
                                <img 
                                onClick={this.handleIncrease} 
                                src={plusIcon} alt=""
                                />
                            </div>
                        </div>
                        <div id="date">
                            <div className="input-header">
                                <h2>date</h2>
                                {date && 
                                    <img src={checkedIcon} alt=""/>
                                }
                            </div>
                            <div className="input-content">
                                <p className="validated-input">{dateFormat}</p>
                            </div>
                        </div>
                    </div>
                }

                <div className="input-header">
                    <h2>service du centre demandé</h2>
                    {category && 
                        <img src={checkedIcon} alt=""/>
                    }
                </div>
                <div className="cat-cont-container">
                    {!isUpdateVisit && 
                    !category &&
                    allCategories &&
                        allCategories.map(category => 
                            <div 
                                onClick={() => this.handleSelectItem(category._id, category.name, "category")}
                                key={category._id}
                                className="cat-cont"
                            >
                                <p>{category.name}</p>
                                
                            </div>
                        )
                    }
                </div>

                {category &&
                    <div 
                        onClick={() => this.handleChangeItem('category')}
                        className="selected-cat-cont"
                    >
                        <p className="validated-input">{category.name}</p>
                        <img src={editIcon} alt=""/>
                    </div>
                }

                {isUpdateVisit &&
                    <div 
                        onClick={() => this.handleChangeItem('category')}
                        className="selected-cat-cont"
                    >
                        <p className="validated-input">{visitToUpdate.category.name}</p>
                        <img src={editIcon} alt=""/>
                    </div>
                }           

                <div className="input-header">
                    <h2>mode de contact utilisé</h2>
                    {!category &&
                        <img 
                            src={waitIcon} 
                            alt=""
                        />
                    }
                    {contactType &&
                    category &&
                        <img src={checkedIcon} alt=""/>
                    }
                </div>
                <div className="cat-cont-container">
                    {category && 
                    !contactType &&
                    allContactTypes &&
                        allContactTypes.map(contact => 
                            <div 
                                onClick={() => this.handleSelectItem(contact._id, contact.name, "contactType")}
                                key={contact._id}
                                className="cat-cont"
                            >
                                <p>{contact.name}</p>
                            </div>
                        )
                    }
                </div>

                {category && contactType &&
                    <div 
                        onClick={() => this.handleChangeItem('contactType')}
                        className="selected-cat-cont"
                    >
                        <p className="validated-input">{contactType.name}</p>
                        <img src={editIcon} alt=""/>
                    </div>
                }   

                {isUpdateVisit &&
                    <div 
                        onClick={() => this.handleChangeItem('contactType')}
                        className="selected-cat-cont"
                    >
                        <p className="validated-input">{visitToUpdate.contactType.name}</p>
                        <img src={editIcon} alt=""/>
                    </div>
                }   

                {category && contactType &&
                    <button>Enregistrer</button>
                }
            </form>
        )
    }
}

export default withRouter(ChooseCategory);
