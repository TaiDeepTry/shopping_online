import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';

class Inform extends Component {
    static contextType = MyContext; // using this.context to access global state
    render() {
        return (
            <div className="bg-[#2E2E2E] text-[#FFFFFF] py-4">
                <div className='w-5/6 flex items-center justify-between mx-auto'>
                    <div className="">
                        {this.context.token === '' ?
                            <div><Link className='hover:border-b-2' to='/login'>Login</Link> | <Link className='hover:border-b-2' to='/signup'>Sign-up</Link> | <Link className='hover:border-b-2' to='/active'>Active</Link></div>
                            :
                            <div>Hello <b>{this.context.customer.name}</b> | <Link to='/home' onClick={() => this.lnkLogoutClick()}>Logout</Link> |  <Link to='/myprofile'>My profile</Link> |  <Link to='/myorders'>My orders</Link></div>
                        }
                    </div>
                    <div className="">
                        <Link to='/mycart'>My cart</Link> have <b>{this.context.mycart.length}</b> items
                    </div>
                </div>
            </div>
        );
    }
    // event-handlers
    lnkLogoutClick() {
        this.context.setToken('');
        this.context.setCustomer(null);
        this.context.setMycart([]);
    }
}
export default Inform;