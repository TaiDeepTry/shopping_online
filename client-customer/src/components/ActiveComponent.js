import axios from 'axios';
import React, { Component } from 'react';
import withRouter from '../utils/withRouter';

class Active extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtToken: '',
      empty: false,
    };
  }
  render() {
    return (
        <div className="flex min-h-full w-1/3 flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://cdn-icons-png.flaticon.com/512/6681/6681204.png"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Active Account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" autoComplete='off' method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  ID
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={this.state.txtID}
                    onChange={(e) => { this.setState({ txtID: e.target.value }) }}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 ">
                    Token
                  </label>

                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    value={this.state.txtToken}
                    onChange={(e) => { this.setState({ txtToken: e.target.value }) }}
                    // onFocus={() => { this.setState({ incorrect: false, empty: false }) }}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                  />
                </div>
              </div>
              <div>
              <span>
                {this.state.empty && <p className="text-red-500 text-sm">Please input Id and Token</p>}
              </span>
            </div>
              <div>
                <button
                  type="submit"
                  value="ACTIVE" 
                  onClick={(e) => this.btnActiveClick(e)} 
                  className="flex w-full justify-center rounded-md hover:bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-[#2E2E2E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Active
                </button>
              </div>
            </form>
          </div>
        </div>
    );
  }
  // event-handlers
  btnActiveClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const token = this.state.txtToken;
    if (id && token) {
      this.apiActive(id, token);
    } else {
      // alert('Please input id and token');
      this.setState({ empty: true });
    }
  }
  // apis
  apiActive(id, token) {
    const body = { id: id, token: token };
    axios.post('/api/customer/active', body).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
        this.props.navigate('/login');
      } else {
        alert('SORRY BABY!');
      }
    });
  }
}
export default withRouter(Active);