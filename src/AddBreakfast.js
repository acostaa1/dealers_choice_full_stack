import React, { Component } from "react";
import store , {addBreakfast} from "./store";
import {connect} from 'react-redux';


class AddBreakfast extends Component {
    constructor() {
        super();
        this.state = {
            item: '',
            price: '',
            calories: ''
        }
        this.itemChange = this.itemChange.bind(this);
        this.priceChange = this.priceChange.bind(this);
        this.caloriesChange = this.caloriesChange.bind(this);
        this.addItem = this.addItem.bind(this)
    }
    itemChange(event) {
        this.setState({item: event.target.value})
    }
    priceChange(event) {
        this.setState({price: event.target.value})
    }
    caloriesChange(event) {
        this.setState({calories: event.target.value})
    }
    addItem(event) {
        event.preventDefault();
        this.props.create(this.state.item, this.state.price, this.state.calories)
        
    }
    render() {
        const {item, price, calories} = this.state;
        const {itemChange, priceChange, caloriesChange, addItem} = this;
    return (
        <form onSubmit={addItem}>
        <input value={item} onChange={itemChange} placeholder="item name"></input>
        <input value = {price} onChange={priceChange} placeholder="item price"></input>
        <input value = {calories} onChange={caloriesChange} placeholder="item calories"></input>
        <button disabled= {(!item, !price, !calories)} >Add To Menu</button>
      </form>
    );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        create: (item, price, calories) => dispatch(addBreakfast(item, price, calories))
    }
}

export default connect(state=> state, mapDispatchToProps)(AddBreakfast);