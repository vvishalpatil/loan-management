import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

export default class LoanChart extends Component {
  constructor(props) {
    super(props);
    const { paid, remaining } = this.props.loan;

    this.state = {
      total: paid + remaining,
      chartData: {
        labels: ["Remaining", "Paid"],
        datasets: [
          {
            backgroundColor: ["rgb(59, 120, 156)", "#76b900"],
            borderColor: "white",
            // hoverBorderColor : 'slateblue',
            // hoverBackgroundColor : 'gold',
            data: [remaining, paid],
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
            Total Owed : Rs. {this.state.total}.
          </div>
        </div>
      </div>
    );
  }
}
