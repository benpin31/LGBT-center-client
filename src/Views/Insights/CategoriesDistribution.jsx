import React, { Component, createRef } from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from "recharts";
import { exportComponentAsPNG } from 'react-component-export-image';

import './../../Styles/Calendar.css';
import './../../Styles/DataViz.css';

import apiHandler from '../../apiHandler/apiHandler';

import Header from './../../Components/DataVizHeader';


const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	);
};


export class CategoriesDistribution extends Component {

	state = {
		data: null,
		date: [new Date(), new Date()],
		calendarClicked: false,
		plotLegend: false
	}

	chartRef = createRef();

	colors = ["#ffb0b0", "#fac696", "#f7e68f", "#a7f2a5", "#96f2ef", "#b5c8ff", "#F5C7FF", "#C4C4C4"];

	setStartDate = date => {
		this.setState({ date },
			() => apiHandler.repartitionByCategory({ dates: date })
				.then(res => this.setState({ data: res }))
				.catch(err => console.log(err))
		);

		this.setState({ calendarClicked: false });
	};

	componentDidMount() {
		const dateBegin = this.state.date[0].toISOString().substring(0, 10) + " 00:00:00";
		const dateEnd = this.state.date[1].toISOString().substring(0, 10) + " 23:59:59";
		apiHandler.repartitionByCategory({ dates: [dateBegin, dateEnd] })
			.then(res => this.setState({ data: res }))
			.catch(err => console.log(err))
	};

	openCalendar = () => {
		this.setState({ calendarClicked: !this.state.calendarClicked });
	};

	leaveSelectDay = () => {
		this.setState({ calendarClicked: false });
	}

	exportChart = () => {
		this.setState({ plotLegend: true }, () => {
			exportComponentAsPNG(this.chartRef);
			this.setState({ plotLegend: false })
		})

	}

	render() {
		const { date, data, calendarClicked, plotLegend } = this.state;
		const dateBegin = date[0].toLocaleDateString('fr-FR', { year: 'numeric', month: 'numeric', day: 'numeric' });
		const dateEnd = date[1].toLocaleDateString('fr-FR', { year: 'numeric', month: 'numeric', day: 'numeric' });

		return (
			<div className="main-container">
				<Header
					setStartDate={this.setStartDate}
					calendarClicked={calendarClicked}
					openCalendar={this.openCalendar}
					leaveSelectDay={this.leaveSelectDay}
					date={date}
					title="répartitions des semaines"
				/>

				<div className="background-container" ref={this.chartRef}>
					<div className="Graph-container">
						<div className="date-range-container">
							<p>du {dateBegin} au {dateEnd}</p>
						</div>

						{
							data
							&&
							<ResponsiveContainer width="100%" height="100%" >
								<PieChart >
									<Legend verticalAlign="top" align="center" height="30px" />
									<Pie
										data={data}
										startAngle={180}
										endAngle={0}
										dataKey="value"
										outerRadius="100%"
										// isAnimationActive={false}
										label={plotLegend && renderCustomizedLabel}
										labelLine={false}
										height={20}
										legendType={plotLegend ? "square" : "none"}
									>
										{data.map((entry, index) => (
											<Cell key={`cell-${index}`} fill={this.colors[index % this.colors.length]} />
										))}
									</Pie>
									<Tooltip
										contentStyle={{ borderRadius: "8px", boxShadow: "1px 2px 4px rgba(0, 0, 0, 0.12)", border: "none", fontFamily: "Asap", fontSize: "12px", transform: "translate(-60%, -100%)" }}
									/>
								</PieChart>
							</ResponsiveContainer>
						}



						<div className="bottom-container">

							{data &&
								<div className="total">
									<h2>total des visites</h2>
									<p>{data.reduce((acc, curr) => acc + curr.value, 0)}</p>
								</div>}
							<div className="download-data" onClick={this.exportChart} style={{ display: plotLegend ? 'none' : 'flex' }}>
								<p>Exporter en PNG</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
};

export default CategoriesDistribution
