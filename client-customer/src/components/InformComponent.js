import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { User } from "@nextui-org/react";


class Inform extends Component {
    static contextType = MyContext; // using this.context to access global state
    render() {
        return (
            <div className="bg-[#2E2E2E] text-[#FFFFFF] py-4 w-full">
                <div className='w-5/6 flex items-center justify-between mx-auto'>
                    <div className="">
                        {this.context.token === '' ?
                            <div>
                                <Link className='hover:border-b-2' to='/login'>Login</Link> | <Link className='hover:border-b-2' to='/signup'>Sign-up</Link> | <Link className='hover:border-b-2' to='/active'>Active</Link></div>
                            :
                            <div className=''>
                                <Dropdown>
                                    <DropdownTrigger className='text-white border-none'>
                                        <Button
                                            variant="bordered"
                                        >
                                            <User
                                                name = {this.context.customer.username}
                                                description={this.context.customer.name}
                                                avatarProps={{
                                                    src: "https://cdn-icons-png.flaticon.com/512/6681/6681204.png"
                                                }}
                                            />
                                            <b></b>
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu className='bg-[#2E2E2E] text-white pl-2 py-2 rounded-xl' aria-label="Link Actions">
                                        <DropdownItem >
                                            <Link to='/myprofile'>
                                                My profile
                                            </Link>
                                        </DropdownItem>
                                        <DropdownItem >
                                            <Link to='/myorders'>
                                                My orders
                                            </Link>
                                        </DropdownItem>
                                        <DropdownItem className='text-danger-500' color='danger'>
                                            <Link to='/home' onClick={() => this.lnkLogoutClick()}>
                                                Logout
                                            </Link>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        }
                    </div>
                    <div className="relative">
                        <Link to='/mycart'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                        </Link>
                        <b className='block absolute bg-white text-black h-min pt-[2px] px-[6px] border-[3px] border-[#2E2E2E] rounded-full text-xs top-[-7px] right-[-14px]'>{this.context.mycart.length}</b>
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