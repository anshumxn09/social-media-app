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

export const registerUser = (name, email, password, images) => async (dispatch) => {
    try {
        dispatch({
            type : "registerRequest"
        })
        const {data} = await axios.post("/api/register", {
            email, password, name, images
        }, {
            headers : {"Content-Type" : "application/json"}
        })
        dispatch({
            type : "registerSuccess",
            payload : data.user
        })
    } catch (error) {
        dispatch({
            type : "registerFailure",
            payload : error.response.data.message
        })
    }
}

export const updateProfile = (name, email, avatar) => async (dispatch) => {
    try {
        dispatch({
            type : "updateProfileRequest"
        })
        const {data} = await axios.put("/api/update/profile", {
            email, name, avatar
        }, {
            headers : {"Content-Type" : "application/json"}
        })
        dispatch({
            type : "updateProfileSuccess",
            payload : data.message
        })
    } catch (error) {
        dispatch({
            type : "updateProfileFailure",
            payload : error.response.data.message
        })
    }
}

export const updatePassword = (oldpass, newpass) => async (dispatch) => {
    try {
        dispatch({
            type : "updatePasswordRequest"
        })
        const {data} = await axios.put("/api/update/password", {
            oldpass, newpass
        }, {
            headers : {"Content-Type" : "application/json"}
        })
        dispatch({
            type : "updatePasswordSuccess",
            payload : data.message
        })
    } catch (error) {
        dispatch({
            type : "updatePasswordFailure",
            payload : error.response.data.message
        })
    }
}

export const loadUser = () => async (dispatch) => {
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

export const getAllUsers = (name = "") => async(dispatch) => {
    try {
        dispatch({
            type : "allUserRequest"
        })

        const {data} = await axios.get(`/api/users?name=${name}`);

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

export const getMyPosts = () => async(dispatch) => {
    try {
        dispatch({
            type : "myPostRequest"
        })

        const {data} = await axios.get("/api/me/posts");

        dispatch({
            type : "myPostSuccess",
            payload : data.posts
        })

    } catch (error) {
        dispatch({
            type : "myPostFailure",
            payload : error.response.data.message
        })
    }
}

export const logoutUser = () => async (dispatch) => {
    try {
        dispatch({
            type : "logoutRequest"
        })
        
        const {data} = await axios.get("/api/logout");

        dispatch({
            type : "logoutSuccess",
        })
    } catch (error) {
        dispatch({
            type : "logoutFailure",
            payload : error.response.data.message
        })
    }
}

export const deleteProfile = () => async (dispatch) => {
    try {
        dispatch({
            type : "deleteProfileRequest"
        })

        const {data} = await axios.delete("/api/me");
        
        dispatch({
            type : "deleteProfileSuccess",
            payload : data.message
        })

    } catch (error) {
        dispatch({
            type : "deleteProfileFailure",
            payload : error.response.data.message
        })
    }
}

export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({type : "forgotPasswordRequest"})

        const {data} = await axios.post("/api/forgot/password", {
            email
        }, {
            headers : {
                "Content-Type" :"application/json",
            },
            withCredentials : true
        })

        console.log(data.message);
        dispatch({type : "forgotPasswordSuccess", payload : data.message})

    } catch (error) {
        dispatch({type : "forgotPasswordFailure", payload : error.response.data.message})
    }
}

export const resetPassword = (password, token) => async (dispatch) => {
    try {
        dispatch({type : "resetPasswordRequest"})

        const {data} = await axios.put(`/api/password/reset/${token}`, {
            password
        }, {
            headers : {
                "Content-Type" :"application/json",
            },
            withCredentials : true
        })

        dispatch({type : "resetPasswordSuccess", payload : data.message})

    } catch (error) {
        dispatch({type : "resetPasswordFailure", payload : error.response.data.message})
    }
}

export const getUserPosts = (id) => async (dispatch) => {
    try {
        dispatch({type : "userPostRequest"})

        const {data} = await axios.get(`/api/user/post/${id}`);

        dispatch({type : "userPostSuccess", payload : data.posts})
    } catch (error) {
        dispatch({type : "userPostFailure", payload : error.response.data.message})
    }
}

export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({type : "userDetailsRequest"})

        const {data} = await axios.get(`/api/user/${id}`);

        dispatch({type : "userDetailsSuccess", payload : data.user})
    } catch (error) {
        dispatch({type : "userDetailsFailure", payload : error.response.data.message})
    }
}

export const followUnfollow = (id) => async (dispatch) => {
    try {
        dispatch({type : "followRequest"})
        const {data} = await axios.get(`/api/follow/${id}`);
        dispatch({type : "followSuccess", payload : data.message})
    } catch (error) {
        dispatch({type : "followFailure", payload : error.response.data.message})
    }
}