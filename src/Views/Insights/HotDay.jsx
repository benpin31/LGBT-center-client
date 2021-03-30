import React, { PureComponent, Component } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Calendar from "react-calendar";
import apiHandler from "../../apiHandler/apiHandler";

const CustomizedDot = (props) => {
  const { cx, cy, value } = props;
  return (
    <svg
      x={cx - 10}
      y={cy - 10}
      width={20}
      height={20}
      fill="red"
      viewBox="0 0 1024 1024"
    >
      <path d="M512 1009.984c-274.912 0-497.76-222.848-497.76-497.76s222.848-497.76 497.76-497.76c274.912 0 497.76 222.848 497.76 497.76s-222.848 497.76-497.76 497.76zM340.768 295.936c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM686.176 296.704c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM772.928 555.392c-18.752-8.864-40.928-0.576-49.632 18.528-40.224 88.576-120.256 143.552-208.832 143.552-85.952 0-164.864-52.64-205.952-137.376-9.184-18.912-31.648-26.592-50.08-17.28-18.464 9.408-21.216 21.472-15.936 32.64 52.8 111.424 155.232 186.784 269.76 186.784 117.984 0 217.12-70.944 269.76-186.784 8.672-19.136 9.568-31.2-9.12-40.096z" />
    </svg>
  );
};

export class HotDay extends Component {
  state = {
    data: null,
    date: [new Date(new Date() - 31*24*3600*1000), new Date()],
  };

  setStartDate = (date) => {
    this.setState({ date }, () =>
      apiHandler
        .repartitionByWeeks({ dates: date })
        .then((res) => this.setState({ data: res }))
        .catch((err) => console.log(err))
    );
  };

  componentDidMount() {
    // const dateBegin = 
    //   this.state.date[0].toISOString().substring(0, 10) + " 00:00:00";
    // const dateEnd =
    //   this.state.date[1].toISOString().substring(0, 10) + " 23:59:59";

    const {date} = this.state ;

    const dateBegin = new Date(Date.UTC(date[0].getFullYear(),date[0].getMonth(),date[0].getDate())) ;
    const dateEnd = new Date(Date.UTC(date[1].getFullYear(),date[1].getMonth(),date[1].getDate(),23,59,59)) ;

    apiHandler
      .repartitionByWeeks({ dates: [dateBegin, dateEnd] })
      .then((res) => {
        console.log(res);
        this.setState({ data: res });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
        <div>
          <h2>rapport</h2>
          <div>
            <p>Choisir dates</p>
            <Calendar
              onChange={this.setStartDate}
              selectRange={true}
              value={this.state.date}
            />
          </div>
        </div>

        <div>
          {this.state.data && (
            <LineChart
              width={500}
              height={300}
              data={this.state.data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="name" />
              {/* <YAxis /> */}
              <Tooltip />
              {/* <Legend /> */}
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                dot={<CustomizedDot />}
              />
              {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
            </LineChart>
          )}
        </div>
      </div>
    );
  }
}

export default HotDay;
