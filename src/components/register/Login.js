import React, {Component} from 'react';
import './OTP.css';

class Login extends Component{
    constructor(props){
        super(props);
        this.state ={
            Email: '',
            Password: ''
        }

        this.emailHandler = this.emailHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
    }

    emailHandler = async function (event){
        await this.setState({Email: event.target.value})
    }

    passwordHandler = async function (event){
        await this.setState({Password: event.target.value});
        
    }

    render(){
        return(
            <div className="dialog">
                <div className="wrapper">
                    Login : 
                </div>
                Email: <input type="text" name="email" value={this.state.Email} onChange={this.emailHandler} placeholder="Email Address"/> <br/>
                Password: <input type="password" name="password" value={this.state.Password} onChange={this.passwordHandler} placeholder="Password"/> <br/>
                <button className="verify">Login</button>
            </div>
        )
    }
}

export default Login;