import React, { Component } from 'react';
import SideBar  from "./Components/Sidebar";
import Flight  from "./Components/Flight";
import logo from "./img/logo.png";
import './App.css';

class App extends Component {

  state = {
    dataTicket: {tickets:[]},
    stops: {noStops: true,
            oneStop: false,
            twoStop: false,
            threeStop: false,
            allStops: false},
    currency: "rub"
  };

  componentDidMount() {
    this.getTicketData("ticket.json");
  };

  getTicketData(){
    fetch(
            "./ticket.json",
        ).then(responce => {
    return responce.json();
        }).then(resp => {
            console.log('resp: ', resp);
            this.setState ({dataTicket: resp})
    });
  };

  currencyClick = (e) => {
    const curr = e.target.id;
    this.setState({currency: curr });
  }

  stopsClick = (e) => {
    const theStop = e.target.id;
    let newStops;

    const stopsStateChange = (theStop)  => {
      if (theStop === "allStops" && this.state.stops.allStops === false){
        return {...this.state.stops, allStops: true, noStops: true, oneStop: true, twoStop: true, threeStop: true}
      }
      //find new state in object depending on click
      const stopsStatus = {
        noStops: {...this.state.stops, noStops: !this.state.stops.noStops, allStops: false},
        oneStop: {...this.state.stops, oneStop: !this.state.stops.oneStop, allStops: false},
        twoStop: {...this.state.stops, twoStop: !this.state.stops.twoStop, allStops: false},
        threeStop: {...this.state.stops, threeStop: !this.state.stops.threeStop, allStops: false},
        allStops: {...this.state.stops, allStops: false, noStops: true, oneStop: false, twoStop: false, threeStop: false}
      };

      for (let key in stopsStatus) {
        if (key === theStop) {
          return stopsStatus[key];
        }
      };
    };

    newStops = stopsStateChange(theStop);

    if( newStops.allStops === false && newStops.noStops === true && newStops.oneStop === true && newStops.twoStop === true && newStops.threeStop === true  ){
         newStops = {...this.state.stops, allStops: true, noStops: true, oneStop: true, twoStop: true, threeStop: true}
    }
    this.setState ({stops: newStops});
  };

  compareByPrice = (a,b) =>{
    if (a.price > b.price) return 1;
    if (a.price < b.price) return -1;
  };

  stopFilter = (items) => {
    let arrayForFilter = [];
    const stopState = this.state.stops;
    for (let key in stopState ) {
      if (stopState[key] === true){
        arrayForFilter = [...arrayForFilter, key]
      }
    };
    const stopsCount = {
    noStops: 0,
    oneStop: 1,
    twoStop: 2,
    threeStop: 3
    }
    arrayForFilter = arrayForFilter.map(item => stopsCount[item]);
    return arrayForFilter;
  };

  render() {

    let items = this.state.dataTicket.tickets; //data from state which come fron json
    const checkArr = this.stopFilter(items);
    items = items.filter(item =>
    checkArr.indexOf(item.stops) !== -1)
    items.sort(this.compareByPrice);

    return (
      <div className="app">
        <header className="app-header">
          <div className = "app-logo">
            <img src={logo} className="app-logo-img" alt="logo" />
          </div>
        </header>
        <div className = "container">
          <SideBar stopsClick = {this.stopsClick} currencyClick = {this.currencyClick} stopsData = {this.state.stops} currency = {this.state.currency}/>
          <div className = "ticket-list">
            {items.map((item, index) =>
             <Flight origin = {item.origin} originName = {item.origin_name} destination = {item.destination}
                                            destinationName = {item.destination_name} departureDate = {item.departure_date} departureTime = {item.departure_time}
                                            arrivalDate = {item.arrival_date} arrivalTime = {item.arrival_time} stops = {item.stops} price = {item.price} currency = {this.state.currency} key = {index}/>)
                                          }
          </div>
        </div>
      </div>
    );
  }
}
export default App;
