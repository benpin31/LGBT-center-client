import React from "react";
import apiHandler from "./../../apiHandler/apiHandler";

import AllItems from "./../../Components/CategoriesContacts/AllItems";
import FormCreateUpdateCategory from "./../../Components/CategoriesContacts/FormCreateUpdateCategory";
import FormCreateUpdateContact from "./../../Components/CategoriesContacts/FormCreateUpdateContact";

// Render a the catgory and contact management
// The wiews contain two parts :
//  - The display of all categories
//  - the display of all contact type
// those ewo parts arre render with the same component AllItems, use with diffeent props

function SettingsCatCont() {
  return (
    <>
      {/* Category lists */}
      <AllItems
        title={"Catégories"}
        buttonName={"Ajouter une catégorie"}
        getAllItmes={apiHandler.getCategories}
        //  CRUD part
        //  the list contains there own crud form used to update or crete a new item.
        //  The form is different according the the item type, but is is the same for update and create.
        //  So, we giva as props the form action for both case : here updateCatgery for the update part
        //  and createCategort for the createPart. The user can't delete coompletely an item : it's only
        //  a logic delete (isActive become false), so the delete part is managed by an update
        FormCreateUpdateComponent={FormCreateUpdateCategory}
        updateItem={apiHandler.updateCategory}
        formCreateAction={apiHandler.createCategory}
      />

      {/* Contact lists */}
      <AllItems
        title={"Type de contact"}
        buttonName={"Ajouter un type de contact"}
        getAllItmes={apiHandler.getContactTypes}
        FormCreateUpdateComponent={FormCreateUpdateContact}
        updateItem={apiHandler.updateContactType}
        formCreateAction={apiHandler.createContactType}
      />
    </>
  );
}

export default SettingsCatCont;
