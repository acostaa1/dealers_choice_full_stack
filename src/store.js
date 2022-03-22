import { createStore, applyMiddleware, combineReducers } from "redux";
import axios from 'axios';
import thunks from 'redux-thunk';

//thunks
export const removeBreakfast = (item) => {
    return async (dispatch) => {
    await axios.delete(`/api/breakfast/${item.id}`);
    dispatch({ type: "REMOVE_BREAKFAST", item })
    }
} 
export const addBreakfast = (name, price, calories) => {
    return async (dispatch) => {
    const item = (await axios.post(`/api/breakfast/${name}/${price}/${calories}`)).data;
    dispatch({ type: "ADD_BREAKFAST", item })
    }
} 

const initialState = {
    breakfastItems: [],
    
}

const breakfastReducer = (state = initialState, action) => {
    if(action.type === 'LOAD_BREAKFAST') {
        return action.breakfastItems
    }
    if (action.type === "ADD_BREAKFAST") {
        state = {...state, breakfastItems:  action.breakfastItems}
        return state
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

