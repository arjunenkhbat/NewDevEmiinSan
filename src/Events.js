/**
 * @author Arjun
 * @file Events.js
 * @description This file contains a React functional component that displays a list of events retrieved from Firestore.
 * 
 * @requires React - For creating the component and managing state and effects.
 * @requires Firebase - For Firestore database operations and authentication.
 * @requires React-Router-Dom - For navigation between different routes.
 * 
 * @component
 * The Events component is responsible for displaying a list of events categorized by location. It includes functionality 
 * for user login and logout, and retrieves event data from Firestore. If a user is logged in, they can navigate to the 
 * add-event page.
 * 
 * @function Events - The main React functional component.
 * @property {object} state - The component's state includes:
 * - `data`: An array storing event data fetched from Firestore.
 * - `isLogin`: A boolean from the AuthContext indicating if a user is logged in.
 * 
 * @method logOut - Logs out the user and redirects to the homepage.
 * @method logIn - Redirects the user to the login page.
 * @method addEvent - Redirects the user to the add-event page.
 * @method getData - Fetches event data from Firestore and updates the state.
 * 
 * @example
 * <Events />
 * 
 * @see {@link https://reactjs.org/|React}
 * @see {@link https://firebase.google.com/|Firebase}
 * @see {@link https://reactrouter.com/|React Router}
 */
import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import poster from './assets/poster-done.png'
import Footer from './components/Footer'
import { database, firestore } from './FirebaseConfig'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import './style/Events.css'
import { useLocation } from 'react-router-dom'
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