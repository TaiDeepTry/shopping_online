import axios from 'axios';
import React, { Component } from 'react';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import {Progress} from "@nextui-org/react";



class ProductDetail extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      txtQuatity: 1,
      loading: true
    };
  }
  render() {
    if (this.state.loading) {
      return (
        <div className='w-[100px] h-[500px] flex justify-center items-center'>
          <Spinner />
        </div>
      );
    }
    const prod = this.state.product;
    if (prod != null) {
      return (
        <div className="w-5/6 flex items-center justify-center my-10 flex-col gap-5">
          <figure className="caption-right">
            <img src={"data:image/jpg;base64," + prod.image} width="400px" height="400px" alt="" />
            <figcaption>
              <div className='flex flex-col gap-2'>
                <p className='text-4xl font-semibold'>Apple {prod.name}</p>
                <p className='text-xl'>{prod.category.name}</p>
                <p className='text-3xl mb-2'>$ {prod.price}</p>
                <div className='flex gap-2'>
                  <fieldset>
                    <input id="option1" class="peer/option1 hidden" type="radio" name="status" checked />
                    <label for="option1" class=" cursor-pointer mr-3 peer-checked/option1:text-black peer-checked/option1:border-2 peer-checked/option1:border-black text-[#6F6F6F] border-2 border-[#6F6F6F] rounded-2xl px-[40px] py-[16px] ">128GB</label>
                    <input id="option2" class="peer/option2 hidden" type="radio" name="status" checked />
                    <label for="option2" class=" cursor-pointer mr-3 peer-checked/option2:text-black peer-checked/option2:border-2 peer-checked/option2:border-black text-[#6F6F6F] border-2 border-[#6F6F6F] rounded-2xl px-[40px] py-[16px] ">256GB</label>
                    <input id="option3" class="peer/option3 hidden" type="radio" name="status" checked />
                    <label for="option3" class=" cursor-pointer mr-3 peer-checked/option3:text-black peer-checked/option3:border-2 peer-checked/option3:border-black text-[#6F6F6F] border-2 border-[#6F6F6F] rounded-2xl px-[40px] py-[16px] ">512GB</label>
                  </fieldset>
                </div>
                <div className='flex justify-center gap-4'>
                  <input className='w-fit outline-none mt-4 border-2 border-[#6F6F6F] focus:border-black py-1 px-2 rounded-lg' type="number" min="1" max="99" value={this.state.txtQuantity} onChange={(e) => { this.setState({ txtQuantity: e.target.value }) }} />
                  <input className='flex-1 mt-4 bg-black text-white rounded-xl' type="submit" value="ADD TO CART" onClick={(e) => this.btnAdd2CartClick(e)} />
                </div>
                <div className='grid grid-cols-9 gap-8 mt-4'>
                  <div className='col-span-3 flex flex-row items-center gap-3'>
                    <div className='p-4 w-min bg-[#F6F6F6] rounded-lg'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                      </svg>
                    </div>
                    <diV className="">
                      <p className='text-[#717171] text-xs'>Free Delivery</p>
                      <p className='text-black text-xs'>1-2 days</p>
                    </diV>
                  </div>
                  <div className='col-span-3 flex flex-row items-center gap-3'>
                    <div className='p-4 w-min bg-[#F6F6F6] rounded-lg'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                      </svg>

                    </div>
                    <diV className="">
                      <p className='text-[#717171] text-xs'>In Stock</p>
                      <p className='text-black text-xs'>today</p>
                    </diV>
                  </div>
                  <div className='col-span-3 flex flex-row items-center gap-3'>
                    <div className='p-4 w-min bg-[#F6F6F6] rounded-lg'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                      </svg>

                    </div>
                    <diV className="">
                      <p className='text-[#717171] text-xs'>Guaranteed</p>
                      <p className='text-black text-xs'>1 year</p>
                    </diV>
                  </div>
                </div>
              </div>
            </figcaption>
          </figure>
          <Table className='w-2/3' aria-label="collection table">
            <TableHeader>
              <TableColumn>NAME</TableColumn>
              <TableColumn>SPECIFICATION</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell>Model</TableCell>
                <TableCell>{prod.name}</TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell>Storage</TableCell>
                <TableCell>1TB</TableCell>
              </TableRow>
              <TableRow key="3">
                <TableCell>Display Resolution</TableCell>
                <TableCell>Full HD +</TableCell>
              </TableRow>
              <TableRow key="4">
                <TableCell>Camera</TableCell>
                <TableCell>4k60fps</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className='w-2/3'>
            <span className='text-2xl'>review</span>
            <div className='flex w-full gap-10'>
              <div className='flex flex-col items-center bg-[#FAFAFA] p-8 rounded-2xl'>
                <span className='text-5xl'>
                  4.8
                </span>
                <span>
                  of 125 review
                </span>
                <span className='flex flex-row'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
                    <path d="M8.43625 1.35577C9.0554 0.0270975 10.9446 0.0270965 11.5637 1.35577L13.0026 4.4436C13.254 4.98311 13.7658 5.35492 14.3566 5.4273L17.7379 5.84158C19.1929 6.01983 19.7767 7.81657 18.7044 8.816L16.2123 11.1387C15.7769 11.5445 15.5814 12.1461 15.6952 12.7303L16.346 16.0742C16.6261 17.513 15.0977 18.6235 13.8159 17.9125L10.8368 16.2601C10.3163 15.9714 9.68372 15.9714 9.16321 16.2601L6.18415 17.9125C4.90227 18.6235 3.37388 17.513 3.65395 16.0742L4.30485 12.7303C4.41857 12.1461 4.2231 11.5445 3.78768 11.1387L1.29562 8.816C0.223307 7.81657 0.807103 6.01983 2.26207 5.84158L5.64342 5.4273C6.23421 5.35492 6.74596 4.98311 6.99736 4.4436L8.43625 1.35577Z" fill="#FFB547" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
                    <path d="M8.43625 1.35577C9.0554 0.0270975 10.9446 0.0270965 11.5637 1.35577L13.0026 4.4436C13.254 4.98311 13.7658 5.35492 14.3566 5.4273L17.7379 5.84158C19.1929 6.01983 19.7767 7.81657 18.7044 8.816L16.2123 11.1387C15.7769 11.5445 15.5814 12.1461 15.6952 12.7303L16.346 16.0742C16.6261 17.513 15.0977 18.6235 13.8159 17.9125L10.8368 16.2601C10.3163 15.9714 9.68372 15.9714 9.16321 16.2601L6.18415 17.9125C4.90227 18.6235 3.37388 17.513 3.65395 16.0742L4.30485 12.7303C4.41857 12.1461 4.2231 11.5445 3.78768 11.1387L1.29562 8.816C0.223307 7.81657 0.807103 6.01983 2.26207 5.84158L5.64342 5.4273C6.23421 5.35492 6.74596 4.98311 6.99736 4.4436L8.43625 1.35577Z" fill="#FFB547" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
                    <path d="M8.43625 1.35577C9.0554 0.0270975 10.9446 0.0270965 11.5637 1.35577L13.0026 4.4436C13.254 4.98311 13.7658 5.35492 14.3566 5.4273L17.7379 5.84158C19.1929 6.01983 19.7767 7.81657 18.7044 8.816L16.2123 11.1387C15.7769 11.5445 15.5814 12.1461 15.6952 12.7303L16.346 16.0742C16.6261 17.513 15.0977 18.6235 13.8159 17.9125L10.8368 16.2601C10.3163 15.9714 9.68372 15.9714 9.16321 16.2601L6.18415 17.9125C4.90227 18.6235 3.37388 17.513 3.65395 16.0742L4.30485 12.7303C4.41857 12.1461 4.2231 11.5445 3.78768 11.1387L1.29562 8.816C0.223307 7.81657 0.807103 6.01983 2.26207 5.84158L5.64342 5.4273C6.23421 5.35492 6.74596 4.98311 6.99736 4.4436L8.43625 1.35577Z" fill="#FFB547" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
                    <path d="M8.43625 1.35577C9.0554 0.0270975 10.9446 0.0270965 11.5637 1.35577L13.0026 4.4436C13.254 4.98311 13.7658 5.35492 14.3566 5.4273L17.7379 5.84158C19.1929 6.01983 19.7767 7.81657 18.7044 8.816L16.2123 11.1387C15.7769 11.5445 15.5814 12.1461 15.6952 12.7303L16.346 16.0742C16.6261 17.513 15.0977 18.6235 13.8159 17.9125L10.8368 16.2601C10.3163 15.9714 9.68372 15.9714 9.16321 16.2601L6.18415 17.9125C4.90227 18.6235 3.37388 17.513 3.65395 16.0742L4.30485 12.7303C4.41857 12.1461 4.2231 11.5445 3.78768 11.1387L1.29562 8.816C0.223307 7.81657 0.807103 6.01983 2.26207 5.84158L5.64342 5.4273C6.23421 5.35492 6.74596 4.98311 6.99736 4.4436L8.43625 1.35577Z" fill="#FFB547" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
                    <path d="M8.43625 1.35577C9.0554 0.0270975 10.9446 0.0270965 11.5637 1.35577L13.0026 4.4436C13.254 4.98311 13.7658 5.35492 14.3566 5.4273L17.7379 5.84158C19.1929 6.01983 19.7767 7.81657 18.7044 8.816L16.2123 11.1387C15.7769 11.5445 15.5814 12.1461 15.6952 12.7303L16.346 16.0742C16.6261 17.513 15.0977 18.6235 13.8159 17.9125L10.8368 16.2601C10.3163 15.9714 9.68372 15.9714 9.16321 16.2601L6.18415 17.9125C4.90227 18.6235 3.37388 17.513 3.65395 16.0742L4.30485 12.7303C4.41857 12.1461 4.2231 11.5445 3.78768 11.1387L1.29562 8.816C0.223307 7.81657 0.807103 6.01983 2.26207 5.84158L5.64342 5.4273C6.23421 5.35492 6.74596 4.98311 6.99736 4.4436L8.43625 1.35577Z" fill="#FFB547" />
                  </svg>
                </span>

              </div>
              <div className='w-full'>
                <div>
                  <span>Excelent</span>
                  <Progress color='warning' aria-label="Loading..." value={90} className="w-full"/>
                </div>
                <div>
                  <span>Good</span>
                  <Progress color='warning' aria-label="Loading..." value={80} className="w-full"/>
                </div>
                <div>
                  <span>Average</span>
                  <Progress color='warning' aria-label="Loading..." value={60} className="w-full"/>
                </div>
                <div>
                  <span>Below Average</span>
                  <Progress color='warning' aria-label="Loading..." value={30} className="w-full"/>
                </div>
                <div>
                  <span>Poor</span>
                  <Progress color='warning' aria-label="Loading..." value={10} className="w-full"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (<div />);
  }
  componentDidMount() {
    const params = this.props.params;
    this.apiGetProduct(params.id);
  }
  // apis
  apiGetProduct(id) {
    this.setState({ loading: true })
    axios.get('/api/customer/products/' + id).then((res) => {
      const result = res.data;
      this.setState({ product: result });
      this.setState({ loading: false })
    });
  }
  btnAdd2CartClick(e) {
    e.preventDefault();
    const product = this.state.product;
    const quantity = parseInt(this.state.txtQuantity);
    if (quantity) {
      const mycart = this.context.mycart;
      const index = mycart.findIndex(x => x.product._id === product._id); // check if the _id exists in mycart
      if (index === -1) { // not found, push newItem
        const newItem = { product: product, quantity: quantity };
        mycart.push(newItem);
      } else { // increasing the quantity
        mycart[index].quantity += quantity;
      }
      this.context.setMycart(mycart);
      alert('OK BABY!');
    } else {
      alert('Please input quantity');
    }
  }
}
export default withRouter(ProductDetail);