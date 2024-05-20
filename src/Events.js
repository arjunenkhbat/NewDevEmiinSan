import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import poster from './assets/poster-done.png'
import Footer from './components/Footer'
import { database, firestore } from './FirebaseConfig'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import './style/Events.css'
import { useLocation } from 'react-router-dom'
// import login from './assets/login.svg'
import login from './assets/login-logo.png'
import Logout from './assets/Logout.png'
import { useAuth } from './AuthContext';
import { collection, getDocs } from 'firebase/firestore'
import EventList from './EventList'

const Events = () => {
  const history = useNavigate();
  const { isLogin, setLogin } = useAuth();
  const [data, setData] = useState([]);
  const logOut = () => {
    setLogin(false)
    history('/')
    
  };
  const logIn = () => {
    history('/login');
    console.log('loginnedd')
}
const addEvent = () => {
  history("/add-event");
}

const getData = async() => {
  const valRef = collection(firestore, 'Events')
  const dataDB = await getDocs(valRef)
  const allData = dataDB.docs.map(val => ({
    ...val.data(), id:val.id
  }))
  setData(allData);
}

useEffect(() => {
  getData();
}, [])
  return (
    <div>   
      <Header name={isLogin ? 'Гарах' : 'Нэвтрэх'} functionName={isLogin? logOut: logIn} img={isLogin? Logout : login} classname={isLogin? 'add-icon':'hide' } addEvent={isLogin? addEvent:null}/>
      <img src={poster}  className='event-poster'/>
      <EventList eventData={data} eventType="Жуков"/>
      <EventList eventData={data} eventType="Талбай"/>
      <EventList eventData={data} eventType="Модны хоёр"/>
      <EventList eventData={data} eventType="Багшийн дээд"/>
      <EventList eventData={data} eventType="МУИС"/>
      <EventList eventData={data} eventType="ШУТИС"/>
      <EventList eventData={data} eventType="АШУИС"/>

      <Footer/>
    </div>
  )
}

export default Events