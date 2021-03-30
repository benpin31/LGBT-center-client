import React, { Component } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Calendar from "react-calendar";
import apiHandler from "../../apiHandler/apiHandler";
import Header from "../../Components/DataVizHeader";

const CustomizedDot = (props) => {
  const { cx, cy, value } = props;
  return (
    <svg
      x={cx - 20}
      y={cy - 20}
      width={100}
      height={100}
      fill="red"
      viewBox="0 0 1024 1024"
    >
      <mask
        id="a"
        width="503"
        height="457"
        x="17"
        y="44"
        maskUnits="userSpaceOnUse"
      >
        <path
          fill="#FFFFFF"
          d="M60.832 87.832c58.443-58.443 153.197-58.443 211.64 0l196.645 196.645c6.248 6.248 6.248 16.379 0 22.627L280.104 496.117c-6.248 6.248-16.379 6.248-22.627 0L60.832 299.472c-58.443-58.443-58.443-153.197 0-211.64z"
        />
        <path
          fill="#FFFFFF"
          d="M475.758 87.832c-58.443-58.443-153.197-58.443-211.64 0L67.474 284.477c-6.249 6.248-6.249 16.379 0 22.627l189.012 189.013c6.249 6.248 16.379 6.248 22.628 0l196.644-196.645c58.443-58.443 58.443-153.197 0-211.64z"
        />
      </mask>
      <g mask="url(#a)">
        <path fill="#FFB0B0" d="M17 44h503v66.143H17z" />
        <path fill="#FAC696" d="M17 110.143h503v66.143H17z" />
        <path fill="#F7E68F" d="M17 176.286h503v66.143H17z" />
        <path fill="#A7F2A5" d="M17 242.429h503v66.143H17z" />
        <path fill="#96F2EF" d="M17 308.571h503v66.143H17z" />
        <path fill="#B5C8FF" d="M17 374.714h503v66.143H17z" />
        <path fill="#F5C7FF" d="M17 440.857h503V507H17z" />
      </g>
    </svg>
  );
};

export class HotDay extends Component {
  state = {
    data: null,
    date: [new Date(new Date() - 31 * 24 * 3600 * 1000), new Date()],
    //  default view : 1 month of data
    calendarClicked: false,
  };

  setStartDate = (date) => {
    this.setState({ date }, () =>
      apiHandler
        .repartitionByWeeks({ dates: date })
        .then((res) =>
          this.setState({
            data: res.agregatedData,
            date: res.updatedDates.map((date) => new Date(date)),
          })
        )
        .catch((err) => console.log(err))
    );
    this.setState({ calendarClicked: false });
  };

  componentDidMount() {
    const { date } = this.state;

    const dateBegin = new Date(
      Date.UTC(date[0].getFullYear(), date[0].getMonth(), date[0].getDate())
    );
    const dateEnd = new Date(
      Date.UTC(
        date[1].getFullYear(),
        date[1].getMonth(),
        date[1].getDate(),
        23,
        59,
        59
      )
    );

    apiHandler
      .repartitionByWeeks({ dates: [dateBegin, dateEnd] })
      .then((res) => {
        console.log(res);
        this.setState({
          data: res.agregatedData,
          date: res.updatedDates.map((date) => new Date(date)),
        });
      })
      .catch((err) => console.log(err));
  }

  openCalendar = () => {
    this.setState({ calendarClicked: !this.state.calendarClicked });
  };

  render() {
    const { date, data, calendarClicked } = this.state;
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

    return (
      <div className="main-container">
        <Header
          setStartDate={this.setStartDate}
          calendarClicked={calendarClicked}
          openCalendar={this.openCalendar}
          date={date}
        />
        <div className="background-hot-day">
          <div className="date-range-container">
            <p>
              du {dateBegin} au {dateEnd}
            </p>
          </div>
          <div className="Graph-hot-day">
            {this.state.data && (
              <ResponsiveContainer width="80%" height="70%" style={{paddingTop: "50px"}}>
                <LineChart
                  width="100%"
                  height="100%"
                  data={this.state.data}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  <XAxis
                    dataKey="name"
                    tick={{ stroke: "#423566" }}
                    tickLine={false}
                  />
                  <YAxis axisLine={false} tick={false} padding={{top: 20}} />
                  <Tooltip cursor={false} />
                  {/* <Legend /> */}
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#714ED7"
                    dot={<CustomizedDot />}
                    name="Visites"
                    activeDot={false}
                  />
                  {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="bottom-hot-day">
            {data && (
              <div className="total-hot-day">
                <h2>moyenne des visites en semaine</h2>
                <p>{data.reduce((acc, curr) => acc + curr.value, 0)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default HotDay;
