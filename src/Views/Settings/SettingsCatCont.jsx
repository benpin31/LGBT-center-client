import React, { Component } from 'react' ;
import apiHandler from './../../apiHandler/apiHandler' ;

import AllItems from './../../Components/CategoriesContacts/AllItems'

class SettingsCatCont extends Component {
    render() {
        return (
            <div>
                {/* Category lists */}
                <AllItems 
                    getParameters={apiHandler.getCategories} 
                    updateParameter={apiHandler.updateCategory}
                    parametersName={"TYPE DE CONTACTS"}
                    parametersButtonName={"Ajouter un type de contact"}
                />
                {/* Contact lists */}
                <AllItems 
                    getParameters={apiHandler.getContactTypes} 
                    updateParameter={apiHandler.updateContactType}
                    parametersName={"CATEGORIES"}
                    parametersButtonName={"Ajouter un catégorie"}
                />
            </div>
        )
    }
}

export default SettingsCatCont
