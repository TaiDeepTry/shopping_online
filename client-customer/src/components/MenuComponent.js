import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import { Input, ListboxItem, Listbox } from "@nextui-org/react";
import ThemeSwitcher from "./ThemeSwitcherComponent"


class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: '',
      products: [],
      suggestions: []
    };
  }
  fetchSearchSuggestions(keyword) {
    // Filter products based on the entered keyword
    const filteredProducts = this.state.products.filter(
      (product) => product.name.toLowerCase().includes(keyword.toLowerCase())
    );
    console.log(this.state.suggestions)
    // Update the suggestions state with filtered products
    this.setState({ suggestions: filteredProducts });
  }
  handleInputChange(e) {
    const keyword = e.target.value;
    console.log(keyword)
    // const keyword = "iphone";
    this.setState({ txtKeyword: keyword });
    this.setState({ suggestions: [] })
    // Call the function to fetch search suggestions
    this.fetchSearchSuggestions(keyword);
  }
  render() {

    const cates = this.state.categories.map((item) => {
      return (
        <li key={item._id} className="menu hover:border-b-2 border-black text-black">
          <Link to={'/product/category/' + item._id}>
            {item.name}
          </Link>
        </li>
      );
    });
    const suggestionItems = this.state.suggestions.map((suggestion) => (
      <ListboxItem key={suggestion._id}>
        <Link to={`/product/${suggestion._id}`}>{suggestion.name}</Link>
      </ListboxItem>
    ));
    return (
      <div className="flex flex-row items-center justify-between py-2 w-5/6 mx-auto">
        <div className="float-left">
          <ul className="menu">
            <li className="menu font-bold"><Link to='/'>
              Home
            </Link></li>
            {cates}

          </ul>
        </div>
        <div className="">
          <form className='search flex flex-row items-center gap-3 relative'>
            <Input
              label="Search"
              type="search"
              className='h-8 self-start'
              variant='bordered'
              value={this.state.txtKeyword}
              onChange={(e) => this.handleInputChange(e)}
            />
            <button type="submit" className="bg-slate-950 font-bold text-white text-sm px-4 pt-3 rounded-full flex flex-row h-10" value='SEARCH' onClick={(e) => this.btnSearchClick(e)} >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 inline-block align-top mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              SEARCH
            </button>
            <ThemeSwitcher />
            {this.state.txtKeyword && (
              <div className="suggestions absolute w-[300px] top-10 z-50 bg-white rounded-xl ">
                  <Listbox color='default' className='max-h-[400px] overflow-y-auto'>
                    {suggestionItems}
                  </Listbox>
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }

  // event-handlers
  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate('/product/search/' + this.state.txtKeyword);
  }
  componentDidMount() {
    this.apiGetCategories();
    this.apiGetAllProducts()
  }
  // apis
  apiGetAllProducts = () => {
    axios.get("api/customer/products").then((res) => {
      const result = res.data;
      this.setState(({ products: result }));
    });
  };
  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}


export default withRouter(Menu);