import axios from 'axios';
import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import { Spinner } from "@nextui-org/react";


class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading:true
    };
  }
  render() {
    if (this.state.loading)  {
      return (
        <div className='w-[100px] h-[500px] flex justify-center items-center'>
          <Spinner />
        </div>
      );
    }
    const prods = this.state.products.map((item) => {
      return (
        <a key={item._id} href="" className="group">
          <div
            className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <Link to={'/product/' + item._id}>
              <img src={"data:image/jpg;base64," + item.image}
                className="h-full w-full object-cover object-center group-hover:opacity-75" />
            </Link>
          </div>
          <h3 className="mt-4 text-sm text-gray-700">{item.name}</h3>
          <p className="mt-1 text-lg font-medium text-gray-900">${item.price}</p>
        </a>
      );
    });
    return (
      <div className="w-5/6 mx-auto">
        <h2 className="text-center">LIST PRODUCTS</h2>
        <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
          {prods}
        </div>
      </div>
    );
  }
  componentDidMount() { // first: /product/...
    const params = this.props.params;
    if (params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }
  componentDidUpdate(prevProps) { // changed: /product/...
    const params = this.props.params;
    if (params.cid && params.cid !== prevProps.params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword && params.keyword !== prevProps.params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }
  // apis
  apiGetProductsByKeyword(keyword) {
    axios.get('/api/customer/products/search/' + keyword).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }
  // apis
  apiGetProductsByCatID(cid) {
    axios.get('/api/customer/products/category/' + cid).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }
  apiGetProductsByKeyword(keyword) {
    this.setState({loading:true})
    axios.get('/api/customer/products/search/' + keyword)
      .then((res) => {
        const result = res.data;
        this.setState({ products: result, loading: false });
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        // Handle the error, e.g., set an error state
      });
  }
  apiGetProductsByCatID(cid) {
    this.setState({loading:true})
    axios.get('/api/customer/products/category/' + cid)
      .then((res) => {
        const result = res.data;
        this.setState({ products: result, loading: false });
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }
}
export default withRouter(Product);