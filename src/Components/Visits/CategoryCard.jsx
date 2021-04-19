import React, { Component } from 'react';
import infoIcon from './../../Assets/info-icon.svg';
import {isMobileOnly} from 'react-device-detect';

export class CategoryCard extends Component {
    state = {
        isHoveringInfoIcon: false
    } 

    handleMouseEnter = () => {
        this.setState({isHoveringInfoIcon: true});
    } 

    handleMouseLeave = () => {
        this.setState({isHoveringInfoIcon: false});
    } 

    handleTouchInfo = (e) => {
        e.preventDefault();
        this.setState({isHoveringInfoIcon: !this.state.isHoveringInfoIcon});
    }

    handleTouchEnd = (e) => {
        e.preventDefault();
    }

    render() {
        const {category, handleSelectItem} = this.props;
        const {isHoveringInfoIcon} = this.state;

        return (
            <div className="cat-cont-card">
                <div 
                    onClick={() => handleSelectItem(category._id, category.name, "category")}
                    className="cat-cont"
                >

                    {isHoveringInfoIcon && !isMobileOnly &&
                        <div className="info-toolbox">
                            <h3>{category.description}</h3> 
                            <div></div>
                        </div>
                    }

                    <p>{category.name}</p> 
                    
                    <img 
                        onMouseEnter={this.handleMouseEnter}
                        onMouseLeave={this.handleMouseLeave}
                        style= {{opacity : isHoveringInfoIcon ? "1" : "0.5"}}
                        onTouchStart={this.handleTouchInfo}
                        onTouchEnd={this.handleTouchEnd}
                        src={infoIcon} alt=""
                    />
                
                </div>
                
                {isMobileOnly && isHoveringInfoIcon &&
                    <div className="description-mobile">
                        <p>{category.description}</p>
                    </div>
                }
            </div>
        )
    }
}

export default CategoryCard
