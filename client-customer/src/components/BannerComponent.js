import React from 'react';

class Banner extends React.Component {
  render() {
    return (
      <div className="banner w-full py-[188px] bg-[#211C24] text-white">
        <div>
        <p>Pro.Beyond.</p>
        <h1>IPhone 14 Pro</h1>
        <p>Created to change everything for the better. For everyone</p>
        <button onClick={this.props.onClose}>SHOP NOW</button>
        </div>
        <div>
          
        </div>
      </div>
    );
  }
}

export default Banner;