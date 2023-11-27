import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Banner from './BannerComponent';
import { Spinner } from "@nextui-org/react";


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newprods: [],
            hotprods: [],
            allprods: [],
            showBanner: true,
            loadingAll: true,
            loadingNew: true,
            loadingHot: true
        };
    }
    render() {
        const allprods = this.state.allprods.map((item) => {
            return (
                <div key={item._id} href="" className="group">
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
            )
        });
        const newprods = this.state.newprods.map((item) => {
            return (
                <div key={item._id} href="" className="group">
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
        const hotprods = this.state.hotprods.map((item) => {
            return (
                <div key={item._id} href="" className="group bg-white p-4 rounded-2xl">
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
        })

        return (
            <div className='w-5/6 mx-auto mb-20' >
                {this.state.showBanner && <Banner onClose={this.closeBanner} />}
                <div div className="pb-20" >
                    <h2 className="capitalize text-3xl border-b-2 text-black border-black py-1 inline-block w-fit my-4">
                        new product</h2>
                    <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
                        {this.state.loadingNew && <Spinner onClose={this.loadingNew} />}
                        {newprods}
                    </div>
                </div>
                <div className='p-4 bg-red-400 rounded-2xl'>
                    <h2 className="capitalize text-3xl border-b-2 text-black border-black py-1 inline-block w-fit my-4">hot product</h2>
                    {this.state.loadingHot && <Spinner className="block" onClose={this.loadingHot} />}
                    {
                        this.state.hotprods.length > 0 ?
                            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
                                {hotprods}
                            </div>
                            : <div />
                    }
                </div>
                <div className=''>
                    <h2 className="capitalize text-3xl border-b-2 text-black border-black py-1 inline-block w-fit my-4">all product</h2>
                    <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
                        {this.state.loadingAll && <Spinner className="block" onClose={this.loadingAll} />}
                        {allprods}
                    </div>
                </div>
            </div >
        );
    }
    componentDidMount() {
        this.apiGetNewProducts();
        this.apiGetHotProducts();
        this.apiGetAllProducts();
    }
    // apis
    apiGetNewProducts() {
        this.setState({loadingNew : true})
        axios.get('/api/customer/products/new').then((res) => {
            const result = res.data;
            this.setState({ newprods: result });
            this.setState({loadingNew : false})
        });
    }
    apiGetHotProducts() {
        this.setState({loadingHot : true})
        axios.get('/api/customer/products/hot').then((res) => {
            const result = res.data;
            this.setState({ hotprods: result });
            this.setState({loadingHot : false})

        });
    }
    apiGetAllProducts = () => {
        this.setState({loadingAll : true})
        axios.get("api/customer/products").then((res) => {
            const result = res.data;
            this.setState(({ allprods: result }));
            this.setState({loadingAll : false})
        });
    };
    closeBanner = () => {
        this.setState({ showBanner: false });
    };
}
export default Home;