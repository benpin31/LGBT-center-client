import React, { Component } from 'react';
import Calendar from 'react-calendar';

export class DataVizHeader extends Component {

    render() {
        const {calendarClicked, setStartDate, openCalendar, date, selectDayClicked, openFilterDay, weekDays, leaveSelectDay, title} = this.props;
        
        return (
            <div className="Graph-header">
                <h2>{title}</h2>
                <div className= "filter-container">
                    {this.props.isCheckboxes &&
                        <div className="select-day-container">
                            <p 
                            className={selectDayClicked ? "selected-filter" : ""}
                            onClick={openFilterDay}>
                                Choisir jours
                            </p>
                            {selectDayClicked &&
                                <div 
                                    onMouseLeave={leaveSelectDay}
                                    className="select-day-drop-down">
                                    <div>
                                        <label htmlFor="Lundi">Lundi</label>
                                        <input type="checkbox" name="Lundi" id="Lundi" onChange={this.props.handleToggleDay} defaultChecked={weekDays.includes("Lundi")}/>
                                    </div>
                                    <div>
                                        <label htmlFor="Mardi">Mardi</label>
                                        <input type="checkbox" name="Mardi" id="Mardi" onChange={this.props.handleToggleDay} defaultChecked={weekDays.includes("Mardi")}/>
                                    </div>
                                    <div>
                                        <label htmlFor="Mercredi">Mercredi</label>
                                        <input type="checkbox" name="Mercredi" id="Mercredi" onChange={this.props.handleToggleDay} defaultChecked={weekDays.includes("Mercredi")}/>
                                    </div>
                                    <div>
                                        <label htmlFor="Jeudi">Jeudi</label>
                                        <input type="checkbox" name="Jeudi" id="Jeudi" onChange={this.props.handleToggleDay} defaultChecked={weekDays.includes("Jeudi")}/>
                                    </div>
                                    <div>
                                        <label htmlFor="Vendredi">Vendredi</label>
                                        <input type="checkbox" name="Vendredi" id="Vendredi" onChange={this.props.handleToggleDay} defaultChecked={weekDays.includes("Vendredi")}/>
                                    </div>
                                    <div>
                                        <label htmlFor="Samedi">Samedi</label>
                                        <input type="checkbox" name="Samedi" id="Samedi" onChange={this.props.handleToggleDay} defaultChecked={weekDays.includes("Samedi")}/>
                                    </div>
                                </div>
                            }
                        </div>
                    }
                    <p 
                        className={calendarClicked ? "selected-filter" : ""}
                        onClick={openCalendar}>Choisir dates</p>
                    {calendarClicked &&
                        <div onMouseLeave={leaveSelectDay}>
                            <Calendar
                                onChange={setStartDate}
                                selectRange={true}
                                value={date}
                                className="small-calendar"
                            />
                        </div>
                    }

                </div>
            </div>
        )
    }
}

export default DataVizHeader
