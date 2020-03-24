import React , {Component} from 'react';
import Input from '../Input/Input';
import classes from './register.css';

class RegisterFile extends Component{
    state={
        Register: {
            FullName :{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Full Name'
                },
                value:'',
                validation: {
                    required: true,
                    maxLength: 40,
                    isNumeric: false
                },
                pattern: "^[a-zA-Z ]*$",
                valid: false,
                touched: false,
                errorMSG: 'This field must be alphabets only',
                displayErrorMSG: false
            }, 
        }
    }

    nameChangedHandler = event =>{
        this.setState({value:event.target.value});
        console.log(event.target.value);
        if(event.target.value.match(this.state.Register.FullName.pattern)===null){
            this.setState({displayErrorMSG:false});
            console.log(this.state.Register.FullName.displayErrorMSG);
        }
        if(event.target.value.match(this.state.Register.FullName.pattern)!==null){
            this.setState({displayErrorMSG:true});
            console.log(this.state.Register.FullName.displayErrorMSG);
        }

        if(this.state.Register.FullName.displayErrorMSG){
            console.log(this.state.Register.FullName.errorMSG);
        }

    }

    render(){

        return(
            <div>
                <h4>Fill in the form, please!</h4>
                <Input 
                    key={this.state.Register.FullName.id}
                    elementType={this.state.Register.FullName.elementType}
                    elementConfig={this.state.Register.FullName.elementConfig}
                    label="Full Name:  "
                    value={this.state.Register.FullName.value}
                    invalid={this.state.Register.FullName.valid}
                    shouldValidate={this.state.Register.FullName.validation}
                    touched={this.state.Register.FullName.touched}
                    changed={(event)=>this.nameChangedHandler(event)}
                />
            </div>
        );
    }
};


export default RegisterFile












/*import React,{Component} from 'react';
import {checkValidity, updateObject} from './utility';
import Input from '../Input/Input';

class RegisterFile extends Component{
    
    state={
        register: {
            FullName :{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Full Name'
                },
                value:'',
                validation: {
                    required: true,
                    maxLength: 40,
                    isNumeric: false
                },
                pattern: "^[a-zA-Z ]*$",
                valid: false,
                touched: false,
                errorMSG: 'This field must be alphabets only',
                displayErrorMSG: false
            },
            Email :{
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value:'',
                validation: {
                    required: true,
                    isNumeric: true
                },
                pattern: "/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/",
                valid: false,
                touched: false,
                errorMSG: 'This email is invalid'
            }
        },
        formIsValid: true,
    }

    nameChangedHadler = (event,id) =>{
        console.log(event.target.value);
        //ethis.setState({value: event.target.value});
    }

    emailChangedHandler = (event,id) =>{
        //const email=event.target.email;
        /*const value = event.target.value;
        this.setState({value:value});
        if(event.target.value.match(this.state.register.Email.pattern)){
            console.log('OK!');
        }*/
       /* console.log(event.target.value);
    }

    phoneChangedHandler = (event,id) =>{

    }

    passwordChangedHandler = (event,id) =>{

    }

    photoChangedHandler = (event,id) =>{

    }

    render(){
        return(
            <div>
                <form>
                    <h2>Fill your registration form, Please.</h2>
                    <div>
                        <label >FullName</label>
                        <Input 
                            key='FullName'
                            elementType= {this.state.register.FullName.elementType}
                            elementConfig={this.state.register.FullName.elementConfig}
                            value={this.state.register.FullName.value}
                            invalid={this.state.register.FullName.valid}
                            shouldValidate={this.state.register.FullName.validation}
                            touched={this.state.register.FullName.touched}
                            //onChange={(event)=>this.nameChangedHadler()}
                            changed={(event,id)=>this.nameChangedHandler(event,this.state.register.FullName.id)}
                            />
                            <span style={{fontSize:12 , color: 'red'}}>{this.state.register.FullName.errorMSG}</span>
                    </div>
                    <div>
                        <label >Email Address</label>
                        <Input 
                            key='Email'
                            elementType= {this.state.register.Email.elementType}
                            elementConfig={this.state.register.Email.elementConfig}
                            value={this.state.register.Email.value}
                            invalid={this.state.register.Email.valid}
                            shouldValidate={this.state.register.Email.validation}
                            touched={this.state.register.Email.touched}
                            changed={event=>this.emailChangedHandler(event,this.state.register.Email.id)}/>
                            <span style={{fontSize:12 , color: 'red'}}>{this.state.register.FullName.errorMSG}</span>                   
                    </div>
                    <button type="submit">Register</button>

                </form>

            </div>
        );
    }
}
*/