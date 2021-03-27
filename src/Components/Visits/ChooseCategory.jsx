import React, { Component } from 'react';
import apiHandler from './../../apiHandler/apiHandler';

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
        const {allCategories, category, allContactTypes, contactType, date} = this.state
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const dateFormat = date.toLocaleDateString('fr-FR', options);
        
        console.log(this.state.contactType);


        return (
            <form>
                <p>nombre de personnes</p>
                <div>
                    <p>
                        <span onClick={this.handleDecrease}>- </span>{this.state.nbOfPerson}
                        <span onClick={this.handleIncrease}> +</span>
                    </p>
                </div>

                <p>date</p>
                <p>{dateFormat}</p>

                <p>service du centre demandé</p>
                {!category &&
                allCategories &&
                    allCategories.map(category => 
                        <div 
                            onClick={() => this.handleSelectCat(category._id, category.name)}
                            key={category._id}
                        >
                            <p>{category.name}</p>
                            
                        </div>
                    )
                }

                {category &&
                    <div>
                        <p>{category.name}</p>
                        <div onClick={this.changeCat}>change</div>
                    </div>
                }

                <p>mode de contact utilisé</p>
                {!contactType &&
                allContactTypes &&
                    allContactTypes.map(contact => 
                        <div 
                            onClick={() => this.handleSelectContact(contact._id, contact.name)}
                            key={contact._id}
                        >
                            <p>{contact.name}</p>
                        </div>
                    )
                }

                {contactType &&
                    <div>
                        <p>{contactType.name}</p>
                        <div onClick={this.changeContact}>change</div>
                    </div>
                }   
            </form>
        )
    }
}

export default ChooseCategory
