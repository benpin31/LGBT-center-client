import React, { Component } from 'react' ;
import { BarChart, Tooltip, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Bar } from "recharts";

import Calendar from 'react-calendar';
import './../../Styles/Calendar.css';
import './../../Styles/DataViz.css';

import apiHandler from '../../apiHandler/apiHandler';
// import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';


export class CategoriesDistribution extends Component {

    state = {
        data: null ,
        date: [new Date(new Date() - 31*24*3600*1000), new Date()],
        weekDays: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
    }

    colors=["#ffb0b0", "#fac696", "#f7e68f", "#a7f2a5", "#96f2ef", "#b5c8ff", "#F5C7FF", "#C4C4C4"] ;

    setStartDate = date => {
        this.setState({date},
            () => apiHandler.hotTime({dates: date})
            .then(res =>  this.setState({data: res}))
            .catch(err => console.log(err))
            ) ;

    }

    componentDidMount() {
        const {date} = this.state ;

        const dateBegin = new Date(Date.UTC(date[0].getFullYear(),date[0].getMonth(),date[0].getDate())) ;
        const dateEnd = new Date(Date.UTC(date[1].getFullYear(),date[1].getMonth(),date[1].getDate(),23,59,59)) ;

        apiHandler.hotTime({dates: [dateBegin, dateEnd]})
            .then(res => this.setState({data: res}))
            .catch(err => console.log(err))
    }

    handleToggleDay = event => {
        const {date} = this.state ;

        const dateBegin = new Date(Date.UTC(date[0].getFullYear(),date[0].getMonth(),date[0].getDate())) ;
        const dateEnd = new Date(Date.UTC(date[1].getFullYear(),date[1].getMonth(),date[1].getDate(),23,59,59)) ;

        const {weekDays} = this.state ;
        const day = event.target.name ;
        const index = weekDays.indexOf(day) ;

        if (index > 0) {
            weekDays.splice(index, 1) ;
        } else {
            weekDays.push(day) ;
        }

        apiHandler.hotTime({dates: [dateBegin, dateEnd], weekDays})
            .then(res => this.setState({data: res}))
            .catch(err => console.log(err))

    }
 
    render() {
        const {date} = this.state ;
        console.log(date)

        let name, visit ;
        if (this.state.value) {
            name = this.state.status.name ;
            visit = this.state.status.visit ;
        }

        return (
            <div className="main-container">
                <div className="Graph-header">
                    <h2>rapport</h2>
                    <div>
                        <p>Choisir dates</p>
                        <Calendar
                            onChange={this.setStartDate}
                            selectRange={true}
                            value={this.state.date}
                            className="small-calendar"
                        />
                    </div>
                </div>
                <div className="Graph-container">

                {
                    this.state.data 
                        &&
                        <>
                        <ResponsiveContainer width="100%" height="50%">
                        <BarChart
                          data={this.state.data}
                        >
                          <XAxis dataKey="name" />
                          <Tooltip />
                          <Bar dataKey="value" fill="#ffb0b0" name="Visits" />
                        </BarChart>
                      </ResponsiveContainer>
                      <div>
                          <div>
                            <label htmlFor="Lundi">Lundi</label>
                            <input type="checkbox" name="Lundi" id="Lundi" onChange={this.handleToggleDay} defaultChecked={true}/>
                          </div>
                          <div>
                            <label htmlFor="Mardi">Mardi</label>
                            <input type="checkbox" name="Mardi" id="Mardi" onChange={this.handleToggleDay} defaultChecked={true}/>
                          </div>
                          <div>
                            <label htmlFor="Mercredi">Mercredi</label>
                            <input type="checkbox" name="Mercredi" id="Mercredi" onChange={this.handleToggleDay} defaultChecked={true}/>
                          </div>
                          <div>
                            <label htmlFor="Jeudi">Jeudi</label>
                            <input type="checkbox" name="Jeudi" id="Jeudi" onChange={this.handleToggleDay} defaultChecked={true}/>
                          </div>
                          <div>
                            <label htmlFor="Vendredi">Vendredi</label>
                            <input type="checkbox" name="Vendredi" id="Vendredi" onChange={this.handleToggleDay} defaultChecked={true}/>
                          </div>
                          <div>
                            <label htmlFor="Samedi">Samedi</label>
                            <input type="checkbox" name="Samedi" id="Samedi" onChange={this.handleToggleDay} defaultChecked={true}/>
                          </div>
                      </div>
                      </>
                }

                </div>
            </div>
        )
    }
}

export default CategoriesDistribution
