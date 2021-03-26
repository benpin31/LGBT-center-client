import React, { Component } from 'react' ;
import apiHandler from './../../apiHandler/apiHandler' ;

import AllItems from './../../Components/CategoriesContacts/AllItems'
import FormCreateUpdateCategory from './../../Components/CategoriesContacts/FormCreateUpdateCategory'
import FormCreateUpdateContact from './../../Components/CategoriesContacts/FormCreateUpdateContact'


import { withUser } from "./../../Components/Auth/withUser";


class SettingsCatCont extends Component {
    render() {
        return (
            <div>
                {/* Category lists */}
                <AllItems 
                    getParameters={apiHandler.getCategories} 
                    updateParameter={apiHandler.updateCategory}
                    parametersName={"Catégories"}
                    parametersButtonName={"Ajouter un catégorie"}
                    FormCreateUpdate={FormCreateUpdateCategory}   
                    formCreateAction={apiHandler.createCategory}
                    fomrUpdateAction={apiHandler.updateCategory}                 
                />
                {/* Contact lists */}
                <AllItems 
                    getParameters={apiHandler.getContactTypes} 
                    updateParameter={apiHandler.updateContactType}
                    parametersName={"Type de contact"}
                    parametersButtonName={"Ajouter un type de contact"}
                    FormCreateUpdate={FormCreateUpdateContact}
                    formCreateAction={apiHandler.createContactType}
                    fomrUpdateAction={apiHandler.updateContactType}
                />
            </div>
        )
    }
}

export default SettingsCatCont
