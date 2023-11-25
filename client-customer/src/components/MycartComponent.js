import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CartUtil from '../utils/CartUtil';
import axios from 'axios';
import withRouter from '../utils/withRouter';
import { Button } from "@nextui-org/react";

class Mycart extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    const mycart = this.context.mycart.map((item, index) => {
      return (
        <div key={item.product._id} className="">
          <div className='flex py-6 gap-5  border-b-1 border-[#A3A3A3]'>
            <div>
              <img src={"data:image/jpg;base64," + item.product.image} className='w-[90px] h-[90px]' alt="" />
            </div>
            <div className='flex flex-col justify-center'>
              <p className='text-lg' >{item.product.name}</p>
              <p className='text-sm font-light' >{item.product._id}</p>
            </div>
            <div className='flex justify-center flex-col'>
              <p className='block border-2 h-fit w-fit px-4 rounded-md'>{item.quantity}</p>
            </div>
            <div className='flex justify-center flex-col'>
              <p className='text-xl'>${item.product.price}</p>
            </div>
            <div className='flex justify-center flex-col'>
              <span className="cursor-pointer" onClick={() => this.lnkRemoveClick(item.product._id)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </div>

          </div>
        </div>
      );
    });
    return (
      <div className="flex gap-10 w-3/5 py-10">
        <div className='w-1/2'>
          <h2 className="font-bold text-lg">Shopping Cart</h2>
          {mycart}
        </div>
        <div className='w-1/2 flex flex-col gap-5 px-[56px] py-[64px] border-1 border-[#A3A3A3] rounded-2xl' >
          <span className='font-bold text-lg'>Order Summary</span>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Discount code / Promo code
            </label>
            <input
              type=""
              placeholder='Code'
              className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className='flex gap-5 flex-col'>
            <div className='flex justify-between'>
              <span className='font-bold'>Subtotal</span>
              <span >${CartUtil.getTotal(this.context.mycart)}</span>
            </div>
            <div className='flex justify-between'>
              <span className=''>Estimated Tax</span>
              <span >$0</span>
            </div>
            <div className='flex justify-between'>
              <span className=''>Estimated shipping & Handling</span>
              <span >$0</span>
            </div>
            <div className='flex justify-between'>
              <span className='font-bold text-lg'>Total</span>
              <span>${CartUtil.getTotal(this.context.mycart)}</span>
            </div>
          </div>
          <Button color="primary" onClick={() => this.lnkCheckoutClick()} >
            Checkout
          </Button>
        </div>
      </div>
    );
  }
  lnkRemoveClick(id) {
    const mycart = this.context.mycart;
    const index = mycart.findIndex(x => x.product._id === id);
    if (index !== -1) { // found, remove item
      mycart.splice(index, 1);
      this.context.setMycart(mycart);
    }
  }
  // event-handlers
  lnkCheckoutClick() {
    if (window.confirm('ARE YOU SURE?')) {
      if (this.context.mycart.length > 0) {
        const total = CartUtil.getTotal(this.context.mycart);
        const items = this.context.mycart;
        const customer = this.context.customer;
        if (customer) {
          this.apiCheckout(total, items, customer);
        } else {
          this.props.navigate('/login');
        }
      } else {
        alert('Your cart is empty');
      }
    }
  }
  // apis
  apiCheckout(total, items, customer) {
    const body = { total: total, items: items, customer: customer };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/customer/checkout', body, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
        this.context.setMycart([]);
        this.props.navigate('/home');
      } else {
        alert('SORRY BABY!');
      }
    });
  }
}
export default withRouter(Mycart);
