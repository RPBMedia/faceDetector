import React from 'react';
import axios from 'axios';
// import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: '',
    }
  }

  componentWillMount() {
    this.onSubmitSignIn = this.onSubmitSignIn.bind(this);
  }

  onEmailChange = (event) => {
    this.setState({
      signInEmail: event.target.value
    });
  }

  onPasswordChange = (event) => {
    this.setState({
      signInPassword: event.target.value
    });
  }

  async onSubmitSignIn() {
    const response = await axios.post('http://localhost:3000/login', {
      email: this.state.signInEmail,
      password: this.state.signInPassword,
    })
    if(response && response.status === 200 && !!response.data && response.data.id) {
      this.props.loadUser(response.data);
      this.props.onRouteChange('home');
    }
  }

  render() {
    const { onRouteChange } = this.props;
    return (
      <article className="br4 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <form className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" id="email-address" onChange={this.onEmailChange} />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" id="password" onChange={this.onPasswordChange}/>
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="button"
                value="Sign in"
                onClick={this.onSubmitSignIn}
              />
            </div>
            <div className="">
              <input
                className="b ph3 mt2 input-reset bg-transparent grow pointer"
                type="button"
                value="Register"
                onClick={() => onRouteChange('register')}/>
            </div>
          </form>
        </main>
      </article>
    );
  }
}

export default Login;
