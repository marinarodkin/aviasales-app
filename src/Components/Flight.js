import React, { Component } from 'react';

class Flight extends Component {
  render() {

    const getStopsNumber = (stop) =>{
      switch (stop) {
        case 3:
          return "3 пересадки"
        case 2:
          return "2 пересадки"
        case 1:
          return "1 пересадка"
        case 0:
          return "без пересадок"
        default:
          return
      }
    }

    const getWeekDay = (date) => {
      const year = "20"+date.substr(6,2);
      const month = date.substr(3,2);
      const day = date.substr(0,2);
      const newDate  = new Date (year, month, day, )
      const weekDay = [ "вс", "пн", "вт", "ср", "чт", "пт", "сб" ];
      return weekDay[newDate.getDay()];
    }

    const getDateFormat = (date) =>{
      const year = "20"+date.substr(6,2);
      const month = date.substr(3,2);
      const day = date.substr(0,2);
      const newDate  = new Date (year, month, day, );
      const monthName = ["дек", "янв", "фев", "мар", "апр", "мая", "июня", "июля", "авг", "сент", "окт", "ноя", "дек"];
      const newMonth = monthName[newDate.getMonth()];
      return `${day} ${newMonth} ${year}`
    }

    const changeCurrency = (price) => {
      const usdRate = 68; // must be changed
      const eurRate = 77; // must be changed
      if (this.props.currency === "usd" ) return `$ ${Math.floor(price/usdRate)} `;
      if (this.props.currency === "eur" ) return `€ ${Math.floor(price/eurRate)} `;
      else return `${price} ₽`
    }

    return (
      <div className = "flight">
        <div className = "flight_left-side">
          <div className = "flight_avia-logo">
            <img src="https://marinarodkin.github.io/aviasales-app/img/turkish.png" className="avia-logo" alt="logo" />
          </div>
          <button type = "submit" className = "flight-btn">Купить за {changeCurrency(this.props.price)} </button>
        </div>
        <div className = "flight_right-side">
          <div className = "flight_departure">
            <span className ="flight_time">{this.props.departureTime}</span>
            <div className = "flight_aeroport-block">
              <span className ="flight_origin ">{this.props.origin}, </span>
              <span className ="flight_origin-name">{this.props.originName}</span>
            </div>
            <div className = "flight_data-block flight_data-block--origin">
              <span className ="flight_departure-date flight_date">{getDateFormat(this.props.departureDate)}, </span>
              <span className ="flight_departure-date flight_date">{getWeekDay(this.props.departureDate)}</span>
            </div>
          </div>
          <div className = "flight_stops">{getStopsNumber(this.props.stops)}</div>
          <div className = "flight_arrival">
            <span className ="flight_time">{this.props.arrivalTime}</span>
            <div className = "flight_aeroport-block ">
              <span className ="flight_destination">{this.props.destination}, </span>
              <span className ="flight_destination-name">{this.props.destinationName}</span>
            </div>
            <div className = "flight_data-block flight_data-block--arrival">
              <span className ="flight_arrival-date flight_date">{getDateFormat(this.props.arrivalDate)}, </span>
              <span className ="flight_arrival-date flight_date">{getWeekDay(this.props.arrivalDate)}</span>
            </div>
          </div>
        </div>
      </div>
    )
    }
    }

export default Flight;
