import React from 'react'
import "../style/Input.css"

const Input = ({inputName, inputfunctionName, type, value}) => {
  return (
    <div className='inputs'>
      <label for={inputName}>{inputName}</label>
      <input className='big-input' type={type} name={inputName} id={inputName} onChange={inputfunctionName} value={value}/>
    </div>
  )
}

export default Input
