import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Banner from './BannerComponent';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newprods: [],
            hotprods: [],
            allprods: [],
            showBanner: true
        };
    }
    render() {
        const allprods = this.state.allprods.map((item) => {
            return (
                <div key={item._id} className="flex py-3 px-1 border-2 rounded-2xl mb-2">
                    <figure>
                        <a href="" >
                            <Link to={'/product/' + item._id}>
                                <img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" />
                            </Link>
                        </a>
                        <figcaption className="flex justify-center align-center flex-col">
                            {item.name}
                            <div className='flex justify-center flex-row'>
                                <div className='text-lg font-bold'>${item.price}</div>
                            </div>
                        </figcaption>
                        <div className='text-center py-2 bg-black text-white rounded-2xl'>
                            <Link className='' to={'/product/' + item._id}>
                                Buy Now
                            </Link>
                        </div>
                    </figure>
                </div>
            )
        });
        const newprods = this.state.newprods.map((item) => {
            return (
                <div key={item._id} className="flex py-3 px-1 border-2 rounded-2xl mb-2">
                    <figure>
                        <a href="" >
                            <Link to={'/product/' + item._id}>
                                <img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" />
                            </Link>
                        </a>
                        <figcaption className="flex justify-center align-center flex-col">
                            {item.name}
                            <div className='flex justify-center flex-row'>
                                <div className='text-lg font-bold'>${item.price}</div>
                            </div>
                        </figcaption>
                        <div className='text-center py-2 bg-black text-white rounded-2xl'>
                            <Link className='' to={'/product/' + item._id}>
                                Buy Now
                            </Link>
                        </div>
                    </figure>
                </div>
            );
        });
        const hotprods = this.state.hotprods.map((item) => {
            return (
                <div key={item._id} className="flex py-3 px-1 border-2 rounded-2xl mb-2">
                    <figure>
                        <a href="" >
                            <Link to={'/product/' + item._id}>
                                <img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" />
                            </Link>
                        </a>
                        <figcaption className="flex justify-center align-center flex-col">
                            {item.name}
                            <div className='flex justify-center flex-row'>
                                <div className='text-lg font-bold'>${item.price}</div>
                            </div>
                        </figcaption>
                        <div className='text-center py-2 bg-black text-white rounded-2xl'>
                            <Link className='' to={'/product/' + item._id}>
                                Buy Now
                            </Link>
                        </div>
                    </figure>
                </div>
            );
        })

        return (

            <div className='w-5/6 mx-auto'>
                {this.state.showBanner && <Banner onClose={this.closeBanner} />}
                <div className="">
                    <h2 className="capitalize text-lg border-b-2 text-black border-black py-1 inline-block w-fit my-4
                    ">new product</h2>
                    <div className='flex flex-0 flex-wrap justify-between'>
                        {newprods}
                    </div>
                </div>
                {this.state.hotprods.length > 0 ?
                    <div className="">
                        <h2 className="capitalize text-lg border-b-2 text-black border-black py-1 inline-block my-4
                    ">hot product</h2>
                        {hotprods}
                    </div>
                    : <div />
                }
                <div className=''>
                    <h2>ALL PRODUCTS</h2>
                    <div className='flex flex-0 flex-wrap justify-between'>
                        {allprods}
                    </div>
                </div>
            </div>
        );
    }
    componentDidMount() {
        this.apiGetNewProducts();
        this.apiGetHotProducts();
        this.apiGetAllProducts();
    }
    // apis
    apiGetNewProducts() {
        axios.get('/api/customer/products/new').then((res) => {
            const result = res.data;
            this.setState({ newprods: result });
        });
    }
    apiGetHotProducts() {
        axios.get('/api/customer/products/hot').then((res) => {
            const result = res.data;
            this.setState({ hotprods: result });
        });
    }
    apiGetAllProducts = () => {
        axios.get("api/customer/products").then((res) => {
            const result = res.data;
            this.setState(({ allprods: result }));
        });
    };
    closeBanner = () => {
        this.setState({ showBanner: false });
      };
}
export default Home;