import React, { Component } from 'react';
import turkish from "./../img/turkish.png";

class Flight extends Component {

  getStopsNumber = (stops) => {
    const StopNumber = {
    1: "1 пересадка",
    2: "2 пересадки",
    3: "3 пересадки",
    0: "без пересадок"
    };

    for (let key in StopNumber) {
      if (key == stops) {
        return StopNumber[key]
      }
    };
  };

  getWeekDay = (date) => {
    const year = "20"+date.substr(6,2);
    const month = date.substr(3,2);
    const day = date.substr(0,2);
    const newDate  = new Date (year, month - 1, day)
    const weekDay = [ "вс", "пн", "вт", "ср", "чт", "пт", "сб" ];
    return weekDay[newDate.getDay()];
  }

  getDateFormat = (date) =>{
    const year = "20"+date.substr(6,2);
    const month = date.substr(3,2);
    const day = date.substr(0,2);
    const newDate  = new Date (year, month - 1, day);
    const monthName = ["янв", "фев", "мар", "апр", "мая", "июня", "июля", "авг", "сент", "окт", "ноя", "дек"];
    const newMonth = monthName[newDate.getMonth()];
    return `${day} ${newMonth} ${year}`
  }

  changeCurrency = (price) => {
    const usdRate = 68; // must be changed
    const eurRate = 77; // must be changed
    if (this.props.currency === "usd" ) return `$ ${Math.floor(price/usdRate)} `;
    if (this.props.currency === "eur" ) return `€ ${Math.floor(price/eurRate)} `;
    else return `${price} ₽`
  }
  render() {

    return (
      <div className = "flight">
        <div className = "flight_left-side">
          <div className = "flight_avia-logo">
            <img src={turkish} className="avia-logo" alt="logo" />
          </div>
          <button type = "submit" className = "flight-btn">Купить за {this.changeCurrency(this.props.price)} </button>
        </div>
        <div className = "flight_right-side">
          <div className = "flight_departure">
            <span className ="flight_time">{this.props.departureTime}</span>
            <div className = "flight_aeroport-block">
              <span className ="flight_origin ">{this.props.origin}, </span>
              <span className ="flight_origin-name">{this.props.originName}</span>
            </div>
            <div className = "flight_data-block flight_data-block--origin">
              <span className ="flight_departure-date flight_date">{this.getDateFormat(this.props.departureDate)}, </span>
              <span className ="flight_departure-date flight_date">{this.getWeekDay(this.props.departureDate)}</span>
            </div>
          </div>
          <div className = "flight_stops">{this.getStopsNumber(this.props.stops)}</div>
          <div className = "flight_arrival">
            <span className ="flight_time">{this.props.arrivalTime}</span>
            <div className = "flight_aeroport-block ">
              <span className ="flight_destination">{this.props.destination}, </span>
              <span className ="flight_destination-name">{this.props.destinationName}</span>
            </div>
            <div className = "flight_data-block flight_data-block--arrival">
              <span className ="flight_arrival-date flight_date">{this.getDateFormat(this.props.arrivalDate)}, </span>
              <span className ="flight_arrival-date flight_date">{this.getWeekDay(this.props.arrivalDate)}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Flight;
