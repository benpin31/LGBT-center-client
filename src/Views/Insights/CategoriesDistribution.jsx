import React, { Component } from 'react' ;
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

import Calendar from 'react-calendar';
import './../../Styles/Calendar.css';
import './../../Styles/DataViz.css';

import apiHandler from '../../apiHandler/apiHandler';
// import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';


export class CategoriesDistribution extends Component {

    state = {
        data: null ,
        date: [new Date(), new Date()],
    }

    colors=["#ffb0b0", "#fac696", "#f7e68f", "#a7f2a5", "#96f2ef", "#b5c8ff", "#F5C7FF", "#C4C4C4"] ;

    setStartDate = date => {
        this.setState({date},
            () => apiHandler.repartitionByCategory({dates: date})
            .then(res =>  this.setState({data: res}))
            .catch(err => console.log(err))
            ) ;

    }

    componentDidMount() {
        console.log("toto")
        const dateBegin = this.state.date[0].toISOString().substring(0,10) + " 00:00:00" ;
        const dateEnd = this.state.date[1].toISOString().substring(0,10) + " 23:59:59" ;
        apiHandler.repartitionByCategory({dates: [dateBegin, dateEnd]})
            .then(res =>  {console.log(res) ; this.setState({data: res})})
            .catch(err => console.log(err))
    }
 
    render() {
        const {date} = this.state ;
        console.log(date)



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
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                            data={this.state.data}
                            startAngle={180}
                            endAngle={0}
                            dataKey="value"
                            outerRadius="100%"
                            >
                            {this.state.data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={this.colors[index % this.colors.length]} />
                            ))}
                            </Pie>
                        <Tooltip 
                            contentStyle={{borderRadius: "8px", boxShadow: "1px 2px 4px rgba(0, 0, 0, 0.12)", border:"none", fontFamily: "Asap", fontSize:"14px", transform: "translate(-60%, -100%)" }}
                        />
                        </PieChart>
                    </ResponsiveContainer>
                }


                    <div className="bottom-container">
                        {this.state.data && 
                        <div className="total">
                            <h2>total des visites</h2>
                            <p>{this.state.data.reduce((acc, curr) => acc + curr.value, 0)}</p>
                        </div>}
                    </div>
                </div>
            </div>
        )
    }
}

export default CategoriesDistribution
