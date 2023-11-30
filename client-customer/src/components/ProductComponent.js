import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import { Spinner, Button, Slider } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";


class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originalProducts: [],
      products: [],
      loading: true
    };
  }
  handleSortChange = (key) => {
    if (key === 'lowToHigh') {
      this.sortProductsByPrice(true);
    } else if (key === 'highToLow') {
      this.sortProductsByPrice(false);
    }
  }
  handleSliderChange = (values) => {
    this.setState({ minPrice: values[0], maxPrice: values[1] });
  }
  sortProductsByPrice = (ascending) => {
    this.setState(prevState => {
      const sortedProducts = [...prevState.products].sort((a, b) => {
        if (ascending) {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });

      return { products: sortedProducts };
    });
  }
  filterProductsByPriceRange = (minPrice, maxPrice) => {
    this.setState(prevState => {
      const filteredProducts = prevState.products.filter(product => product.price >= minPrice && product.price <= maxPrice);
      return { products: filteredProducts };
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className='w-[100px] h-[500px] flex justify-center items-center'>
          <Spinner />
        </div>
      );
    }
    const prods = this.state.products.map((item) => {
      return (
        <div key={item._id} className="group cursor-pointer">
          <div
            className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <Link to={'/product/' + item._id}>
              <img src={"data:image/jpg;base64," + item.image}
                alt='phone img'
                className="h-full w-full object-cover object-center group-hover:opacity-75" />
            </Link>
          </div>
          <h3 className="mt-4 text-sm text-gray-700">{item.name}</h3>
          <p className="mt-1 text-lg font-medium text-gray-900">${item.price}</p>
        </div>
      );
    });
    return (
      <div className="w-5/6 mx-auto">
        <h2 className="text-center">LIST PRODUCTS</h2>
        <div className='flex flex-row w-full justify-between'>
          <div>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered" className="capitalize">
                  Sort by price
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Sort by price"
                variant="flat"
              >
                <DropdownItem onClick={() => this.sortProductsByPrice(true)} >Low to high</DropdownItem>
                <DropdownItem onClick={() => this.sortProductsByPrice(false)} >High to low</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className='w-1/3 flex items-end flex-col'>
            <Slider
              label="Price Range"
              step={10}
              minValue={0}
              maxValue={2000}
              defaultValue={[0, 1000]}
              formatOptions={{ style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }}
              className="max-w-md"
              onChange={this.handleSliderChange}
            />
            <Button variant='bordered' onClick={() => this.filterProductsByPriceRange(this.state.minPrice, this.state.maxPrice)}>Filter by price range</Button>
          </div>
        </div>
        <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 mt-3'>
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
  apiGetProductsByKeyword(keyword) {
    if (!keyword) {
      this.setState({ products: [], loading: false });
      return;
    }
    this.setState({ loading: true })
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
    this.setState({ loading: true })
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