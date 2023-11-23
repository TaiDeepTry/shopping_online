import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faHouse, faClock, faTabletScreenButton, faTabletButton, faLaptop } from '@fortawesome/free-solid-svg-icons';

const font = {
  faMagnifyingGlass, 
  faHouse, 
  faClock, 
  faTabletScreenButton, 
  faTabletButton ,
  faLaptop
}
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
          <FontAwesomeIcon className='pr-2' icon={font[item.icon]} />
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
              <FontAwesomeIcon className='align-baseline mr-1' icon={faHouse} />
              Home
            </Link></li>
            {cates}
          </ul>
        </div>
        <div className="float-right">
          <form className='search'>
            <input type="search" placeholder="Enter keyword" class="mr-2 text-xs bg-stone-200 text-stone-500 focus:bg-stone-300 focus:outline-stone-300 px-6 py-3 rounded-2xl outline-none" value={this.state.txtKeyword} onChange={(e) => { this.setState({ txtKeyword: e.target.value }) }} />
            <button type="submit" class="bg-slate-950 font-bold text-white text-sm px-4 py-2 rounded-full" value='SEARCH' onClick={(e) => this.btnSearchClick(e)} >
              <FontAwesomeIcon className='mr-1 inline-block' icon={faMagnifyingGlass} />
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
    this.props.navigate('/product/search/' + this.state.txtKeyword);
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