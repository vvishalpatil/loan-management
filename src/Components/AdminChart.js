import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

export default class AdminChart extends Component {
  constructor(props) {
    super(props);
    const { total_recovered, total_distributed, tenure } = this.props.loan;
    this.state = {
      total: total_recovered + total_distributed,
      tenure:tenure,
      chartData: {
        labels: ["Remaining", "Recovered"],
        datasets: [
          {
            backgroundColor: ["rgb(59, 120, 156)", "#76b900"],
            borderColor: "white",
            // hoverBorderColor : 'slateblue',
            // hoverBackgroundColor : 'gold',
            data: [total_distributed, total_recovered],
          },
        ],
      },
      options: {
        cutoutPercentage: 60,
        responsive: true,
        animation: {
          animateRotate: true,
          //  duration : 2000
        },
        legend: {
          // display:false
          labels: {
            // boxWidth : 10
            fontSize: 15,
            fontColor: "#5161ce",
          },
        },
        layout: {
          padding: 1,
        },
      },
    };
  }

  render() {
    return (
      <div className="card rounded shadow animate__animated animate__pulse">
        <div className="card-body">
          <div
            className="card-header shadow h5 rounded text-white"
            style={{ backgroundColor: "#5161ce" }}
          >
            Loan Summary
          </div>
          <hr className="w-75" style={{ borderTop: "2px solid #5161ce" }} />
          <Doughnut
            data={this.state.chartData}
            options={this.state.options}
            height={30}
            width={40}
          />
          <hr />
          <div className="card-text text-center mt-3 h6 ">
            {" "}
            Total Loan Distributed : Rs. {this.state.total}.
          </div>
          <div className="card-text text-center mt-4 h6 ">
            {" "}
            Estimated Recovery Time : {this.state.tenure} yrs.
          </div>
        </div>
      </div>
    );
  }
}



