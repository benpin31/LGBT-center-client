import React, { Component } from 'react';
import Calendar from 'react-calendar';

export class DataVizHeader extends Component {

    render() {
        const {calendarClicked, setStartDate, openCalendar, date} = this.props;
        
        return (
            <div className="Graph-header">
                <h2>rapport</h2>
                <div className= "filter-container">
                    <p 
                        className={calendarClicked ? "selected-filter" : ""}
                        onClick={openCalendar}>Choisir dates</p>
                    {calendarClicked &&
                        <Calendar
                            onChange={setStartDate}
                            selectRange={true}
                            value={date}
                            className="small-calendar"
                        />
                    }

                </div>
            </div>
        )
    }
}

export default DataVizHeader
