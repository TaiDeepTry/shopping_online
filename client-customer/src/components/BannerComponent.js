import React from 'react';
import iphoneBanner from "../images/Iphone Image.png"
import {Button} from "@nextui-org/react";

class Banner extends React.Component {
  render() {
    return (
      <div className="banner w-full  bg-[#211C24] text-white px-[160px] flex justify-between items-center"> 
        <div className='flex flex-col gap-4 h-fit'>
        <p className='text-2xl'>Pro.Beyond.</p>
        <h1 className='text-7xl'>
          <span className='font-thin pr-2'>IPhone</span> 
        14 Pro
        </h1>
        <p className='text-lg font-thin'>Created to change everything for the better. For everyone</p>
        <Button color="zinc-50" className='w-fit' variant="bordered">
        SHOP NOW
      </Button>  
        </div>
        <div className='mt-[-20px]'>
          <img  src={iphoneBanner} alt="haha" />
        </div>
      </div>
    );
  }
}

export default Banner;