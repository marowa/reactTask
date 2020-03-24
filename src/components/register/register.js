import React, { Component } from 'react';
import {checkValidity, updateObject} from './utility';
import Input from '../Input/Input';
import classes from '../Input/Input.css';
//import { red } from 'color-name';
//import classes from './register.css';

class Register extends Component{
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
                errorMSG: 'This email is invalid',
                displayErrorMSG: false
            },
            PhoneNumber :{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Phone Number'
                },
                value:'',
                validation: {
                    required: true,
                    isNumeric: true,
                    maxLength: 11,
                    minLength: 11
                },
                pattern: "^[0][1-9]\d{9}$|^[1-9]\d{9}$",
                valid: false,
                touched: false,
                errorMSG: 'This phone number is invalid',
                displayErrorMSG: false

            },
            Password :{
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value:'',
                validation: {
                    required: true,
                    isNumeric: true,
                    minLength: 8
                },
                pattern: "^[0][1-9]\d{9}$|^[1-9]\d{9}$",
                valid: false,
                touched: false,
                errorMSG: 'This phone number is invalid',
                displayErrorMSG: false
            }
        },
        formIsValid: false,
    }
    
    submitHandler= (event) =>{
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.register) {
            formData[formElementIdentifier] = this.state.register[formElementIdentifier].value;
        }
        const submit = {
            userData: this.state.register
        }

        //this.props.onOrderBurger(order, this.props.token);
        
    }
    
    inputChangedHandler = (event, inputID) =>{

        const updatedFormElement = updateObject(this.state.register[inputID], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.register[inputID].validation),
            touched: true,
        });
        const updatedRegisterForm = updateObject(this.state.register, {
            [inputID]: updatedFormElement
        });
        
        let formIsValid = true;
        for (let inputIdentifier in updatedRegisterForm) {
            formIsValid = updatedRegisterForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({register: updatedRegisterForm, formIsValid: formIsValid});
        //console.log(event.target.value);
        let isValid = true;
        let value=event.target.value;

        if(value.match(this.state.register[inputID].pattern)!==null){
            console.log('right');
            //this.setState({displayErrorMSG:true});
            //console.log(this.state.register[inputID].displayErrorMSG);
        }
        if(value.match(this.state.register[inputID].pattern)===null){
            console.log('wrong');
            //this.setState({displayErrorMSG:false});
            //console.log(this.state.register[inputID].displayErrorMSG);
        }
        //Q)))---------->Email pattern always returns false.<--------------
        //Q))----------->Cant change value of the state.<--------------
    }

    showPassword = event => {
        if(event.target.type==="password"){
            this.setState({type:"text"})
        }
        if(event.target.type==="text"){
            this.setState({type:"password"})
        }

    }

    render(){
        const formElementsArray = [];
        const style = {
            display: 'none',
            color: 'red'
        }
        const BLOCK = {display:'block'};
        const NONE = {display:'none'};

        formElementsArray.map(formElement=>{
            if(formElement.displayErrorMSG){
                style.display='block';
            }
        })

        for (let key in this.state.register) {
            formElementsArray.push({
                id: key,
                config: this.state.register[key]
            });
        }

        formElementsArray.map(formElement=>{
            if(formElement.displayErrorMSG){
                style.display='block';
            }
        })
        
        let form = (
            <form > {/*onSubmit={this.submitHandler}>*/}

                {formElementsArray.map(formElement => (
                    <span>
                        <table>
                            <tr>
                                <td>
                                    <label className="required">{formElement.id}  </label> 
                                </td>
                                <td>
                                    <Input 
                                    //className=
                                    key={formElement.id}
                                    elementType={formElement.config.elementType}
                                    elementConfig={formElement.config.elementConfig}
                                    value={formElement.config.value}
                                    invalid={!formElement.config.valid}
                                    shouldValidate={formElement.config.validation}
                                    touched={formElement.config.touched}
                                    changed={(event) => this.inputChangedHandler(event, formElement.id)} />  
                                </td>
                                <td><button onClick={this.showPassword}>Show Password</button></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><span style={style}>{formElement.config.errorMSG}</span></td></tr>
                        </table>                 
                    </span>
                    
                    
                ))}
                <table>
                    <tr>
                        <td>
                            <button btnType="Success" disabled={!this.state.formIsValid}>Register</button>
                        </td>
                    </tr>
                </table>
            </form>
        );
        /*if ( this.props.loading ) {
            form = <Spinner />;
        }*/
        return(
            <div>
                <h4>Fill your registration form, Please.</h4>
                {form}
            </div> 
        );
    }
}

export default Register;

/*notes:
email pattern always returns false
error message display doesn't work


*/