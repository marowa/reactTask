import React from 'react';
import classes from './Input.css';

const Input = props =>{
    return(
        <div>
            <label>{props.label}</label>
            <input 
                type="text" 
                {...props.elementConfig}
                onChange={props.changed}
                value={props.value}
                />
        </div>
    );
}

export default Input











/*import React from 'react';
import classes from './Input.css';
//import Register from '../register/register';
import RegisterFile from '../register/registerfile';

const input = (props) =>{
    let inputElement = null;
    const inputClasses = [classes.inputElement];

    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
    }

    switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = <input
                //className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'textarea' ):
            inputElement = <textarea
                //className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'select' ):
            inputElement = (
                <select
                    //className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                //className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }
    return(
        <span>
            <label>{props.label}</label>  {inputElement}
            
        </span>
    );
}

export default input;*/