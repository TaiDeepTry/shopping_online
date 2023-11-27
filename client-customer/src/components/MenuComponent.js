import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import {Input} from "@nextui-org/react";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: ''
    };
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
          <form className='search flex flex-row items-center gap-3'>
            <Input label="Search" type="search" className='h-8 self-start' variant='bordered' value={this.state.txtKeyword} onChange={(e) => { this.setState({ txtKeyword: e.target.value }) }} />
            <button type="submit" className="bg-slate-950 font-bold text-white text-sm px-4 pt-3 rounded-full flex flex-row h-10" value='SEARCH' onClick={(e) => this.btnSearchClick(e)} >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 inline-block align-top mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
                SEARCH
            </button>
          </form>
        </div>
      </div>
    );
  }
  
  // event-handlers
  btnSearchClick(e) {
    e.preventDefault();
    if (this.state.txtKeyword !== '') {
      this.props.navigate('/product/search/' + this.state.txtKeyword);
    } else {
      // Keyword is empty, don't navigate
    }
  }

  componentDidMount() {
    this.apiGetCategories();
  }
  // apis
  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}


export default withRouter(Menu);