import React, { Component } from 'react';
import axios from 'axios';
import MyContext from '../contexts/MyContext';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
// import { CategoryScale,LinearScale , Point } from 'chart.js';

import { BarController, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, BarController, BarElement, CategoryScale, LinearScale);
class Home extends Component {
  static contextType = MyContext; 
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      orders : []
    };
  }
  render() {
    let iphone = 0;
    let ipad = 0;
    let macbook = 0;
    let imac = 0;
    let applewatch = 0;
    let total = 0
    this.state.products.forEach((product) => {
      total += 1  
      switch (product.category.name) {
        case 'iPhone':
          iphone++;
          break;
        case 'iPad':
          ipad++;
          break;
        case 'Macbook':
          macbook++;
          break;
        case 'Imac':
          imac++;
          break;
        case 'Apple Watch':
          applewatch++;
          break;
        default:
          break;
      }
    });
    // Initialize an empty object to hold the counts
    let countsByDate = {};

    this.state.orders.forEach((order) => {
      // Convert Unix Epoch time to milliseconds and create a new Date object
      let date = new Date(order.cdate * 1000).toISOString().split('T')[0]; // Convert date to YYYY-MM-DD format

      // Initialize the count for this date to 0 if it doesn't exist
      if (!countsByDate[date]) {
        countsByDate[date] = 0;
      }

      // Increment the count for this date
      countsByDate[date]++;
    });

    console.log(countsByDate);


    let labels = Object.keys(countsByDate);
    let datal = Object.values(countsByDate);
    const dataBar = {
      labels: labels,
      datasets: [{
        label: 'Order per day',
        data: datal,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    };
    const data = {
      labels: ['Iphone', 'Ipad', 'Macbook', 'Imac', 'Apple watch'],
      datasets: [
        {
          label: '# of Votes',
          data: [iphone * 100 / total, ipad * 100 / total, macbook* 100 / total, imac* 100 / total, applewatch * 100 / total],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    return (
      <div className="">
        <h2 className="text-center">ADMIN HOME</h2>
        <Doughnut data={data} />
        <Bar type='bar' data={dataBar} />
      </div>
    );
  }


  componentDidMount() {
    this.apiGetProducts();
    this.apiGetOrders()
  }
  apiGetProducts() {
    axios.get('/api/admin/productss').then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }
  apiGetOrders() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/orders', config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }
}
export default Home;