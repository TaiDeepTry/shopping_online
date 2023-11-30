import React from 'react';
// import iphoneBanner from "../images/Iphone Image.png"
import Banner1 from "../images/Banner.png"
import Banner2 from "../images/Banner2.png"
// import { Button } from "@nextui-org/react"
import Carousel from "nuka-carousel"
class Banner extends React.Component {
  render() {
    return (
      <div className="banner w-full text-white flex justify-between items-center">
        <Carousel
          autoplay={true}
        >
          <img alt='banner' src={Banner1} />
          <img alt='banner' src={Banner2} />
        </Carousel>
      </div>
    );
  }
}

export default Banner;