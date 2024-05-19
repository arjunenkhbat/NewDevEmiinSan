import React from 'react'
import youtube from "../assets/youtube-icon.png"
import facebook from "../assets/facebook-icon.png"
import instagram from "../assets/instagram-icon.png"
import "../style/Contact.css"

const Contact = () => {
  return (
    <div className='contact-icons'>
      <img src={facebook}/>
      <img src={youtube}/>
      <img src={instagram}/>

    </div>
  )
}

export default Contact
