import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";


const Breakfast = ({ breakfastItems, addBreakfast }) => {
  return (
    <div id="breakfast">
      <h3>Breakfast ({breakfastItems.length})</h3>
      <ul>
        {breakfastItems.map((item) => (
          <li key={item.id}>
            {item.name} ...... ${item.price} <button>X</button>
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
      const item = (await axios.post("/api/breakfast")).data;
      dispatch({
        type: "ADD_BREAKFAST",
        item,
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Breakfast);
