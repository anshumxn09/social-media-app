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

export const newPost = (caption, image) => async (dispatch) => {
    try {
        dispatch({type : "newPostRequest"});

        const {data} = await axios.post("/api/post/upload", {
            caption, image
        }, {
            headers : {
                "Content-Type" : "application/json"
            }
        });
        dispatch({type : "newPostSuccess", payload : data.message});
        
    } catch (error) {
        dispatch({type : "newPostFailure", payload : error.response.data.message})
    }
}

export const updateCaption = (id, caption) => async (dispatch) => {
    try {
        dispatch({type : "updateCaptionRequest"});

        const {data} = await axios.put(`/api/post/${id}`, {
            caption,
        }, {
            headers : {
                "Content-Type" : "application/json",
            },
            withCredentials : true
        });
        dispatch({type : "updateCaptionSuccess", payload : data.message});
        
    } catch (error) {
        dispatch({type : "updateCaptionFailure", payload : error.response.data.message})
    }
}


export const deletePost = (id) => async (dispatch) => {
    try {
        dispatch({type : "deletePostRequest"});

        const {data} = await axios.delete(`/api/post/${id}`);
        
        dispatch({type : "deletePostSuccess", payload : data.message});
        
    } catch (error) {
        dispatch({type : "deletePostFailure", payload : error.response.data.message})
    }
}
