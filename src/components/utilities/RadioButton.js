import React from 'react';

const RadioButton = (props) => {
    return (
        <label>
            <input
                type="radio"
                name={props.name}
                value={props.value}
                onChange={props.onchangeHandler}
                checked={props.checked}
            />
            <span>{props.labelValue}</span>
        </label>
    )
}


export default RadioButton;