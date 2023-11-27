import axios from 'axios';
import React, { Component } from 'react';
import withRouter from '../utils/withRouter';
// import withRouter from 'react-router-dom';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";
import {Input} from "@nextui-org/react";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
      txtName: '',
      txtPhone: '',
      txtEmail: '',
      isOpen: false,
      isNumber : true
    };
  }
  onOpen = () => {
    this.setState({ isOpen: true });
  };
  onClose = () => {
    this.setState({ isOpen: false });
  };
  goToActive = () => {
    this.props.navigate('/active');
  }
  render() {
    return (
      <div className="flex min-h-full w-1/3 flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <Modal isOpen={this.state.isOpen} onOpenChange={this.onClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Success</ModalHeader>
                <ModalBody>
                  <p>
                    Congratulations! You almost done.
                  </p>
                  <p>
                    Please check your email to activate your account.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="default" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" variant="light" onPress={this.goToActive}>
                    Go to Active Page
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://cdn-icons-png.flaticon.com/512/6681/6681204.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign Up
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <div className="mt-2">
                <Input
                  type="text" value={this.state.txtUsername} 
                  onChange={(e) => { this.setState({ txtUsername: e.target.value }) }}
                  label='Username'
                  labelPlacement='outside'
                  isRequired={true}
                  variant='bordered'
                />
              </div>
            </div>

            <div>
              <div className="mt-2">
                <Input
                  type="password" 
                  value={this.state.txtPassword} 
                  onChange={(e) => { this.setState({ txtPassword: e.target.value }) }}
                  label='Password'
                  labelPlacement='outside'
                  isRequired={true}
                  variant='bordered'
                />
              </div>
            </div>

            <div>
              <div className="mt-2">
                <Input
                  type="text" 
                  value={this.state.txtName} 
                  onChange={(e) => { this.setState({ txtName: e.target.value }) }}
                  label='Full name'
                  labelPlacement='outside'
                  isRequired={true}
                  variant='bordered'
                />
              </div>
            </div>

            <div>
              <div className="mt-2">
                <Input
                  type="tel" 
                  value={this.state.txtPhone} 
                  onChange={(e) => { this.setState({ txtPhone: e.target.value }) }}
                  label='Phone number'
                  labelPlacement='outside'
                  isRequired={true}
                  variant='bordered'
                />
              </div>
            </div>

            <div>
              <div className="mt-2">
                <Input
                  type="email" 
                  value={this.state.txtEmail} 
                  onChange={(e) => { this.setState({ txtEmail: e.target.value }) }}
                  label='Email'
                  labelPlacement='outside'
                  isRequired={true}
                  variant='bordered'
                />
              </div>
            </div>

            <div>
              <Button
                type="submit" value="SIGN-UP" onClick={(e) => this.btnSignupClick(e)}
                className="flex w-full justify-center bg-[#2E2E2E] hover:bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </Button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Alrealdy have an account?{' '}
            <a href="/login" className="font-semibold leading-6 text-[#2E2E2E] hover:text-black">
              Sign In
            </a>
          </p>
        </div>
      </div>
    );
  }
  // event-handlers
  btnSignupClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    const name = this.state.txtName;
    const phone = this.state.txtPhone;
    const email = this.state.txtEmail;
    if (username && password && name && phone && email) {
      const account = { username: username, password: password, name: name, phone: phone, email: email };
      this.apiSignup(account);

    } else {
      alert('Please input username and password and name and phone and email');
    }
  }
  // apis
  apiSignup(account) {
    axios.post('/api/customer/signup', account).then((res) => {
      const result = res.data;
      this.onOpen();
    });
  }
}
export default withRouter(Signup);