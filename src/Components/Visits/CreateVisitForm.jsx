import React, { Component } from 'react';
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
    }

    componentDidMount() {
        apiHandler
        .getCategories()
        .then(res => this.setState({allCategories : res}))
        .catch(err => console.log(err));

        apiHandler
        .getContactTypes()
        .then(res => this.setState({allContactTypes : res}))
        .catch(err => console.log(err));
    }

    handleDecrease = () => {
        if(this.state.nbOfPerson > 1) 
            this.setState({nbOfPerson : this.state.nbOfPerson - 1});
    }

    handleIncrease = () => {
        this.setState({nbOfPerson : this.state.nbOfPerson + 1});
    }

    handleSelectCat = (categoryId, name) => {
        this.setState({category : {categoryId, name}});
    }

    changeCat = () => {
        this.setState({category : null});
    }

    handleSelectContact = (contactId, name) => {
        this.setState({contactType : {contactId, name}});
    }

    changeContact = () => {
        this.setState({contactType : null});
    }

    render() {
        const {allCategories, category, allContactTypes, contactType, date, nbOfPerson} = this.state
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const dateFormat = date.toLocaleDateString('fr-FR', options);
        
        return (
            <form id="CreateForm">
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

                <div className="input-header">
                    <h2>service du centre demandé</h2>
                    {category && 
                        <img src={checkedIcon} alt=""/>
                    }
                </div>
                <div className="cat-cont-container">
                    {!category &&
                    allCategories &&
                        allCategories.map(category => 
                            <div 
                                onClick={() => this.handleSelectCat(category._id, category.name)}
                                key={category._id}
                                className="cat-cont"
                            >
                                <p>{category.name}</p>
                                
                            </div>
                        )
                    }
                </div>

                {category &&
                    <div className="selected-cat-cont">
                        <p className="validated-input">{category.name}</p>
                        <img 
                            onClick={this.changeCat}
                            src={editIcon}
                            alt=""
                        />
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
                                onClick={() => this.handleSelectContact(contact._id, contact.name)}
                                key={contact._id}
                                className="cat-cont"
                            >
                                <p>{contact.name}</p>
                            </div>
                        )
                    }
                </div>

                {category && contactType &&
                    <div className="selected-cat-cont">
                        <p>{contactType.name}</p>
                        <img 
                            onClick={this.changeContact}
                            src={editIcon}
                            alt=""
                        />
                    </div>
                }   
            </form>
        )
    }
}

export default ChooseCategory
