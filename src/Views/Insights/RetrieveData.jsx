import React, { Component } from 'react' ;
import { CSVLink } from "react-csv";

import './../../Styles/Calendar.css';
import './../../Styles/DataViz.css';

import apiHandler from '../../apiHandler/apiHandler';

import Header from './../../Components/DataVizHeader';


const flatData = (datas) => {
    return(datas.map(data => {return {    
        categoryName: data.category.name,
        categoryIsActive: data.category.isActive ? "actif" : "archivé",
        contactTypeName: data.contactType.name,
        contactTypeIsActive: data.contactType.isActive ? "actif" : "archivé",
        date: data.date
    }}
    )
)}

export class CategoriesDistribution extends Component {

    state = {
        data: null ,
        date: [new Date(), new Date()],
        calendarClicked: false,
        isLoading: true
    }

    setStartDate = date => {

        this.setState({date, isLoading:true},
            () => apiHandler.getVisitsDateRange({dates: date})
            .then(res =>  this.setState({data: flatData(res), isLoading:false}))
            .catch(err => console.log(err))
            ) ;
            
        this.setState({calendarClicked: false});
    };

    leaveSelectDay = () => {
        this.setState({selectDayClicked: false, calendarClicked: false});
    }

    componentDidMount() {
        const dateBegin = this.state.date[0].toISOString().substring(0,10) + " 00:00:00" ;
        const dateEnd = this.state.date[1].toISOString().substring(0,10) + " 23:59:59" ;
        apiHandler.getVisitsDateRange({dates: [dateBegin, dateEnd]})
            .then(res =>   this.setState({data: flatData(res), isLoading:false}))
            .catch(err => console.log(err))
        
    };

    openCalendar = () => {
        this.setState({calendarClicked: !this.state.calendarClicked});
    };
 
    render() {
        const {date, data, calendarClicked, isLoading} = this.state ;
        const dateBegin = date[0].toLocaleDateString('fr-FR', { year: 'numeric', month: 'numeric', day: 'numeric' });
        const dateEnd = date[1].toLocaleDateString('fr-FR', { year: 'numeric', month: 'numeric', day: 'numeric' });

        return (
            <div className="main-container">
                <Header 
                    setStartDate={this.setStartDate} 
                    calendarClicked={calendarClicked}
                    openCalendar={this.openCalendar}
                    date={date}
                    title="export"
                    leaveSelectDay={this.leaveSelectDay}
                />
                
                <div className="export">
                        <h1>Récupérer la liste des visites du</h1>
                        <p>{dateBegin} au {dateEnd}</p>
                        {data 
                            &&
                            <>
                                {!isLoading &&
                                    <CSVLink data={this.state.data} className="download-data">Télécharger les données</CSVLink>
                                }
                                {isLoading &&
                                    <div className="download-data">
                                        <p>Chargement des données</p>
                                    </div>
                                }
                            </>
                        }
                        </div>
                </div>
        )
    }
};

export default CategoriesDistribution
