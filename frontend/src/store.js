import {configureStore} from '@reduxjs/toolkit';
import { userReducer } from './Reducers/userReducer';
const initialState = {}

const store = configureStore({
    reducer : {
        user : userReducer
    }
})

export default store