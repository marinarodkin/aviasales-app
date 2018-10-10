import React, { Component } from 'react';
import SideBar  from "./Components/Sidebar";
import Flight  from "./Components/Flight";

import './App.css';

class App extends Component {
  state = {
    dataTicket: {tickets:[]},
    stops: {noStops: true,
            oneStop: false,
            twoStop: false,
            threeStop: false,
            allStops: false},
    currency: "rub",
    currencyData: {rub: true,
                   usd: false,
                   eur: false }
  };

  componentDidMount() {
    this.getTicketData("ticket.json");
      }

  getTicketData(){
    fetch(
            'https://marinarodkin.github.io/aviasales-app/ticket.json',
        ).then(responce => {
    return responce.json();
        }).then(resp => {
            console.log('resp: ', resp);
            this.setState ({dataTicket: resp})
        });
     }

  stopsClick = (e) => {
    const theStop = e.target.id;
    let newStops;

    switch (theStop) {
      case 'allStops':
        if (this.state.stops.allStops === false){
          newStops = {...this.state.stops, allStops: true, noStops: true, oneStop: true, twoStop: true, threeStop: true}
        }
        else{
          newStops = {...this.state.stops, allStops: false, noStops: true, oneStop: false, twoStop: false, threeStop: false}
        }
        break
      case 'noStops':
        newStops = {...this.state.stops, noStops: !this.state.stops.noStops, allStops: false}
        break
      case 'oneStop':
        newStops = {...this.state.stops, oneStop: !this.state.stops.oneStop, allStops: false}
        break
      case 'twoStop':
        newStops = {...this.state.stops, twoStop: !this.state.stops.twoStop, allStops: false}
        break
      case 'threeStop':
        newStops = {...this.state.stops, threeStop: !this.state.stops.threeStop, allStops: false}
        break
      default:
        break
      }

    if( this.state.stops.allStops === false && this.state.stops.noStops === true && this.state.stops.oneStop === true && this.state.stops.twoStop === true && this.state.stops.threeStop === true  ){
         newStops = {...this.state.stops, allStops: true}
    }

    this.setState ({stops: newStops})
    }


  currencyClick = (e) => {
    const curr = e.target.id;
    let newCurrency;
    this.setState({currency: curr });

    switch(curr){
      case "eur":
        newCurrency = {...this.state.currencyData, rub: false, usd: false, eur: true };
        break
      case "usd":
        newCurrency = {...this.state.currencyData, rub: false, usd: true, eur: false };
        break
      default:
        newCurrency = {...this.state.currencyData, rub: true, usd: false, eur: false };
        break
      }

    this.setState ({currencyData: newCurrency})
    }

  render() {

    const compareByPrice = (a,b) =>{
      if (a.price > b.price) return 1;
      if (a.price < b.price) return -1;
      }

    const stopsFilter = (items) => {
      let arr0 =[];
      let arr1 =[];
      let arr2 =[];
      let arr3 =[];
      let newArr = []

      if (this.state.stops.allStops === true){
        return items;
      }
      if (this.state.stops.noStops === true){
        arr0 = items.filter(item => item.stops === 0);
      }
      if (this.state.stops.oneStop === true){
        arr1 = items.filter(item => item.stops === 1);
      }
      if (this.state.stops.twoStop === true){
        arr2 = items.filter(item => item.stops === 2);
      }
      if (this.state.stops.threeStop === true){
        arr3 = items.filter(item => item.stops === 3);
      }

      newArr = [...newArr, ...arr0, ...arr1, ...arr2, ...arr3];
      return newArr;
    }

    let items = this.state.dataTicket.tickets; //data from state which come fron json
    items = stopsFilter(items);  // data filterd by sorts
    items.sort(compareByPrice);

    return (
      <div className="app">
        <header className="app-header">
          <div className = "app-logo">
            <img src="https://marinarodkin.github.io/aviasales-app/img/logo.png" className="app-logo-img" alt="logo" />
          </div>
        </header>
        <div className = "container">
          <SideBar stopsClick = {this.stopsClick} currencyClick = {this.currencyClick} currencyData = {this.state.currencyData} stopsData = {this.state.stops}/>
          <div className = "ticket-list">
            {items.map((item, index) =>
             <Flight origin = {item.origin} originName = {item.origin_name} destination = {item.destination}
                                            destinationName = {item.destination_name} departureDate = {item.departure_date} departureTime = {item.departure_time}
                                            arrivalDate = {item.arrival_date} arrivalTime = {item.arrival_time} stops = {item.stops} price = {item.price} currency = {this.state.currency}/>)
                                          }
          </div>
        </div>
      </div>
    );
  }
}


