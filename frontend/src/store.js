import {configureStore} from '@reduxjs/toolkit';
import { likeReducer } from './Reducers/postReducer';
import { userReducer, postOffFollowingReducer, allUserReducer} from './Reducers/userReducer';
const initialState = {}

const store = configureStore({
    reducer : {
        user : userReducer,
        postOffFollowingReducer,
        allUserReducer,
        likeReducer
    }
})

export default store