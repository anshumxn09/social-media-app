import {configureStore} from '@reduxjs/toolkit';
import { likeReducer, myPostReducer , userPostReducer} from './Reducers/postReducer';
import { userReducer, postOffFollowingReducer, allUserReducer} from './Reducers/userReducer';
const initialState = {}

const store = configureStore({
    reducer : {
        user : userReducer,
        postOffFollowingReducer,
        allUserReducer,
        likeReducer,
        myPostReducer,
        userPostReducer
    }
})

export default store