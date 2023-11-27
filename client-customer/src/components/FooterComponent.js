import React from 'react';

class Footer extends React.Component {
    render() {
        return (
            <div className='w-full bg-black grid grid-cols-3 text-white px-40 py-24'>
                <div className='grid-cols-1 flex flex-col'>
                    <span className='text-2xl font-bold mb-7'>
                        TuanTai
                    </span>
                    <span>
                        We are a residential interior design firm located in Portland. Our boutique-studio offers more than
                    </span>
                    <div className=' flex flex-row pt-20 gap-5'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />
                        </svg>

                    </div>
                </div>
                <div className='grid-cols-1 flex flex-col text-sm gap-4 font-light'>
                    <span className='text-xl font-normal'>
                        Services
                    </span>
                    <span>
                        Bonus
                    </span>
                    <span>
                        Gift card
                    </span>
                    <span>
                        Credit and payment
                    </span>
                    <span>
                        Service constracts
                    </span>
                    <span>
                        non-cast account
                    </span>
                </div>
                <div className='grid-cols-1 flex flex-col text-sm gap-4 font-light'>
                    <span className='text-xl font-normal'>
                        Assistance to the buyer
                    </span>
                    <span>
                        Find and order
                    </span>
                    <span>
                        Terms of delivery
                    </span>
                    <span>
                        Exchange and return of goods
                    </span>
                    <span>
                        Frequently asked questions
                    </span>
                    <span>
                        Terms of use of the site
                    </span>
                </div>

            </div>
        );
    }
}

export default Footer;