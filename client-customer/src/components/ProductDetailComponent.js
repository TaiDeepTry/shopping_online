import axios from 'axios';
import React, { Component } from 'react';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner, Progress, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, User, Textarea } from "@nextui-org/react";
import { Link } from 'react-router-dom';

class ProductDetail extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      review: [],
      txtQuatity: 1,
      loading: true,
      isOpen: false,
      congrats: false,
      reviewText: '',
      reviewStar: 0,
      productId: "",
      customerId: "",
      comment: "",
      star: 0,
      lastViewedProduct: null,
    };
  }
  saveProductToLocalStorage(product) {
    // Chỉ lưu tên, giá và hình ảnh của sản phẩm
    const productToSave = {
      name: product.name,
      price: product.price,
      image: product.image
    };

    // Lưu sản phẩm vào localStorage
    localStorage.setItem('lastViewedProduct', JSON.stringify(productToSave));
  }


  render() {
    const { isOpen, congrats } = this.state;
    if (this.state.loading) {
      return (
        <div className='w-[100px] h-[500px] flex justify-center items-center'>
          <Spinner />
        </div>
      );
    }

    const prod = this.state.product;
    // const review = this.state.review;
    if (prod != null) {
      return (
        <div className="w-5/6 flex relative items-center justify-center my-10 flex-col gap-5">
          <Modal isOpen={isOpen} onOpenChange={this.onClose}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Quantity invalid</ModalHeader>
                  <ModalBody>
                    <p>
                      Please input quantity
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>

          <Modal isOpen={congrats} onOpenChange={this.congratsClose}>
            <ModalContent>
              {(congratsClose) => (
                <>
                  <ModalHeader color="primary" className="flex flex-col gap-1">Congratulation</ModalHeader>
                  <ModalBody >
                    <p className='items-center flex justify-center text-green-700'>
                      <svg className='h-6' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </p>
                    <p>
                      The product has been added in your cart
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="success" variant="light" onPress={congratsClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>

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
                  <Button className='flex-1 cursor-pointer mt-4 rounded-xl' type="submit" value="ADD TO CART" onClick={(e) => this.btnAdd2CartClick(e)} >ADD TO CART</Button>
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
                  {this.countReviews().averageRating}
                </span>
                <span>
                  of  {this.state.review.length} review
                </span>
                <span className='flex flex-row'>
                  {Array.from({ length: this.countReviews().averageRating }).map((_, i) =>
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
                      <path d="M8.43625 1.35577C9.0554 0.0270975 10.9446 0.0270965 11.5637 1.35577L13.0026 4.4436C13.254 4.98311 13.7658 5.35492 14.3566 5.4273L17.7379 5.84158C19.1929 6.01983 19.7767 7.81657 18.7044 8.816L16.2123 11.1387C15.7769 11.5445 15.5814 12.1461 15.6952 12.7303L16.346 16.0742C16.6261 17.513 15.0977 18.6235 13.8159 17.9125L10.8368 16.2601C10.3163 15.9714 9.68372 15.9714 9.16321 16.2601L6.18415 17.9125C4.90227 18.6235 3.37388 17.513 3.65395 16.0742L4.30485 12.7303C4.41857 12.1461 4.2231 11.5445 3.78768 11.1387L1.29562 8.816C0.223307 7.81657 0.807103 6.01983 2.26207 5.84158L5.64342 5.4273C6.23421 5.35492 6.74596 4.98311 6.99736 4.4436L8.43625 1.35577Z" fill="#FFB547" />
                    </svg>
                  )}
                  {Array.from({ length: 5 - this.countReviews().averageRating }).map((_, i) =>
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                      <path d="M8.43909 1.56696C8.87879 0.623367 10.2205 0.623368 10.6602 1.56696L12.099 4.65479C12.4233 5.35066 13.0834 5.83023 13.8454 5.92359L17.2267 6.33786C18.26 6.46446 18.6746 7.74046 17.9131 8.45023L15.421 10.7729C14.8594 11.2963 14.6073 12.0723 14.754 12.8259L15.4049 16.1697C15.6038 17.1915 14.5184 17.9802 13.608 17.4752L10.6289 15.8229C9.95757 15.4505 9.14168 15.4505 8.47032 15.8229L5.49125 17.4752C4.58089 17.9802 3.49546 17.1915 3.69436 16.1697L4.34526 12.8258C4.49194 12.0723 4.23982 11.2963 3.67821 10.7729L1.18615 8.45023C0.424614 7.74046 0.839212 6.46446 1.8725 6.33786L5.25384 5.92359C6.01586 5.83023 6.67593 5.35066 7.0002 4.65479L8.43909 1.56696Z" stroke="#FFB547" />
                    </svg>
                  )}

                  {Array.from({ length: this.countReviews().haftStar }).map((_, i) =>
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                      <path d="M8.43909 1.56696C8.87879 0.623367 10.2205 0.623368 10.6602 1.56696L12.099 4.65479C12.4233 5.35066 13.0834 5.83023 13.8454 5.92359L17.2267 6.33786C18.26 6.46446 18.6746 7.74046 17.9131 8.45023L15.421 10.7729C14.8594 11.2963 14.6073 12.0723 14.754 12.8259L15.4049 16.1697C15.6038 17.1915 14.5184 17.9802 13.608 17.4752L10.6289 15.8229C9.95757 15.4505 9.14168 15.4505 8.47032 15.8229L5.49125 17.4752C4.58089 17.9802 3.49546 17.1915 3.69436 16.1697L4.34526 12.8258C4.49194 12.0723 4.23982 11.2963 3.67821 10.7729L1.18615 8.45023C0.424614 7.74046 0.839212 6.46446 1.8725 6.33786L5.25384 5.92359C6.01586 5.83023 6.67593 5.35066 7.0002 4.65479L8.43909 1.56696Z" stroke="#FFB547" />
                    </svg>
                  )}
                  {Array.from({ length: this.countReviews().zero }).map((_, i) =>
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                      <path d="M8.43909 1.56696C8.87879 0.623367 10.2205 0.623368 10.6602 1.56696L12.099 4.65479C12.4233 5.35066 13.0834 5.83023 13.8454 5.92359L17.2267 6.33786C18.26 6.46446 18.6746 7.74046 17.9131 8.45023L15.421 10.7729C14.8594 11.2963 14.6073 12.0723 14.754 12.8259L15.4049 16.1697C15.6038 17.1915 14.5184 17.9802 13.608 17.4752L10.6289 15.8229C9.95757 15.4505 9.14168 15.4505 8.47032 15.8229L5.49125 17.4752C4.58089 17.9802 3.49546 17.1915 3.69436 16.1697L4.34526 12.8258C4.49194 12.0723 4.23982 11.2963 3.67821 10.7729L1.18615 8.45023C0.424614 7.74046 0.839212 6.46446 1.8725 6.33786L5.25384 5.92359C6.01586 5.83023 6.67593 5.35066 7.0002 4.65479L8.43909 1.56696Z" stroke="#FFB547" />
                    </svg>
                  )}
                </span>

              </div>
              <div className='w-full'>
                <div>
                  <span>Excelent</span>
                  <Progress color='warning' aria-label="Loading..." value={this.countReviews().fiveStar} className="w-full" />
                </div>
                <div>
                  <span>Good</span>
                  <Progress color='warning' aria-label="Loading..." value={this.countReviews().fourStar} className="w-full" />
                </div>
                <div>
                  <span>Average</span>
                  <Progress color='warning' aria-label="Loading..." value={this.countReviews().threeStar} className="w-full" />
                </div>
                <div>
                  <span>Below Average</span>
                  <Progress color='warning' aria-label="Loading..." value={this.countReviews().twoStar} className="w-full" />
                </div>
                <div>
                  <span>Poor</span>
                  <Progress color='warning' aria-label="Loading..." value={this.countReviews().oneStar} className="w-full" />
                </div>
              </div>
            </div>
            <div className='py-4'>
              <StarRating onStarClick={this.handleStarClick} />
              <div className='flex flex-row'>
                <Textarea
                  placeholder="Enter your review..."
                  value={this.state.reviewText}
                  onChange={(e) => this.setState({ reviewText: e.target.value })}
                  onPress={this.handleEnterPress}
                  variant='bordered'
                />
                <Button onClick={this.handleReviewSubmit}>Submit</Button>
              </div>
            </div>
            {this.state.review && this.state.review.map((review) => {
              return (
                <div className='flex bg-[#F2F2F2] p-3 rounded-2xl mt-4'>
                  <div className='flex flex-row'>
                    <div>
                      <User
                        avatarProps={{
                          src: "https://cdn-icons-png.flaticon.com/512/6681/6681204.png"
                        }}
                      />
                    </div>
                    <div className='flex flex-col'>
                      <span>{review.customerName}</span>
                      <span className='flex flex-row'>
                        {Array.from({ length: review.star }).map((_, i) =>
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
                            <path d="M8.43625 1.35577C9.0554 0.0270975 10.9446 0.0270965 11.5637 1.35577L13.0026 4.4436C13.254 4.98311 13.7658 5.35492 14.3566 5.4273L17.7379 5.84158C19.1929 6.01983 19.7767 7.81657 18.7044 8.816L16.2123 11.1387C15.7769 11.5445 15.5814 12.1461 15.6952 12.7303L16.346 16.0742C16.6261 17.513 15.0977 18.6235 13.8159 17.9125L10.8368 16.2601C10.3163 15.9714 9.68372 15.9714 9.16321 16.2601L6.18415 17.9125C4.90227 18.6235 3.37388 17.513 3.65395 16.0742L4.30485 12.7303C4.41857 12.1461 4.2231 11.5445 3.78768 11.1387L1.29562 8.816C0.223307 7.81657 0.807103 6.01983 2.26207 5.84158L5.64342 5.4273C6.23421 5.35492 6.74596 4.98311 6.99736 4.4436L8.43625 1.35577Z" fill="#FFB547" />
                          </svg>
                        )}
                        {Array.from({ length: 5 - review.star }).map((_, i) =>
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                            <path d="M8.43909 1.56696C8.87879 0.623367 10.2205 0.623368 10.6602 1.56696L12.099 4.65479C12.4233 5.35066 13.0834 5.83023 13.8454 5.92359L17.2267 6.33786C18.26 6.46446 18.6746 7.74046 17.9131 8.45023L15.421 10.7729C14.8594 11.2963 14.6073 12.0723 14.754 12.8259L15.4049 16.1697C15.6038 17.1915 14.5184 17.9802 13.608 17.4752L10.6289 15.8229C9.95757 15.4505 9.14168 15.4505 8.47032 15.8229L5.49125 17.4752C4.58089 17.9802 3.49546 17.1915 3.69436 16.1697L4.34526 12.8258C4.49194 12.0723 4.23982 11.2963 3.67821 10.7729L1.18615 8.45023C0.424614 7.74046 0.839212 6.46446 1.8725 6.33786L5.25384 5.92359C6.01586 5.83023 6.67593 5.35066 7.0002 4.65479L8.43909 1.56696Z" stroke="#FFB547" />
                          </svg>
                        )}
                      </span>
                      <p>{review.comment}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div>
              <h2 className="capitalize text-3xl border-b-2 text-black border-black py-1 inline-block w-fit my-4">related</h2>
              <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
                {this.state.products.map(product => (
                  <div key={product.id}>
                    <Link to={'/product/' + product._id}>
                      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                        <div>
                          <img src={"data:image/jpg;base64," + product.image}
                            alt='phone img'
                            className="h-full w-full object-cover object-center group-hover:opacity-75" />
                        </div>
                      </div>
                      <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                      <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="capitalize text-3xl border-b-2 text-black border-black py-1 inline-block w-fit my-4">Lasted product</h2>
              {this.state.lastViewedProduct ? (
                <div className='w-1/4'>
                  <div
                    className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <div to={'/product/' + this.state.lastViewedProduct._id}>
                      <img src={"data:image/jpg;base64," + this.state.lastViewedProduct.image}
                        alt='phone img'
                        className="h-full w-full object-cover object-center group-hover:opacity-75" />
                    </div>
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{this.state.lastViewedProduct.name}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">${this.state.lastViewedProduct.price}</p>
                </div>
              ) : null}
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
    this.apiGetReview(params.id);
    const lastViewedProduct = localStorage.getItem('lastViewedProduct');
    if (lastViewedProduct) {
      // Parse the product data from JSON
      const productData = JSON.parse(lastViewedProduct);
      // Set the lastViewedProduct state
      this.setState({ lastViewedProduct: productData });
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.params.id !== prevProps.params.id) {
      // Fetch the new product data
      this.apiGetProduct(this.props.params.id);
    }
  }
  // apis
  apiGetReview(id) {
    axios.get("/api/customer/product/review/" + id).then((res) => {
      const result = res.data;
      this.setState({ review: result })
    })
  }
  apiGetProduct(id) {
    this.setState({ loading: true })
    axios.get('/api/customer/products/' + id).then((res) => {
      const result = res.data;
      this.setState({ product: result, loading: false });

      // Get products from the same category
      if (result && result.category) {
        this.apiGetProductsByCatID(result.category._id);
      }

      // Save product to localStorage
      const productToSave = {
        name: result.name,
        price: result.price,
        image: result.image
      };
      localStorage.setItem('lastViewedProduct', JSON.stringify(productToSave));
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
      this.congratsOpen()
      // alert('OK BABY!');
    } else {
      this.onOpen()
    }
  }
  handleStarClick = (value) => {
    this.setState({ reviewStar: value });
  };
  handleReviewSubmit = () => {
    // Prepare the data
    if (this.context.token !== "") {
      const customerId = this.context.customer._id;
      const comment = this.state.reviewText;
      const star = this.state.reviewStar;
      const review = {
        customerId: customerId,
        comment: comment,
        star: star
      };
      if (star > 0 && comment !== "") {
        this.apiPostReview(review);
      }
      this.setState({ reviewText: '', reviewStar: 0, });
      this.setState({ star: 0 })
    } else {
      alert("your must login to comment")
    }
  };

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
  apiPostReview(prod) {
    const productId = this.props.params.id;
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post("/api/customer/product/review/" + productId, prod, config)
      .then(res => {
        this.apiGetReview(this.props.params.id);
      })
      .catch(err => {
        console.error(err);
      });
  }
  // Define your open and close methods
  onOpen = () => {
    this.setState({ isOpen: true });
  };

  onClose = () => {
    this.setState({ isOpen: false });
  };

  congratsOpen = () => {
    this.setState({ congrats: true });

  }
  congratsClose = () => {
    this.setState({ congrats: false });

  }
  countReviews = () => {
    let count = [0, 0, 0, 0, 0]; // For 1-star to 5-star reviews
    let percentages = [0, 0, 0, 0, 0];
    let totalRating = 0;
    let haftStar = 0
    let zero = 0
    if (this.state.review !== null) {
      for (let i = 0; i < this.state.review.length; i++) {
        if (this.state.review[i].star >= 1 && this.state.review[i].star <= 5) {
          count[this.state.review[i].star - 1]++;
          totalRating += this.state.review[i].star;
        }
      }
      let total = this.state.review.length;
      for (let i = 0; i < 5; i++) {
        if (count[i] !== 0) {
          percentages[i] = 100 * count[i] / total;
        }
      }
    }
    let averageRating = this.state.review.length > 0 ? totalRating / this.state.review.length : 0;
    averageRating = parseFloat(averageRating.toFixed(1));
    averageRating % 1 >= 0.5 ? haftStar = 1 : zero = 1
    return {
      oneStar: percentages[0],
      twoStar: percentages[1],
      threeStar: percentages[2],
      fourStar: percentages[3],
      fiveStar: percentages[4],
      averageRating: averageRating,
      haftStar: haftStar,
      zero: zero
    };
  }

}
class StarRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
    };
  }

  handleStarClick = (value) => {
    this.setState({ rating: value });
    this.props.onStarClick(value);
  };

  render() {
    return (
      <div className='text-[#ffb547] text-3xl cursor-pointer'>
        {[1, 2, 3, 4, 5].map((value) => (
          <span key={value} onClick={() => this.handleStarClick(value)}>
            {value <= this.state.rating ? '★' : '☆'}
          </span>
        ))}
      </div>
    );
  }
}
export default withRouter(ProductDetail);