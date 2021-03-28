import React, { Component } from "react";
import CardCatCont from "./CardCatCont";

import "../../Styles/SettingsCatCont.css";
import plusIcon from "../../Assets/plus-icon.svg";

export class AllItems extends Component {
  state = {
    items: null,
    showCreateForm: false,
    //  when click to add an item : become true and show the form popup by guardian
    showUpdateForm: null,
    //  When click to update an item : become become the full object (and so become truthy)
    //  and the update form apears by guardian. Then one can use the content of the state to fill the form
    //  with actual values
  };

  async componentDidMount() {
    // Get the total list of items when the component is monted
    try {
      const items = await this.props.getAllItmes();
      this.setState({ items });
    } catch (err) {
      console.log(err);
    }
  }

  handleUpdateView = async () => {
    // Use to update the list of items when an update has been done
    try {
      const items = await this.props.getAllItmes();
      this.setState({ items });
    } catch (err) {
      console.log(err);
    }
  };

  handleOpenCreate = () => {
    this.setState({ showUpdateForm: null, showCreateForm: true });
  };

  handleOpenUpdate = (item) => {
    this.setState({ showCreateForm: false, showUpdateForm: item });
  };

  handleCloseCreate = () => {
    this.setState({ showCreateForm: false });
  };

  handleCloseUpdate = () => {
    this.setState({ showUpdateForm: null });
  };

  render() {
    const {
      title,
      buttonName,
      updateItem,
      FormCreateUpdateComponent,
      formCreateAction,
    } = this.props;
    const { items, showCreateForm, showUpdateForm } = this.state;
    
    const titleFormat = title === "Type de contact" ? "un type de contact" : "une catégorie"

    let activeitems, inactiveitems;

    if (items) {
      activeitems = items.filter((item) => item.isActive);
      inactiveitems = items.filter((item) => !item.isActive);
    }

    return (
      <div id="item-collection-container"> 
        <div id="header-cat-cont">
          <p>{title}</p>
          <div onClick={this.handleOpenCreate}>
            <img src={plusIcon} alt="plus-icon" />
            <p>{buttonName}</p>
          </div>
        </div>
        {items && (
          <div id="items-container">
            <div className="dashboard-cat-cont">
              {activeitems.map((item) => (
                <CardCatCont
                  item={item}
                  updateItem={updateItem}
                  handleOpenUpdate={() => this.handleOpenUpdate(item)}
                  handleUpdateView={this.handleUpdateView}
                  // To update views after deleting an item for instance
                  key={item._id}
                />
              ))}
            </div>
            <div className="dashboard-cat-cont">
              {inactiveitems.map((item) => (
                <CardCatCont
                  item={item}
                  updateItem={updateItem}
                  handleOpenUpdate={() => this.handleOpenUpdate(item)}
                  handleUpdateView={this.handleUpdateView}
                  key={item._id}
                />
              ))
            }
            </div>
          </div>
        )}

        {showCreateForm && (
          // appears only the the state is true
          <FormCreateUpdateComponent
            formName={"Ajouter " + titleFormat}
            formAction={formCreateAction}
            handleUpdateView={this.handleUpdateView}
            closeForm={this.handleCloseCreate}
          />
        )}

        {showUpdateForm && (
          // appears only the the state is not empty/ here the state is a full item so that one can use
          // its informations to fill the form
          <FormCreateUpdateComponent
            formName={"Modifier " + titleFormat}
            formAction={(value) =>
              updateItem(this.state.showUpdateForm._id, value)
            }
            handleUpdateView={this.handleUpdateView}
            closeForm={this.handleCloseUpdate}
            values={this.state.showUpdateForm}
            // current value of the item
          />
        )}
      </div>
    );
  }
}

export default AllItems;
