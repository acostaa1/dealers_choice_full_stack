import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { removeBreakfast } from "./store";


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
      <form>
        <input placeholder="item name"></input>
        <input placeholder="item price"></input>
        <input placeholder="item calories"></input>
        <button onClick={() => addBreakfast()}>Add To Menu</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    addBreakfast: async () => {
      const bfast = (await axios.post("/api/breakfast")).data;
      dispatch({
        type: "ADD_BREAKFAST",
        item,
      });
    },
    removeBreakfast: (item) => {
        dispatch(removeBreakfast(item))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Breakfast);
