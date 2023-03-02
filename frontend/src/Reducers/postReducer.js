import { createReducer } from "@reduxjs/toolkit";

const initialState = {}

export const likeReducer = createReducer(initialState, {
    likeRequest : (state) => {
        state.loading = true
    },
    likeSuccess : (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    likeFailure : (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    commentRequest : (state) => {
        state.loading = true
    },
    commentSuccess : (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    commentFailure : (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    deleteComRequest : (state) => {
        state.loading = true
    },
    deleteComSuccess : (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    deleteComFailure : (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    newPostRequest : (state) => {
        state.loading = true
    },
    newPostSuccess : (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    newPostFailure : (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    updateCaptionRequest : (state) => {
        state.loading = true
    },
    updateCaptionSuccess : (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    updateCaptionFailure : (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    
    deletePostRequest : (state) => {
        state.loading = true
    },
    deletePostSuccess : (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    deletePostFailure : (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    updateProfileRequest : (state) => {
        state.loading = true
    },
    updateProfileSuccess : (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    updateProfileFailure : (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    updatePasswordRequest : (state) => {
        state.loading = true
    },
    updatePasswordSuccess : (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    updatePasswordFailure : (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    deleteProfileRequest : (state) => {
        state.loading = true
    },
    deleteProfileSuccess : (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    deleteProfileFailure : (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    forgotPasswordRequest : (state) => {
        state.loading = true
    },
    forgotPasswordSuccess : (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    forgotPasswordFailure : (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    resetPasswordRequest : (state) => {
        state.loading = true
    },
    resetPasswordSuccess : (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    resetPasswordFailure : (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    followRequest : (state) => {
        state.loading = true
    },
    followSuccess : (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    followFailure : (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    clearError : (state) => {
        state.error = null;
    },
    clearMessage : (state) => {
        state.message = null;
    }
})


export const myPostReducer = createReducer({}, {
    myPostRequest: (state) => {
        state.loading = true;
    },
    myPostSuccess: (state, action) => {
        state.loading = false;
        state.myposts = action.payload;
    },
    myPostFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearError : (state) => {
        state.error = null;
    },
})

export const userPostReducer = createReducer({}, {
    userPostRequest: (state) => {
        state.loading = true;
    },
    userPostSuccess: (state, action) => {
        state.loading = false;
        state.posts = action.payload;
    },
    userPostFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearError : (state) => {
        state.error = null;
    },
})