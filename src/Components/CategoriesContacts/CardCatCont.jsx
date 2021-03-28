import React, { Component } from "react";
import archiveIcon from "./../../Assets/archive-icon.svg";
import editIcon from "./../../Assets/edit-icon.svg";
import onOffIcone from "./../../Assets/on-off-icon.svg";

import './../../Styles/CatContCard.css';

export class CardItemWidget extends Component {
  state = {
    isHovering: false
  }

  onOffItem = async () => {
    const { _id, isActive, name, description } = this.props.item;
    const { handleUpdateView } = this.props;
    console.log(_id);
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

  handleMouseEnterCard = () => {
    this.setState({isHovering: true})
  }

  handleMouseLeaveCard = () => {
    this.setState({isHovering: false})
  }

  render() {
    const {item, handleOpenUpdate} = this.props;

    return (
      <div 
        onMouseEnter={this.handleMouseEnterCard}
        onMouseLeave={this.handleMouseLeaveCard}
        className="CardContainerItem"
      >
        <div className="left-container">
          <div className="status-container">
            <p>
              {item.isActive ? "actif" : "archivé"}
            </p>
          </div>
          <p>{item.name}</p>
        </div>
        {this.state.isHovering &&
        item.isActive && (
          <aside>
            <img
              src={editIcon}
              alt="edit-icone"
              onClick={handleOpenUpdate}
            />
            <img
              src={archiveIcon}
              alt="archive-icon"
              onClick={this.onOffItem}
            />
          </aside>
        )}
        {this.state.isHovering &&
        !item.isActive && (
          <aside>
            <img src={onOffIcone} alt="archive-icon" onClick={this.onOffItem} />
          </aside>
        )}
      </div>
    );
  }
}

export default CardItemWidget;
