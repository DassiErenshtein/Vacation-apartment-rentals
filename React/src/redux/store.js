import { produce } from 'immer'
import { createStore,applyMiddleware } from 'redux';
import { middleWareLogin } from './Actions';
import {  register } from './api';
const initialState = {
    currentUser: null
}
const reducer = produce((state, action) => {
    switch (action.type) {
        case 'LOGIN':
            debugger
            state.currentUser=action.payload
            return;
        case 'SET_CURRENT_USER':
            debugger
            state.currentUser = action.payload
            return;
        default:
            break;
    }
}, initialState)
const store = createStore(reducer,applyMiddleware(middleWareLogin))
export default store
