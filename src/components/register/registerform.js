import React, {Component} from 'react';
import firebase from '../../fire';
import 'firebase/storage'; 
import { Redirect,Link, Route } from 'react-router-dom';
import OTP from './OTP';
import './OTP.css';

class RegisterForm extends Component{

    constructor(props){
        super(props);
        this.ref = firebase.firestore().collection('users');
        /*this.ref = ref => {
            this.file = ref;
        }*/
        this.state={
            Register:{
                FullName:{
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Full Name'
                    },
                    nameValue:'',
                    validation: {
                        required: true,
                        maxLength: 40,
                        isNumeric: false
                    },
                    pattern: "^[a-zA-Z ]*$",
                    nameValid: false,
                    nameTouched: false,
                    errorMSG: 'This field must be alphabets only'
                    },
                Email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Email Address'
                    },
                    emailValue:'',
                    validation: {
                        required: true,
                        isNumeric: true,
                        isEmail: true
                    },
                    pattern: "/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/",
                    emailValid: false,
                    emailTouched: false,
                    errorMSG: 'This email is invalid'
                },
                PhoneNumber: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Phone Number'
                    },
                    phoneValue:'',
                    validation: {
                        required: true,
                        maxLength: 11,
                        minLength: 11,
                        isNumeric: true
                    },
                    pattern: "^[0-9]*$",
                    phoneValid: false,
                    phoneTouched: false,
                    errorMSG: 'This phone number is invalid'
                },
                Password: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder: 'Password'
                    },
                    passwordValue:'',
                    validation: {
                        required: true,
                        minLength: 8,
                        isNumeric: true
                    },
                    pattern: "^[a-zA-Z ]*$",
                    passwordValid: false,
                    passwordTouched: false,
                    errorMSG: 'your password must be at least 8 alphanumeric'
                },
                personalPhoto:{
                    elementType: 'input',
                    elementConfig: {
                        type: 'file',
                        placeholder: 'Personal Photo'
                    },
                    photoValue: "",
                    photoURL: ""
                }
            },
            nameErrorMsg: false,
            emailErrorMsg: false,
            phoneErrorMsg: false,
            passwordErrorMsg: false,
            hidePassword: true,
            passwordStatus: '',
            generalErrorMsg: 'This field is required!',
            formIsValid: false,
            emailUnique: true,
            phoneUnique: true
        };

        this.nameChangedHandler = this.nameChangedHandler.bind(this);
        this.emailChangedHandler = this.emailChangedHandler.bind(this);
        this.phoneChangedHandler = this.phoneChangedHandler.bind(this);
        this.passwordChangedHandler = this.passwordChangedHandler.bind(this);
        this.showPassword = this.showPassword.bind(this);
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
    }

    nameChangedHandler = async function(event) {
        await this.setState({
            nameValue: event.target.value,
            nameTouched: true});
        if(this.state.nameValue !== ""){
            if((this.state.nameValue.length) >= 40){
                this.setState({nameErrorMsg:true});
            }
            if(this.state.nameValue.match(this.state.Register.FullName.pattern)===null){
                this.setState({nameErrorMsg:true});                    
            }
        }

        if((this.state.nameValue.match(this.state.Register.FullName.pattern)!==null)){
            this.setState({nameErrorMsg:false});
        }
        if(this.state.nameValue === ''){
            this.setState({nameValid: false})
        }
        if(this.state.nameValue !== ''){
            this.setState({nameValid: true});
        }
    }

    emailChangedHandler = async function(event){
        await this.setState({
            emailValue: event.target.value,
            emailTouched: true});
        if(this.state.Register.Email.pattern.match(this.state.emailValue) === null){
            this.setState({emailErrorMsg:true});
        }
        if(this.state.Register.Email.pattern.match(this.state.emailValue) !== null){
            this.setState({emailErrorMsg:false});
        }

        if(this.state.emailValue === ''){
            this.setState({emailValid: false})
        }
        if(this.state.emailValue !== ''){
            this.setState({emailValid: true});
        }
    }

    phoneChangedHandler = async function(event) {
        await this.setState({
            phoneValue:event.target.value,
            phoneTouched: true});
        if(this.state.phoneValue.match(this.state.Register.PhoneNumber.pattern)===null){
            this.setState({phoneErrorMsg:true});
            //console.log(this.state.phoneErrorMsg);
        }
        if(this.state.phoneValue.match(this.state.Register.PhoneNumber.pattern)!==null){
            this.setState({phoneErrorMsg:false});
            //console.log(this.state.phoneErrorMsg);
        }

        if(this.state.phoneValue.length > 11){
            this.setState({phoneErrorMsg:true});
        }
        if(this.state.phoneValue.length == 11){
            this.setState({phoneErrorMsg:false});
        }

        if(this.state.phoneValue === ''){
            this.setState({phoneValid: false})
        }
        if(this.state.phoneValue !== ''){
            this.setState({phoneValid: true});
        }
    }

    passwordChangedHandler = async function(event){
        let capsCount, smallCount, numberCount,symbolCount; 
        await this.setState({
            passwordValue:event.target.value,
            passwordTouched: true});

        if(this.state.passwordValue.length >= 8){
            this.setState({passwordErrorMsg: false});
        }
        if(this.state.passwordValue.length < 8){
            this.setState({passwordErrorMsg: true});
        }

        capsCount = (this.state.passwordValue.match(/[A-Z]/g)) || [].length;
        smallCount = (this.state.passwordValue.match(/[a-z]/g)) || [].length;
        numberCount = (this.state.passwordValue.match(/[0-9]/g)) || [].length;
        symbolCount = (this.state.passwordValue.match(/[^\s\w]/g)) || [].length;

        if((capsCount.length >= 1 || smallCount.length >= 1) && (numberCount.length === undefined && symbolCount.length === undefined)){
            await this.setState({passwordStatus:"Weak"});
        }
        if((numberCount.length >= 1) && (smallCount.length === undefined || capsCount.length === undefined || symbolCount.length === undefined)){
            await this.setState({passwordStatus:"Weak"});
        }

        if((capsCount.length >= 1 || smallCount.length >= 1) && (numberCount.length >= 1) && (symbolCount.length === undefined)){
            await this.setState({passwordStatus:"Normal"});
        }
        
        if(capsCount.length >= 1 && smallCount.length >= 1 && numberCount.length >= 1 && symbolCount.length >= 1 && this.state.passwordValue.length >= 8){
            await this.setState({passwordStatus:"Strong"});
        }

        if(capsCount.length === undefined && smallCount.length === undefined && numberCount.length === undefined && symbolCount.length === undefined){
            await this.setState({passwordStatus:""});
        }

        if(this.state.passwordValue === ''){
            this.setState({passwordValid: false})
        }
        if(this.state.passwordValue !== ''){
            this.setState({passwordValid: true});
        }
    }

    showPassword(event){
        event.preventDefault();
        this.setState({hidePassword: !this.state.hidePassword});
    }

    fileChangedHandler = (event)=>{
        event.preventDefault();
        let reader=new FileReader();
        let file = event.target.files[0];
        const storageRef = firebase.storage().ref();
        const mainImg = storageRef.child(file.name);
        mainImg.put(file).then(snapshot=>{
            mainImg.getDownloadURL().then(url=>{
                this.setState({photoURL:url});
            })
        })
        
        reader.onloadend = () => {
            this.setState({
                photoValue: file,
                photoURL: reader.result
            });
        }
        reader.readAsDataURL(file);
    }

    handleUpload = (event) => {
        event.preventDefault();
        //const file= this.file.files[0];
        
        console.log('handle upload', this.state.photoValue);
        console.log('handle upload', this.state.photoURL);
    }

    checkValidity = (event)=>{
        if((this.state.nameValid && !this.state.nameErrorMsg) && ((this.state.emailValid)) && (this.state.phoneValid && !this.state.phoneErrorMsg) && (this.state.passwordValid && !this.state.passwordErrorMsg)){
            this.setState({formIsValid: true});
        }
        else{
            this.setState({formIsValid: false});
        }
        console.log(this.state.formIsValid);
    }

    submitHandler= (event) =>{
        event.preventDefault();
        /*firebase.firestore().collection('Users').where("Email", "==", this.state.emailValue).get().then(resultSnapShot =>{
            if(resultSnapShot.size == 0){
                this.setState({emailUnique: true});
            }
            if(resultSnapShot.size != 0){
                this.setState({emailUnique: false});
            }
        })
        firebase.firestore().collection('Users').where("PhoneNumber","==",this.state.phoneValue).get().then(resultSnapShot=>{
            if(resultSnapShot.size == 0){
                this.setState({phoneUnique: true});
            }
            if(resultSnapShot.size != 0){
                this.setState({phoneUnique: false});
            }
        })*/
        const db = firebase.firestore();
        db.settings({
            timestampsInSnapshots: true
        });
        const userRef = db.collection("Users").add({
            FullName: this.state.nameValue,
            Email: this.state.emailValue,
            PhoneNumber: this.state.phoneValue,
            Password: this.state.passwordValue,
            PersonalPhoto: this.state.photoURL
        });
        //if(this.state.emailUnique && this.state.phoneUnique){
           /*.then(()=>{
                this.setState({
                    nameValue: '',
                    passwordValue: '',
                    phoneValue: '',
                    emailValue: '',
                    photoValue: ''
                }); 
            })*/
        console.log('ok');

        //}
        /*else{
            console.log('error');
        }*/
        
        console.log(firebase.firestore().collection('Users').get());
    }

    render(){            
        const nameStyle={
            color:'red',
            display: 'none'
        }
        const emailStyle={
            color:'red',
            display: 'none'
        }
        const phoneStyle={
            color:'red',
            display: 'none',
        }
        const passwordStyle={
            color:'red',
            display: 'none',
        }
        const passwordStrength = {
            color: 'red',
            fontWeight: 'bold'
        }

        if(this.state.nameErrorMsg){
            nameStyle.display="block";
        }
        if(!this.state.nameErrorMsg){
            nameStyle.display="none";
        }

        if(this.state.emailErrorMsg){
            emailStyle.display="block";
        }
        if(!this.state.emailErrorMsg){
            emailStyle.display="none";
        }

        if(this.state.phoneErrorMsg){
            phoneStyle.display="block";
        }
        if(!this.state.phoneErrorMsg){
            phoneStyle.display="none";
        }

        if(this.state.passwordErrorMsg){
            passwordStyle.display="block";
        }
        if(!this.state.passwordErrorMsg){
            passwordStyle.display="none";
        }
        
        if(this.state.passwordStatus === 'Weak'){
            passwordStrength.color="red"
        }
        if(this.state.passwordStatus === 'Normal'){
            passwordStrength.color="yellow"
        }
        if(this.state.passwordStatus === 'Strong'){
            passwordStrength.color="green"
        }

        let imagePreview = (<div>Please, Select an image </div>);
        if(this.state.photoURL){
            imagePreview = (<div><img src={this.state.photoURL} alt="icon"  width="200"/></div>)
        }

        const errorStyle = {
            border: '1px solid red',
        }

        const correctStyle = {
            border: '1px solid green',
        }

        return(
            <div className="dialog"> 
                <form onSubmit={this.submitHandler} onKeyDown={this.checkValidity}>
                    <h3 className="wrapper">Fill in the form,Please!</h3>
                    <div>
                        <span>
                            <label>FullName: </label><span style={{color:"red"}}> * </span>
                            <input 
                            style={((!this.state.nameValid)&&(this.state.nameTouched)) ? errorStyle : null}
                            key={this.state.Register.FullName.id}
                            elementtype={this.state.Register.FullName.elementType}
                            elementconfig={this.state.Register.FullName.elementConfig}
                            invalid={this.state.Register.FullName.valid}
                            shouldvalidate={this.state.Register.FullName.validation}
                            onChange={this.nameChangedHandler}
                            value={this.state.nameValue}/>
                            <span>{((!this.state.nameValid)&&(this.state.nameTouched)) ? '  This field is required!' : null}</span>
                            <span style={nameStyle}>{this.state.Register.FullName.errorMSG}</span>
                            <span>{ ((this.state.nameValid)&&(!this.state.nameErrorMsg)) ? <span style={{color:'green', fontWeight: 'bold'}}>  &#10003;</span> : <span></span>}</span>
                        </span>
                    </div>
                    <div>
                        <span>
                            <label>Email: </label><span style={{color:"red"}}> * </span>
                            <input 
                            style={((!this.state.emailValid)&&(this.state.emailTouched)) ? errorStyle : null}
                            key={this.state.Register.Email.id}
                            elementtype={this.state.Register.Email.elementType}
                            elementconfig={this.state.Register.Email.elementConfig}
                            invalid={this.state.Register.Email.valid}
                            shouldvalidate={this.state.Register.Email.validation}
                            onChange={this.emailChangedHandler}
                            value={this.state.emailValue}/>
                            <span>{((!this.state.emailValid)&&(this.state.emailTouched)) ? '  This field is required!' : null}</span>
                            <span style={emailStyle}>{this.state.Register.Email.errorMSG}</span>
                            <span>{ ((this.state.emailValid)&&(!this.state.emailErrorMsg)) ? <span style={{color:'green', fontWeight: 'bold'}}>  &#10003;</span> : <span></span>}</span>
                            <span>{this.state.emailUnique ? <span></span> : <span>This email already exists</span>}</span>
                        </span>
                    </div>
                    <div>
                        <span>
                            <label>Phone Number: </label><span style={{color:"red"}}> * </span>
                            <input 
                            style={((!this.state.phoneValid)&&(this.state.phoneTouched)) ? errorStyle : null}
                            key={this.state.Register.PhoneNumber.id}
                            elementtype={this.state.Register.PhoneNumber.elementType}
                            elementconfig={this.state.Register.PhoneNumber.elementConfig}
                            invalid={this.state.Register.PhoneNumber.valid}
                            shouldvalidate={this.state.Register.PhoneNumber.validation}
                            onChange={this.phoneChangedHandler}
                            value={this.state.phoneValue}/>
                            <span>{((!this.state.phoneValid)&&(this.state.phoneTouched)) ? '  This field is required!' : null}</span>
                            <span style={phoneStyle}>{this.state.Register.PhoneNumber.errorMSG}</span>
                            <span>{ ((this.state.phoneValid)&&(!this.state.phoneErrorMsg)) ? <span style={{color:'green', fontWeight: 'bold'}}>  &#10003;</span> : <span></span>}</span>
                            <span>{this.state.phoneUnique ? <span></span> : <span>This phone number already exists</span>}</span>
                        </span>
                    </div>
                    <div>
                        <div>
                            <label>Password: </label><span style={{color:"red"}}> * </span>
                            <input 
                            style={((!this.state.passwordValid)&&(this.state.passwordTouched)) ? errorStyle : null}
                            key={this.state.Register.Password.id}
                            elementtype={this.state.Register.Password.elementType}
                            type={this.state.hidePassword ? "password" : "text"}
                            placeholder="Password" 
                            invalid={this.state.Register.Password.valid}
                            shouldvalidate={this.state.Register.Password.validation}
                            onChange={this.passwordChangedHandler}
                            value={this.state.passwordValue}/>
                            <span>{((!this.state.passwordValid)&&(this.state.passwordTouched)) ? '  This field is required!' : null}</span>
                            <button onClick={this.showPassword}>Show Password</button>
                            <span style={passwordStyle}>{this.state.Register.Password.errorMSG}</span>
                            <span>{ ((this.state.passwordValid)&&(!this.state.passwordErrorMsg)) ? <span style={{color:'green', fontWeight: 'bold'}}>  &#10003;</span> : <span></span>}</span>
                            <div style={passwordStrength} onKeyDown={this.passwordChangedHandler}>{this.state.passwordStatus}</div>
                        </div>
                        <div>
                            <input 
                            type = "file"
                            ref={this.setRef}
                            onChange={this.fileChangedHandler}
                            />
                            <button type="button" onClick={this.handleUpload}>Upload</button>
                            {imagePreview}
                        </div>
                    </div>
                    <Route to="/otp"><button btnType="Success" disabled={!this.state.formIsValid}>Submit</button></Route>
                </form>
            </div>
        )
    }
}

export default RegisterForm