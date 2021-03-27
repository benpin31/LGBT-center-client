import React, { Component } from "react";
import archiveIcon from "./../../Assets/archive-icon.svg";
import editIcon from "./../../Assets/edit-icon.svg";
import onOffIcone from "./../../Assets/on-off-icon.svg";

export class CardItemWidget extends Component {
  onOffItem = async () => {
    const { _id, isActive, name, description } = this.props.item;
    const { handleUpdateView } = this.props;
    try {
      await this.props.updateItem(_id, {
        name,
        description,
        isActive: !isActive,
      });
      handleUpdateView();
    } catch (err) {
      console.log(err);
      handleUpdateView();
    }
  };

  render() {
    return (
      <div className="CardContainerItem">
        <div>{this.props.item.isActive ? "ACTIF" : "ARCHIVÉ"}</div>
        <p>{this.props.item.name}</p>
        {this.props.item.isActive && (
          <aside>
            <img
              src={editIcon}
              alt="edit-icone"
              onClick={this.props.handleOpenUpdate}
            />
            <img
              src={archiveIcon}
              alt="archive-icon"
              onClick={this.onOffItem}
            />
          </aside>
        )}
        {!this.props.item.isActive && (
          <aside>
            <img src={onOffIcone} alt="archive-icon" onClick={this.onOffItem} />
          </aside>
        )}
      </div>
    );
  }
}

export default CardItemWidget;
