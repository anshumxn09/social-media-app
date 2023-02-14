import axios from 'axios';

export const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type : "loginRequest"
        })
        const {data} = await axios.post("/api/login", {
            email, password
        }, {
            headers : {"Content-Type" : "application/json"}
        })
        dispatch({
            type : "loginSuccess",
            payload : data.user
        })
    } catch (error) {
        dispatch({
            type : "loginFailure",
            payload : error
        })
    }
}

export const loadUser = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type : "loadUserRequest"
        })
        const {data} = await axios.get("/api/me");
        dispatch({
            type : "loadUserSuccess",
            payload : data.user
        })
    } catch (error) {
        dispatch({
            type : "loadUserFailure",
            payload : error
        })
    }
}