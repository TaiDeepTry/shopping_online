import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import withRouter from '../utils/withRouter';
import { Button, Input } from '@nextui-org/react';
class Login extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      incorrect: false,
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
            Sign in to your account
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" autoComplete='off' method="POST">
              <div className="mt-2">
                <Input
                  type="text" onChange={(e) => { this.setState({ txtUsername: e.target.value }) }}
                  onFocus={() => { this.setState({ incorrect: false, empty: false }) }}
                  color='default'
                  label='Username'
                  labelPlacement='outside'
                  isRequired={true}
                  variant='bordered'
                  isInvalid={this.state.incorrect || this.state.empty}
                />
              </div>

            <div>
              <div className="mt-4">
                <Input
                  type="password"
                  onChange={(e) => { this.setState({ txtPassword: e.target.value }) }}
                  onFocus={() => { this.setState({ incorrect: false, empty: false }) }}
                  label='Password'
                  labelPlacement='outside'
                  isRequired={true}
                  isInvalid={this.state.incorrect || this.state.empty}
                  variant='bordered'
                />
              </div>
            </div>
            <div>
              <span>
                {this.state.incorect && <p className="text-red-500 text-sm">Incorrect username or password</p>}
                {this.state.empty && <p className="text-red-500 text-sm">Please input username and password</p>}
              </span>
            </div>
            <div>
              <Button
                type="submit" value="LOGIN" onClick={(e) => this.btnLoginClick(e)}
                className="flex w-full justify-center hover:bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-[#2E2E2E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </Button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <a href="/signup" className="font-semibold leading-6 text-[#2E2E2E] hover:text-black">
              Sign Up Now
            </a>
          </p>
        </div>
      </div>
    );
  }
  // event-handlers
  btnLoginClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    if (username && password) {
      const account = { username: username, password: password };
      this.apiLogin(account);
    } else {
      this.setState({ empty: true });
      // alert('Please input username and password');
    }
  }
  // apis
  apiLogin(account) {
    axios.post('/api/customer/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setCustomer(result.customer);
        this.props.navigate('/home');
      } else {
        this.setState({ incorrect: true });
      }
    });
  }
}
export default withRouter(Login);