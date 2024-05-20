import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import './style/Events.css'
import { Link } from 'react-router-dom';
import './style/Card.css'
import Carousal from "@itseasy21/react-elastic-carousel";
import Details from './Details';

const EventList = ({ eventData, eventType }) => {
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const filtered = eventData.filter(event => event.type === eventType);
    setFilteredEvents(filtered);
  }, [eventType, eventData]);
  const containerClassName = eventData ? (filteredEvents.length ? 'CartList' : 'hide') : 'hide';

  const monthsAbbreviations = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
  ];
  return (
    <div className={containerClassName}>
      <h1>{eventType}:</h1>
      <div className='Carts'>
      <Carousal itemsToShow={2} outerSpacing={0} pagination={false}>
        {filteredEvents.map((event, index) => (
        <div key={index} className='cart'>
            <Link to={`/event-detail/${event.eventName}`} >
            <Card
                companyName={event.companyName}
                type={event.type}
                description={event.explanation}
                name={event.eventName} 
                image={event.img}
                address={event.location}
                month={monthsAbbreviations[event.date.split('-')[1] - 1]}
                day={event.date.split('-')[2]}
            />
            </Link>
          </div>
        ))}
        </Carousal>
      </div>
    </div>
  );
};

export default EventList;
