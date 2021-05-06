import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import apiHandler from '../../apiHandler/apiHandler';
import CategoryCard from './CategoryCard';

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
        comment: null,

        allCategories: null,
        allContactTypes: null,

        visitToUpdate: null,
        isUpdateVisit: false,
    }

    componentDidMount() {
        apiHandler
            .getCategories()
            .then(res => {
                const activeCategories = res.filter(cat => cat.isActive);
                this.setState({ allCategories: activeCategories })
            })
            .catch(err => console.log(err));

        apiHandler
            .getContactTypes()
            .then(res => {
                const activeContacts = res.filter(cont => cont.isActive);
                this.setState({ allContactTypes: activeContacts });
            })
            .catch(err => console.log(err));

        //if there is a visitId props, it means that I come from update a visit
        //then I need the visit Information and isUpdateVisit
        if (this.props.visitId) {
            this.setState({ visitToUpdate: this.props.visitId, isUpdateVisit: true })
        }
    }

    handleDecrease = () => {
        if (this.state.nbOfPerson > 1)
            this.setState({ nbOfPerson: this.state.nbOfPerson - 1 });
    }

    handleIncrease = () => {
        this.setState({ nbOfPerson: this.state.nbOfPerson + 1 });
    }

    handleSelectItem = (properties, item) => {
        const { id, name, requiredComment } = properties;
        this.setState({ [item]: { id, name, ...requiredComment !== undefined && { requiredComment } } });
    }

    handleComment = event => {
        this.setState({ comment: event.target.value })
    }

    //if user change their mind about selecting a category or contact type
    //if user was here to update it resets information 
    handleChangeItem = (item) => {
        this.setState({ [item]: null, isUpdateVisit: false });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { nbOfPerson, category, contactType, visitToUpdate, comment } = this.state;

        if (visitToUpdate) {

            apiHandler
                .updateVisit(visitToUpdate._id, {
                    date: visitToUpdate.date,
                    category: category.id,
                    contactType: contactType.id,
                    ...comment && { comment }
                })
                .then(() => this.props.history.push('/history'))
                .catch(error => console.log(error))

        } else {

            for (let i = 0; i < nbOfPerson; i++) {
                apiHandler
                    .createVisit({
                        category: category.id,
                        contactType: contactType.id,
                        ...comment && { comment }
                    })
                    .then(() => {
                        if (i === nbOfPerson - 1) {
                            this.props.history.push('/history')
                        }
                    })
                    .catch(error => console.log(error));
            }

        }
    }

    render() {
        const { allCategories, category, allContactTypes, contactType, date, nbOfPerson, visitToUpdate, isUpdateVisit, comment } = this.state
        console.log({ ...visitToUpdate && { toto: visitToUpdate.category } })


        const dateFormat = date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });

        return (
            <form
                onSubmit={this.handleSubmit}
                id="CreateForm"
            >
                {/* if visit to update we don't want the user to change nbofperson and/or date */}
                {!visitToUpdate &&
                    <div id="first-form">
                        <div id="nb-of-person">
                            <div className="input-header">
                                <h2>nombre de personnes</h2>
                                {nbOfPerson &&
                                    <img src={checkedIcon} alt="" />
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
                                    <img src={checkedIcon} alt="" />
                                }
                            </div>
                            <div className="input-content">
                                <p className="validated-input">{dateFormat}</p>
                            </div>
                        </div>
                    </div>
                }

                <div className="input-header">
                    <h2>objet de la demande</h2>
                    {category && 
                        <img src={checkedIcon} alt=""/>
                    }
                </div>
                <div className="cat-cont-container">
                    {!isUpdateVisit &&
                        !category &&
                        allCategories &&
                        allCategories.map(category =>
                            <CategoryCard key={category._id} category={category} handleSelectItem={this.handleSelectItem} />
                        )
                    }
                </div>

                {/* probably an OR guardian for this one, to check on v2 */}
                {category &&
                    <div
                        onClick={() => this.handleChangeItem('category')}
                        className="selected-cat-cont"
                    >
                        <p className="validated-input">{category.name}</p>
                        <img src={editIcon} alt="" />
                    </div>
                }

                {isUpdateVisit &&
                    <div
                        onClick={() => this.handleChangeItem('category')}
                        className="selected-cat-cont"
                    >
                        <p className="validated-input">{visitToUpdate.category.name}</p>
                        <img src={editIcon} alt="" />
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
                        <img src={checkedIcon} alt="" />
                    }
                </div>
                <div className="cat-cont-container">
                    {category &&
                        !contactType &&
                        allContactTypes &&
                        allContactTypes.map(contact =>
                            <div className="cat-cont-card">
                                <div
                                    onClick={() => this.handleSelectItem({ id: contact._id, name: contact.name }, "contactType")}
                                    key={contact._id}
                                    className="cat-cont"
                                >
                                    <p>{contact.name}</p>
                                </div>
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
                        <img src={editIcon} alt="" />
                    </div>
                }

                {isUpdateVisit &&
                    <div
                        onClick={() => this.handleChangeItem('contactType')}
                        className="selected-cat-cont"
                    >
                        <p className="validated-input">{visitToUpdate.contactType.name}</p>
                        <img src={editIcon} alt="" />
                    </div>
                }


                <div className="input-header">
                    {(
                        (category && category.requiredComment && allContactTypes)
                        ||
                        (visitToUpdate && visitToUpdate.category.requiredComment)
                    ) &&
                        <h2>Commentaire</h2>
                    }
                </div>

                <div className="cat-cont-container">
                    {(
                        (category && category.requiredComment && allContactTypes)
                        ||
                        (visitToUpdate && visitToUpdate.category.requiredComment)
                    ) &&
                        <textarea
                            name="comment"
                            id="comment"
                            cols="30"
                            rows="10"
                            onChange={this.handleComment}
                            value={comment}
                        />
                    }
                </div>


                {category && contactType &&
                    <button>Enregistrer</button>
                }
            </form>
        )
    }
}

export default withRouter(ChooseCategory);


