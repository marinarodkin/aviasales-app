import React, { Component } from 'react';

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
              <input type = "checkbox" id="allStops" className = "sidebar_changing-checkbox " onClick = {this.props.stopsClick} checked = {this.props.stopsData.allStops} />
              <label for = "allStops" className = "sidebar_changing-label">Все</label>
            </div>
            <div className = "sidebar_changing-block">
              <input type = "checkbox" id="noStops" className = "sidebar_changing-checkbox" onClick = {this.props.stopsClick} checked = {this.props.stopsData.noStops}  />
              <label for = "noStops" className = "sidebar_changing-label">Без пересадок</label>
            </div>
            <div className = "sidebar_changing-block">
              <input type = "checkbox" id="oneStop" className = "sidebar_changing-checkbox" onClick = {this.props.stopsClick} checked = {this.props.stopsData.oneStop}/>
              <label for = "oneStop" className = "sidebar_changing-label">1 пересадка</label>
            </div>
            <div className = "sidebar_changing-block">
              <input type = "checkbox" id="twoStop" className = "sidebar_changing-checkbox" onClick = {this.props.stopsClick} checked = {this.props.stopsData.twoStop} />
              <label for = "twoStop" className = "sidebar_changing-label">2 пересадка</label>
            </div>
            <div className = "sidebar_changing-block">
              <input type = "checkbox" id="threeStop" className = "sidebar_changing-checkbox" onClick = {this.props.stopsClick} checked = {this.props.stopsData.threeStop} />
              <label for = "threeStop" className = "sidebar_changing-label">3 пересадка</label>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SideBar
