import React from 'react'
import { Link } from 'react-router-dom';
import "../style/Button.css"

const Button = ({ name, to, functionName, disable }) => {
  return (
      <Link to={to} className='button-container'>
      <button onClick={functionName} className='solid-button'>
      {name}
      </button>
      </Link>
  );
};

export default Button
