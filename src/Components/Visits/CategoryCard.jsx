import React, { Component } from 'react';
import infoIcon from './../../Assets/info-icon.svg';

export class CategoryCard extends Component {
    state = {
        isHoveringCardCat: false,
        isHoveringInfoIcon: false
    } 

    handleMouseEnter = (itemHovered) => {
        this.setState({[itemHovered]: true});
    } 

    handleMouseLeave = (itemHovered) => {
        this.setState({[itemHovered]: false});
    } 

    render() {
        const {category, handleSelectItem} = this.props;
        const {isHoveringInfoIcon, isHoveringCardCat} = this.state;

        return (
            <div 
                onMouseEnter={() => this.handleMouseEnter('isHoveringCardCat')}
                onMouseLeave={() => this.handleMouseLeave('isHoveringCardCat')}
                onClick={() => handleSelectItem(category._id, category.name, "category")}
                className="cat-cont"
            >

                {isHoveringInfoIcon &&
                    <div className="info-toolbox">
                        <h3>{category.description}</h3> 
                        <div></div>
                    </div>
                }

                <p>{category.name}</p> 
                {isHoveringCardCat &&
                    <img 
                        onMouseEnter={() => this.handleMouseEnter('isHoveringInfoIcon')}
                        onMouseLeave={() => this.handleMouseLeave('isHoveringInfoIcon')}
                        src={infoIcon} alt=""
                    />
                }
            </div>
        )
    }
}

export default CategoryCard
