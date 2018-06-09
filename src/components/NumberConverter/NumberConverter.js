import React from 'react';

const NumberConverter = (props) => {
    let conversionValue = null;
    if(props.value !== 0) {
        conversionValue = props.decimalToRomanHandler(props.value);
    }

    const conversionLog = conversionValue ? conversionValue : null

    return (
        <div className="numberConverter-container" style={{maxWidth: "450px", margin: "auto"}}>
            <input
                style={{width: "100%", textAlign: "center"}}
                type="number"
                value={props.value}
                placeholder={props.placeholder}
                onChange={props.changeHandler}
                onKeyPress={props.onKeyPressed}
                pattern="[0-9]*" 
            />
            <span>
                {props.errorTootle ? props.errorMessage : null}
            </span>

            <p> Input: { props.value ? props.value : null } </p>
            <p> Conversion: {conversionLog} </p>
        </div>
    )
}

export default NumberConverter;