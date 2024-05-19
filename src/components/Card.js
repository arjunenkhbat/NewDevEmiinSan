import React from 'react'
import '../style/Card.css'
import location from "../assets/location.png"

const Card = ({image, name, address, month, day, description, type, companyName}) => {
  return (
    <div className='cart'>
      <img className='event-image' src={image}/>
      <div className='comment'>
        <span className='loc'>
        <h2>{name}</h2>
        <span className='address'>
        <img src={location} width={9} height={13}/>
        <p className='address-txt'>{address}</p>
        </span>
        </span> 
       
        <span className='date'>
            <span>{month}</span>
            <br></br>
            <span>{day}</span>
        </span>
        
      </div>
    </div>
  )
}

export default Card
