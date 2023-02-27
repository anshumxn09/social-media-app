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
            payload : error.response.data.message
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
            payload : error.response.data.message
        })
    }
}

export const getFollowingPosts = () => async(dispatch) => {
    try {
        dispatch({
            type : "postOffFollowingRequest"
        })

        const {data} = await axios.get("/api/post");

        dispatch({
            type : "postOffFollowingSuccess",
            payload : data.posts
        })

    } catch (error) {
        dispatch({
            type : "postOffFollowingFailure",
            payload : error.response.data.message
        })
    }
}

export const getAllUsers = () => async(dispatch) => {
    try {
        dispatch({
            type : "allUserRequest"
        })

        const {data} = await axios.get("/api/users");

        dispatch({
            type : "allUserSuccess",
            payload : data.user
        })

    } catch (error) {
        dispatch({
            type : "allUserFailure",
            payload : error.response.data.message
        })
    }
}