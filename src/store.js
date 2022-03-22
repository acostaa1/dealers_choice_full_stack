import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'


const initialState = {
    breakfastItems: []

}

const store = createStore((state = initialState, action)=> {
    if (action.type === 'LOAD_BREAKFAST') {
        state = {...state, breakfastItems: action.breakfastItems}
    }
    if (action.type === 'ADD_BREAKFAST') {
        state = {...state, breakfastItems: action.breakfastItems}
    }
    return state;
});
export default store;

