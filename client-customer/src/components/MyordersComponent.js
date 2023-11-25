import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";


class Myorders extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null
    };
  }
  render() {
    if (this.context.token === '') return (<Navigate replace to='/login' />);
    const orders = this.state.orders.map((item) => {
      return (
        <TableRow key={item._id} className="" onClick={() => this.trItemClick(item)}>
          <TableCell>{item._id}</TableCell>
          <TableCell>{new Date(item.cdate).toLocaleString()}</TableCell>
          <TableCell>{item.customer.name}</TableCell>
          <TableCell>{item.customer.phone}</TableCell>
          <TableCell>{item.total}</TableCell>
          <TableCell>{item.status}</TableCell>
        </TableRow>
      );
    });
    if (this.state.order) {
      var items = this.state.order.items.map((item, index) => {
        return (
            <TableRow key={item.product._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.product._id}</TableCell>
              <TableCell>{item.product.name}</TableCell>
              <TableCell><img src={"data:image/jpg;base64," + item.product.image} width="70px" height="70px" alt="" /></TableCell>
              <TableCell>{item.product.price}</TableCell>
              <TableCell>{item.product.quantity}</TableCell>
              <TableCell>{item.product.price * item.quantity}</TableCell>
            </TableRow>
        );
      });
    }
    return (
      <div>
        <div className="align-center">
          <h2 className="text-center">ORDER LIST</h2>
          <Table className="" selectionMode="single" >
            <TableHeader>
              <TableColumn>ID</TableColumn>
              <TableColumn>Creator Day</TableColumn>
              <TableColumn>Customer name</TableColumn>
              <TableColumn>Customer phone</TableColumn>
              <TableColumn>Total</TableColumn>
              <TableColumn>Status</TableColumn>
            </TableHeader>
            <TableBody>
              {orders}
            </TableBody>
          </Table>
        </div>
        {this.state.order ?
          <div className="align-center">
            <h2 className="text-center">ORDER DETAIL</h2>

            <Table className="datatable" border="1">
            <TableHeader className="datatable">
                  <TableColumn>No.</TableColumn>
                  <TableColumn>Prod.ID</TableColumn>
                  <TableColumn>Prod.name</TableColumn>
                  <TableColumn>Image</TableColumn>
                  <TableColumn>Price</TableColumn>
                  <TableColumn>Quantity</TableColumn>
                  <TableColumn>Amount</TableColumn>
                </TableHeader>
              <TableBody>
                {items} 
              </TableBody>
            </Table>
          </div>
          : <div />}
      </div>
    );
  }
  componentDidMount() {
    if (this.context.customer) {
      const cid = this.context.customer._id;
      this.apiGetOrdersByCustID(cid);
    }
  }
  // event-handlers
  trItemClick(item) {
    this.setState({ order: item });
  }
  // apis
  apiGetOrdersByCustID(cid) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/customer/orders/customer/' + cid, config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }
}
export default Myorders;