export default App;
/*
class SideBar extends Component {
  render() {
    return (
      <div className="sidebar">
        <div className = "sidebar_btn-group">
          <h2 className = "sidebar_title">ВАЛЮТА</h2>
          <div className = "sidebar_currency-btns">
            <input type = "radio" id="rub" className = "sidebar_currency-btn"  onClick = {this.props.currencyClick} checked = {this.props.currencyData.rub} />

            <label for = "rub" className = "sidebar_currency-label sidebar_currency-label--rub" >RUB</label>
            <input type = "radio" id="usd" className = "sidebar_currency-btn" onClick = {this.props.currencyClick} checked = {this.props.currencyData.usd}  />
            <label for ="usd" className = "sidebar_currency-label sidebar_currency-label--usd">USD</label>
            <input type = "radio" id="eur" className = "sidebar_currency-btn " onClick = {this.props.currencyClick} checked = {this.props.currencyData.eur} />
            <label for ="eur" className = "sidebar_currency-label sidebar_currency-label--eur">EUR</label>

          </div>
          <h2 className = "sidebar_title">количество пересадок</h2>
          <div className = "sidebar_changing-checkboxes">
            <div className = "sidebar_changing-block">
              <input type = "checkbox" id="allStops" className = "sidebar_changing-checkbox " onClick = {this.props.onClick} checked = {this.props.checkData.allStops} />
              <label for = "allStops" className = "sidebar_changing-label">Все</label>
              <div className = "sidebar_changing-check sidebar_changing-check--active"></div>
            </div>
            <div className = "sidebar_changing-block">
              <input type = "checkbox" id="noStops" className = "sidebar_changing-checkbox" onClick = {this.props.onClick} checked = {this.props.checkData.noStops}  />
              <label for = "noStops" className = "sidebar_changing-label">Без пересадок</label>
              <div className = "sidebar_changing-check"></div>
            </div>
            <div className = "sidebar_changing-block">
              <input type = "checkbox" id="oneStop" className = "sidebar_changing-checkbox" onClick = {this.props.onClick} checked = {this.props.checkData.oneStop}/>
              <label for = "oneStop" className = "sidebar_changing-label">1 пересадка</label>
              <div className = "sidebar_changing-check"></div>
            </div>
            <div className = "sidebar_changing-block">
              <input type = "checkbox" id="twoStop" className = "sidebar_changing-checkbox" onClick = {this.props.onClick} checked = {this.props.checkData.twoStop} />
              <label for = "twoStop" className = "sidebar_changing-label">2 пересадка</label>
              <div className = "sidebar_changing-check"></div>
            </div>
            <div className = "sidebar_changing-block">
              <input type = "checkbox" id="threeStop" className = "sidebar_changing-checkbox" onClick = {this.props.onClick} checked = {this.props.checkData.threeStop} />
              <label for = "threeStop" className = "sidebar_changing-label">3 пересадка</label>
              <div className = "sidebar_changing-check"></div>
            </div>
        </div>
      </div>
      </div>
    )
  }
}

class Flight extends Component {

  render() {
    const departureWeekDay = "Пт";
    const arrivalWeekDay = "Пт";
    const stopPrint = (stop) =>{
      switch (stop) {
    case 3:
    return "3 пересадки"
  case 2:
    return "2 пересадки"
      case 1:
    return "1 пересадка"
      case 0:
      return "без пересадок"
      }
}
const getWeekDay = (date) => {
 const year = "20"+date.substr(6,2);
 const month = date.substr(3,2);
 const day = date.substr(0,2);

 const newDate  = new Date (year, month, day, )

 const weekDay = [ "вс", "пн", "вт", "ср",
            "чт", "пт", "сб" ];
 return weekDay[newDate.getDay()];
   }

const newDateFormat = (date) =>{
 const year = "20"+date.substr(6,2);
const month = date.substr(3,2);
 const day = date.substr(0,2);

 const newDate  = new Date (year, month, day, );

  const monthName = ["дек", "янв", "фев", "мар", "апр", "мая", "июня", "июля", "авг", "сент", "окт", "ноя", "дек"];
  const newMonth = monthName[newDate.getMonth()];
  return `${day} ${newMonth} ${year}`
 }

 const changeCurrency = (price) => {
   const usdRate = 68;
   const eurRate = 77;
   if (this.props.currency === "usd" ) return `USD ${Math.floor(price/usdRate)} `;
   if (this.props.currency === "eur" ) return `EUR ${Math.floor(price/eurRate)} `;
   else return `${price} P`
 }

    return (
      <div className = "flight">
        <div className = "flight_left-side">
          <div className = "flight_avia-logo">
            <img src="img/turkish.png" className="avia-logo" alt="logo" />
          </div>
          <button type = "submit" className = "flight-btn">Купить  за {changeCurrency(this.props.price)} </button>
        </div>
        <div className = "flight_right-side">
          <div className = "flight_departure">
            <span className ="flight_departure-time flight_time">{this.props.departureTime}</span>
            <div className = "flight_aeroport-block flight_aeroport-block--origin">
              <span className ="flight_origin flight_aeroport">{this.props.origin}, </span>
              <span className ="flight_origin-name flight_aeroport-name">{this.props.originName}</span>
            </div>
            <div className = "flight_data-block flight_data-block--origin">
              <span className ="flight_departure-date flight_date">{newDateFormat(this.props.departureDate)}, </span>
              <span className ="flight_departure-date flight_date">{getWeekDay(this.props.departureDate)}</span>
            </div>
          </div>
          <div className = "flight_stops">{stopPrint(this.props.stops)}</div>
          <div className = "flight_plane-img"></div>
          <div className = "flight_arrival">
            <span className ="flight_arrival-time flight_time">{this.props.arrivalTime}</span>
            <div className = "flight_aeroport-block flight_aeroport-block--destination">
              <span className ="flight_destination flight_aeroport">{this.props.destination}, </span>
              <span className ="flight_destination-name flight_aeroport-name">{this.props.destinationName}</span>
            </div>
            <div className = "flight_data-block flight_data-block--arrival">
              <span className ="flight_arrival-date flight_date">{newDateFormat(this.props.arrivalDate)}, </span>
              <span className ="flight_arrival-date flight_date">{getWeekDay(this.props.arrivalDate)}</span>
            </div>
          </div>
        </div>
      </div>

    )
    }
    }
*/
