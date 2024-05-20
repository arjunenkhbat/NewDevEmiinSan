import React, { useEffect, useState } from 'react'
import details from './assets/details1.png'
import Logo from './assets/Logo1.png'
import Footer from './components/Footer'
import './style/Details.css'
import { collection, getDocs } from 'firebase/firestore'
import { firestore } from './FirebaseConfig'
import { useNavigate, useParams } from 'react-router-dom'
import Header from './components/Header'
import login from './assets/login-logo.png'
import { useAuth } from './AuthContext';
import Logout from './assets/Logout.png'
import calendar from './assets/Calendar.png'
import company from './assets/Business Building.png'
import location from './assets/Map Marker.png'
import typeicon from './assets/Medium Priority.png'
import { type } from '@testing-library/user-event/dist/type'
const Details = () => {
  const [eventDatas, setEventDatas] = useState([]);
  const history = useNavigate();
  const { isLogin, setLogin } = useAuth();
  const{name} = useParams();
  console.log(name, "NAMAEEE")
  const logOut = () => {
    setLogin(false)
    history('/')
    
  };
  const addEvent = () => {
    history("/add-event");
  }

  const getData = async () => {
    try {
      const valRef = collection(firestore, 'Events');
      const dataDB = await getDocs(valRef);
      const allData = dataDB.docs.map((val) => ({
        ...val.data(),
        id: val.id,
      }));
      const event = allData.find((alldata) => alldata.eventName === name )
      setEventDatas(event);
      console.log(event, "EVENTTTTTTTTTTTTTTTTTTTTTTT")
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    getData();
  }, [])

  console.log(eventDatas, "eveeenTTTTTTTTssssssssssssssssssssss");
  return (
    <div className='details'>
       <Header name={'Logout'} functionName={logOut} img={Logout} classname='add-icon' addEvent={addEvent}/>
        <div className='Event-Detail'>
          <img src={eventDatas.img} className='detail-img'/>
          <div className='event-text'>
            <h1>{eventDatas.eventName}</h1> {/*hayg ner*/}
            <div className='detail-icons'>
              <div className='detail-icon'>
                <img src={calendar} width={40} height={40}/>
                <p>{eventDatas.date}</p>
              </div>
              <div className='detail-icon'>
                <img src={typeicon} width={40} height={40}/>
                <p>{eventDatas.type}</p>
              </div>
              <div className='detail-icon'>
                <img src={location} width={40} height={40}/>
                <p>{eventDatas.location}</p>
              </div>
              <div className='detail-icon'>
                <img src={company} width={40} height={40}/>
                <p>{eventDatas.companyName}</p>
              </div>
            </div>
            {/* <div className='detail-icons'>
              
            </div> */}
            <p>{eventDatas.explanation}</p>
          </div>
          <div className='order-button'>
            <button>
              Order
            </button>
          </div>
        </div>

       <Footer/>
    </div>
  )
}

export default Details
