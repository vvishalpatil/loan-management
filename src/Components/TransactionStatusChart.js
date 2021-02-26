import React, { Component } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import CurrencyFormat from "react-currency-format";
import axios from "axios";
import { data } from "jquery";

export default class TransactioStatusChart extends Component {
  constructor(props) {
    super(props);
    console.log('rendered')
    this.state = {
      display: false,

      chartData: {
        labels: ["Green", "Yellow", "Red"],
        datasets: [
          {
            backgroundColor: ["green", "yellow", "red"],
            borderColor: "white",
            // hoverBorderColor : 'slateblue',
            // hoverBackgroundColor : 'gold',
            data: [0, 0, 0],
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                max: 100
              }
            }
          ]
        },

        responsive: true,
        animation: {
          animateRotate: true,
          //  duration : 2000
        },
        legend: {
          display: false,
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
  fetchData = async (yearAndMonth) => {
    const res = await axios.get('/getTransactionStatus/', { params: { data: yearAndMonth } })
    console.log(res.data, 'fetchdata')

    this.setState({
      display: true,
      chartData: {
        labels: ["Green", "Yellow", "Red"],
        datasets: [
          {
            backgroundColor: ["green", "yellow", "red"],
            borderColor: "white",
            data: res.data.data,
          },
        ],
      }
      ,options: {
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                max: res.data.range
              }
            }
          ]
        },

        responsive: true,
        animation: {
          animateRotate: true,
          //  duration : 2000
        },
        legend: {
          display: false,
          labels: {
            // boxWidth : 10
            fontSize: 15,
            fontColor: "#5161ce",
          },
        },
        layout: {
          padding: 1,
        },
      }
  })

    console.log(this.state,'state in fetch data')
  }
  componentDidMount() {
    const res = this.fetchData('2021-02')
    console.log(res.data, 'component did mount')
  }
  handleChange(e) {
    console.log(e.target.value)
    console.log(this.state,'onchange')
    this.fetchData(e.target.value)
  }


  render() {
    if (this.state.display) {
      return (
        <div className="card rounded shadow animate__animated animate__pulse ">
          <div className="card-body">
            <div
              className="card-header shadow h5 rounded text-white"
              style={{ backgroundColor: "#5161ce" }}
            >
              Monthly Transaction Status
          </div>

            <hr className="w-75 mb-4" style={{ borderTop: "2px solid #5161ce" }} />
            <div>
              <form>
                <div class="form-group">
                  <input type="month" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => { this.handleChange(e) }} />
                </div>


              </form>

            </div>
            <Bar
              data={this.state.chartData}
              options={this.state.options}
              height={35}
              width={40}
            />

          </div>
        </div>
      );
    } else {
      return ('loading')
    }
  }
}
