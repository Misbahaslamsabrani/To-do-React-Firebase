import React from 'react';
const Input = (props) => {
    return(
        <input type="text" name={props.name} onChange={props.onChange} value={props.value}/>
    )
}
export default Input;