import React, { Component, PropTypes } from 'react'
import { loginAuth } from '../actions'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

class Login extends Component {  
	constructor(props) {
        super(props);
        this.state = { 
        	email : '',
        	password: ''
        };
     
    }

	onSubmit(e) {
    e.preventDefault()    
    this.props.dispatch(loginAuth(this.state));
  }

  componentWillReceiveProps(nextProps) {     	
  	const { user } = nextProps;
  	if(user.isLoggedIn){  		  		
  		browserHistory.push('/reddit');
  	}		
	}

  handleEmailChange(e) {  	
  	this.setState({email: e.target.value});	
  }

  handlePasswordChange(e) {
  	this.setState({password: e.target.value});	
  }

  render() {    
    return (
      <form onSubmit={this.onSubmit.bind(this)} className="loginForm">
      		<label htmlFor="email">Email address</label>
      		<input type="email" className="form-control" id="email" placeholder="Enter email" onChange={this.handleEmailChange.bind(this)} />        	
      		<label htmlFor="password">Password</label>
      		<input type="password" className="form-control" id="password" placeholder="Password" onChange={this.handlePasswordChange.bind(this)} />        	
      		<button type="submit">Submit</button>
      </form>
    )
  }  

  
}

function mapStateToProps(state) {	
  return {
    user: state.user
  };
}


export default connect(mapStateToProps)(Login)
