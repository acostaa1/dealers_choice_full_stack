import axios from "axios";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Breakfast from "./Breakfast";
import store from "./store";
import { connect, Provider } from "react-redux";

class _App extends Component {
  constructor() {
    super();
  }
  async componentDidMount() {
    try {
      this.props.load();
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const breakfast = this.props.breakfastItems;
    if (!breakfast.length) {
      return "loading...";
    }
    return (
      <div className="menus">
        <Breakfast />
      </div>
    );
  }
}

const mapStateToProps = ({ breakfastItems }) => {
  return { breakfastItems };
};

const mapDispatchToProps = (dispatch) => {
  return {
    load: async () => {
      const breakfast = (await axios.get("/api/breakfast")).data;
      dispatch({
        type: "LOAD_BREAKFAST",
        breakfastItems: breakfast,
      });
    },
  };
};

const App = connect(mapStateToProps, mapDispatchToProps)(_App);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.querySelector("#root"));
