import { createStore, applyMiddleware, combineReducers } from "redux";
import axios from 'axios';
import thunks from 'redux-thunk';

//thunk
export const removeBreakfast = (item) => {
    return async (dispatch) => {
    await axios.delete(`/api/breakfast/${item.id}`);
    dispatch({ type: "REMOVE_BREAKFAST", item })
    }
} 

const breakfastReducer = (state = [], action) => {
    if(action.type === 'LOAD_BREAKFAST') {
        return action.breakfastItems
    }
    if (action.type === "ADD_BREAKFAST") {
        return action.breakfastItems
    }
    if (action.type === "REMOVE_BREAKFAST" ) {
        return state.filter(item => item.id !== action.item.id);
    }
    return state 
}
const reducer = combineReducers({
    breakfastItems: breakfastReducer
})

const store = createStore(reducer, applyMiddleware(thunks)); 
export default store;

