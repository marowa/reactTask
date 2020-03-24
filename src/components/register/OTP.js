import React,{Component} from 'react';
import OtpInput from 'react-otp-input';
import './OTP.css';
import { Redirect,Link, Route } from 'react-router-dom';


class OTP extends Component{
    constructor(props){
        super(props);
        this.state={
            Otp: ''
        }
        this.otpChangeHandler=this.otpChangeHandler.bind(this);
    }

    otpChangeHandler = async function(event){
        await this.setState({Otp:event});
        console.log(this.state.Otp);
    }
    otpCheck = event =>{
        if(this.state.Otp != '1111'){
            alert('Wrong');
        }
        if(this.state.Otp == '1111'){
            return <Redirect to="/login"/>
        }
    }
    
    render(){   
        return(
            <div className="dialog">
                <div className="wrapper">
                    <h3>Please enter the 4-digit verification code we sent via SMS:</h3>
                </div>
                <div className="otp">
                    <OtpInput
                        onChange={this.otpChangeHandler}
                        numInputs={4}
                        separator={<span>-</span>}
                        value={this.state.Otp}
                    />
                </div>
                <Link to="/login"><button className="verify" onClick={this.otpCheck}>Verify</button></Link>
            </div>
        )
    }
}
export default OTP;