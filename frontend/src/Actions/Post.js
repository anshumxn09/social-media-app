import axios from "axios";

export const likePost = (id) => async (dispatch) => {
    try {
        dispatch({type : "likeRequest"});
        const {data} = await axios.get(`/api/post/${id}`);
        dispatch({type : "likeSuccess", payload : data.message})
    } catch (error) {
        dispatch({type : "likeFailure", payload : error.response.data.message})
    }
}

export const commentPost = (id, comment) => async(dispatch) => {
    try {
        dispatch({type : "commentRequest"});
        const {data} = await axios.post(`/api/post/comment/${id}`, {
            comment
        }, {
            headers : {
                "Content-Type" : "application/json"
            },
            withCredentials : true
        });
        dispatch({type : "commentSuccess", payload : data.message})   
    } catch (error) {
        dispatch({type : "commentFailure", payload : error.response.data.message})
    }
}

export const deleteComment = (id, commentId) => async (dispatch) => {
    try {
        dispatch({type : "deleteComRequest"})
        const {data} = await axios.delete(`/api/post/comment/${id}`, {
           data : commentId
        });
        dispatch({type : "deleteComSuccess", payload : data.message});
        
    } catch (error) {
        dispatch({type : "deleteComFailure", payload : error.response.data.message})
    }
}