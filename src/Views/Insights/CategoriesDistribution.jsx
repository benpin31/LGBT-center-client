import React, { Component } from 'react' ;
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";


export class CategoriesDistribution extends Component {

    state = {
        data:
            [
                { name: "Group A", value: 400 },
                { name: "Group B", value: 300 },
                { name: "Group C", value: 300 },
                { name: "Group D", value: 200 }
            ] 
    }

    colors=["#ffb0b0", "#fac696", "#f7e68f", "#a7f2a5", "#96f2ef", "#b5c8ff"] ;

    render() {
        console.log(this.colors)
        return (
            <div>
            <ResponsiveContainer width="100%" height={800}>
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
            </div>
        )
    }
}

export default CategoriesDistribution
