import axios from "axios";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Breakfast from "./Breakfast";
import store from "./store";
import { connect, Provider } from "react-redux";
import { HashRouter, Route, Link } from "react-router-dom";

const Info = connect((state) => state)((props) => {
  const item = props.breakfastItems.find(
    (item) => item.id === props.match.params.id * 1
  );
  return `Calorie Count: ${[item.calories]}`;
});

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
      <div>
        <div>
          <h2>
            <Link to="/">Menus</Link>
          </h2>
        </div>
        <div className="menus">
          <Route path="/breakfast/:id" component={Info} />
          <Breakfast />
        </div>
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

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
  document.querySelector("#root")
);
