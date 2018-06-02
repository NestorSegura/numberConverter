import React from 'react';

const NumberConverter = (props) => {

    const conversionLog = props.conversionValue ? `<p>${props.conversionValue}</p>` : null

    return (
        <div className="numberConverter-container" style={{maxWidth: "450px", margin: "auto"}}>
            <input
                style={{width: "100%", textAlign: "center"}}
                type="number"
                value={props.value}
                placeholder={props.placeholder}
                onChange={props.changeHandler} />

            <p> Input: { props.value ? props.value : null } </p>
            <p> Conversion: { props.conversionValue ? props.conversionValue : null}</p>
        </div>
    )
}

export default NumberConverter;