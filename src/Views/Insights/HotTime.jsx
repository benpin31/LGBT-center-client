import React, { Component } from 'react' ;
import { BarChart, Tooltip, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Bar, Text} from "recharts";

import Calendar from 'react-calendar';
import './../../Styles/Calendar.css';
import './../../Styles/DataViz.css';

import apiHandler from '../../apiHandler/apiHandler';

import Header from './../../Components/DataVizHeader';


export class CategoriesDistribution extends Component {

    state = {
        data: null ,
        date: [new Date(new Date() - 31*24*3600*1000), new Date()],
        //  default view : 1 month of data
        weekDays: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
        calendarClicked: false,
        selectDayClicked:false,
        isCheckboxes: true
    }

    colors=["#ffb0b0", "#fac696", "#f7e68f", "#a7f2a5", "#96f2ef", "#b5c8ff", "#F5C7FF", "#C4C4C4"] ;

    setStartDate = date => {
        const {weekDays} = this.state ;
        console.log(weekDays)

        this.setState({date},
            () => apiHandler.hotTime({dates: date, weekDays})
            .then(res =>  {
              this.setState({data: res});
              this.setState({calendarClicked: false});
            })
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

    openCalendar = () => {
      this.setState({calendarClicked: !this.state.calendarClicked});
    };

    openFilterDay = () => {
      this.setState({selectDayClicked: !this.state.selectDayClicked});
    }
 
    render() {
        const {date, calendarClicked, isCheckboxes, selectDayClicked, weekDays} = this.state ;
        const dateBegin = date[0].toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        });
        const dateEnd = date[1].toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        });

        let name, visit ;
        if (this.state.value) {
            name = this.state.status.name ;
            visit = this.state.status.visit ;
        }

        return (
            <div className="main-container">
                <Header 
                  setStartDate={this.setStartDate} 
                  calendarClicked={calendarClicked}
                  selectDayClicked={selectDayClicked}
                  openCalendar={this.openCalendar}
                  openFilterDay={this.openFilterDay}
                  date={date}
                  isCheckboxes={isCheckboxes}
                  handleToggleDay={this.handleToggleDay}
                  weekDays={weekDays}
                />

                <div className="background-container-hot-time">

                  <div className="Graph-container">
                    <div className="date-range-container">
                      <p>
                        du {dateBegin} au {dateEnd}
                      </p>
                    </div>

                  {
                      this.state.data 
                          &&
                          <>
                        <ResponsiveContainer width="100%" height="50%">
                          <BarChart
                            data={this.state.data}
                          >
                            <XAxis 
                              dataKey="name" 
                              tick={{fill: "#423566"}}
                              tickMargin={15}
                                  // change tick color
                              tickLine={false}
                                  // don't plot the tick
                              axisLine={false}
                                  // don't plot the axis
                              />
                            <defs>
                              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="15%" stopColor="#ffb0b0" stopOpacity={0.8}/>
                                  <stop offset="30%" stopColor="#fac696" stopOpacity={0.8}/>
                                  <stop offset="45%" stopColor="#f7e68f" stopOpacity={0.8}/>
                                  <stop offset="60%" stopColor="#a7f2a5" stopOpacity={0.8}/>
                                  <stop offset="75%" stopColor="#96f2ef" stopOpacity={0.8}/>
                                  <stop offset="90%" stopColor="#b5c8ff" stopOpacity={0.8}/>
                              </linearGradient>
                          </defs>
                            <Tooltip 
                              cursor={false}
                              contentStyle={{borderRadius: "8px", boxShadow: "1px 2px 4px rgba(0, 0, 0, 0.12)", border:"none", fontFamily: "Asap", fontSize:"12px" }}
                            />
                            <Bar 
                              dataKey="value" 
                              fill="url(#colorUv)" 
                              name="Visites"
                              />
                          </BarChart>
                        </ResponsiveContainer>
                        
                        </>
                  }

                  </div>
                </div>
            </div>
        )
    }
}

export default CategoriesDistribution
