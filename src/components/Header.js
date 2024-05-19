import React from 'react'
import logo from '../assets/pharmacy-logo-small.png'
import plus from '../assets/plus-logo.png'
import '../style/Header.css'

const Header = ({img, classname, name, functionName, addEvent}) => {
  return (
    <div className='header'>
      <img  className='Logo1' src={logo}/>
      {/* <img src={search} /> */}
      <label className='header-input'>
        <input id='search' type='text' placeholder= 'Диклодинк...'/>    
      </label>
       <div className='add' onClick={addEvent}>
        <div className={classname}>
           <img src={plus}/>
           <p>Захиалга</p>
        </div>
        <div className='plus' onClick={functionName}>
           <img src={img}/>
           <p>{name}</p>
        </div>    
       </div>
    </div>
  )
}

export default Header
