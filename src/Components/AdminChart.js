import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import CurrencyFormat from "react-currency-format";

export default class AdminChart extends Component {
  constructor(props) {
    super(props);
    const { total_recovered, total_distributed, tenure } = this.props.loan;
    this.state = {
      total: total_recovered + total_distributed,
      tenure: tenure,
      chartData: {
        labels: ["Loan Remaining", "Loan Recovered"],
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
        cutoutPercentage: 0,
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

  formatTenure() {
    let year = parseInt(this.state.tenure / 12);
    let month = this.state.tenure % 12;
    console.log(month, year);
    if (year < 1) {
      return <span>{month} mths.</span>;
    } else if (year == 1) {
      if (month == 0) {
        return <span>{year} yr.</span>;
      } else {
        return (
          <span>
            {year} yr {month} mths.
          </span>
        );
      }
    } else {
      return (
        <span>
          {year} yrs {month} mths.
        </span>
      );
    }
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
            height={35}
            width={40}
          />
          <hr />
          <div className="card-text text-center mt-3 h6 ">
            {" "}
            Loan Distributed :{" "}
            <CurrencyFormat
              value={this.state.total}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"Rs. "}
            />
          </div>
          <div className="card-text text-center mt-4 h6 ">
            {" "}
            Estimated Recovery Time : <br/><br/> {this.formatTenure()}
          </div>
        </div>
      </div>
    );
  }
}
