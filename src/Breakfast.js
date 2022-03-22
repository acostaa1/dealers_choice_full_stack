import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { removeBreakfast } from "./store";
import AddBreakfast from "./AddBreakfast";


const Breakfast = ({ breakfastItems, addBreakfast, removeBreakfast }) => {
  return (
    <div id="breakfast">
      <h3>Breakfast ({breakfastItems.length})</h3>
      <ul>
        {breakfastItems.map((item) => (
          <li key={item.id}>
            {item.name} ...... ${item.price} <button onClick= {() => removeBreakfast(item)}>X</button>
          </li>
        ))}
      </ul>
      <AddBreakfast />
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    
    removeBreakfast: (item) => {
        dispatch(removeBreakfast(item))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Breakfast);
