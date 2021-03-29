import React, { Component } from 'react' ;
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
// import DatePicker from "react-datepicker" ;
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import apiHandler from '../../apiHandler/apiHandler';
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';


export class CategoriesDistribution extends Component {

    state = {
        data: null ,
        date: [new Date(), new Date()],
    }

    colors=["#ffb0b0", "#fac696", "#f7e68f", "#a7f2a5", "#96f2ef", "#b5c8ff"] ;

    setStartDate = date => {
        this.setState({date},
            () => apiHandler.repartitionByCategory(date)
            .then(res =>  this.setState({data: res}))
            .catch(err => console.log(err))
            ) ;

    }

    componentDidMount() {
        console.log("toto")
        const dateBegin = this.state.date[0].toISOString().substring(0,10) + " 00:00:00" ;
        const dateEnd = this.state.date[1].toISOString().substring(0,10) + " 23:59:59" ;
        apiHandler.repartitionByCategory([dateBegin, dateEnd])
            .then(res =>  {console.log(res) ; this.setState({data: res})})
            .catch(err => console.log(err))
    }
 
    render() {
        const {date} = this.state ;
        console.log(date)



        return (
            <div className="Graph-container" style={{height:"100vh", position:"relative"}}>
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
                    <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            }


                <div style={{position:"absolute", top:"50%"}}>
                    {this.state.data && <div>{this.state.data.reduce((acc, curr) => acc + curr.value, 0)}</div>}
                    {/* <DatePicker selected={dateBegin} onChange={date => this.setStartDate(date)}  />             */}
                    <Calendar
                        onChange={this.setStartDate}
                        selectRange={true}
                        value={this.state.date}
                    />

                </div>
            </div>
        )
    }
}

export default CategoriesDistribution
