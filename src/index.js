import axios from "axios";
import React, { Component } from "react";
import ReactDOM from "react-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      breakfastDishes: [],
      lunchDishes: [],
      dinnerDishes: [],
    };
  }
  async componentDidMount() {
    try {
      const breakfastItems = (await axios.get("/api/breakfast")).data;
      //console.log(breakfast[0].name)
      const lunchItems = (await axios.get("/api/lunch")).data;
      const dinnerItems = (await axios.get("/api/dinner")).data;
      this.setState({breakfastDishes: [...breakfastItems]});
      this.setState({lunchDishes: [...lunchItems]})
      this.setState({dinnerDishes: [...dinnerItems]})
      
      
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const breakfast = this.state.breakfastDishes;
    const lunch = this.state.lunchDishes;
    const dinner = this.state.dinnerDishes;
    if (!breakfast.length) {
        return ('loading...')
    }
    
    return (
      <div className="menus">
        <div id="breakfast">
          <h3>Breakfast ({breakfast.length})</h3>
          <ul>{breakfast.map(item => <li key = {item.id} >{item.name} ......  ${item.price} <button>X</button></li>)}</ul>
          <form>
              <input placeholder = 'item name'></input>
              <input placeholder = 'item price'></input>
              <button>Add To Menu</button>
          </form>
        
        </div>
        <div id="lunch">
          <h3>Lunch ({lunch.length})</h3>
          <ul>{lunch.map(item => <li key = {item.id} >{item.name} ......  ${item.price} <button>X</button></li>)}</ul>
          <form>
              <input placeholder = 'item name'></input>
              <input placeholder = 'item price'></input>
              <button>Add To Menu</button>
          </form>
        </div>
        <div id="dinner">
          <h3>Dinner ({dinner.length})</h3>
          <ul>{dinner.map(item => <li key = {item.id} >{item.name} ......  ${item.price} <button>X</button></li>)}</ul>
          <form>
              <input placeholder = 'item name'></input>
              <input placeholder = 'item price'></input>
              <button>Add To Menu</button>
          </form>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
