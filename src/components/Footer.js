import React from 'react'
import Logo from '../assets/pharmacy-logo-small.png'
import facebook from '../assets/facebook-icon.png'
import youtube from '../assets/youtube-icon.png'
import instagram from '../assets/instagram-icon.png'
import plane from "../assets/paper-plane-regular.svg"

import '../style/Footer.css'

const Footer = () => {
  return (
    <div className='footer'>
        <img className='Logo2' src={Logo}/>
        <div className='footer-input'> 
          <span>Санал хүсэлт</span> 
          <div className='input-style'>
            <img className='paper-plane' src={plane}/>
            <input id='footer' type='text' placeholder='Тайлбар бичих'/>
            <span>Илгээх</span>
          </div>
          

        </div>

        <article className='Connect'>
            <p>Холбоос</p>
            <div className='link'>
                <img src={facebook} />
                <img src={youtube} />
                <img src={instagram} />
            </div>
        </article>
    </div>
  )
}

export default Footer
