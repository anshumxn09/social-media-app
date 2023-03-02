import { createReducer } from "@reduxjs/toolkit";
const initialState = {}

export const userReducer = createReducer(initialState, {
    loginRequest : (state, actions) => {
        state.loading = true;
    },
    loginSuccess : (state, actions) => {
        state.loading = false;
        state.user = actions.payload
        state.isAuthenticated = true;
    },
    loginFailure : (state, actions) => {
        state.loading = false;
        state.error = actions.payload
        state.isAuthenticated = false;
    },

    registerRequest : (state, actions) => {
        state.loading = true
    },
    registerSuccess : (state, actions) => {
        state.loading = false;
        state.user = actions.payload;
        state.isAuthenticated = true;
    },
    registerFailure : (state, actions) => {
        state.loading = false;
        state.error = actions.payload;
        state.isAuthenticated = false;
    },
    
    logoutRequest : (state, actions) => {
        state.loading = true;
    },
    logoutSuccess : (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
    },
    logoutFailure : (state, actions) => {
        state.loading = false;
        state.error = actions.payload
        state.isAuthenticated = true;
    },

    loadUserRequest : (state, actions) => {
        state.loading = true;
    },
    loadUserSuccess : (state, actions) => {
        state.loading = false;
        state.user = actions.payload
        state.isAuthenticated = true;
    },
    loadUserFailure : (state, actions) => {
        state.loading = false;
        state.error = actions.payload
        state.isAuthenticated = false;
    },
    clearError : (state) => {
        state.error = null;
    }
})

export const postOffFollowingReducer = createReducer({}, {
    postOffFollowingRequest : (state) => {
        state.loading = true
    },
    postOffFollowingSuccess : (state, action) => {
        state.loading = false;
        state.posts = action.payload;
    },
    postOffFollowingFailure : (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearError : (state) => {
        state.error = null;
    }
})

export const allUserReducer = createReducer({}, {
    allUserRequest : (state) => {
        state.loading = true
    },
    allUserSuccess : (state, action) => {
        state.loading = false;
        state.users = action.payload;
    },
    allUserFailure : (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearError : (state) => {
        state.error = null;
    }
})

export const userDetailsReducer = createReducer({}, {
    userDetailsRequest : (state) => {
        state.loading = true
    },
    userDetailsSuccess : (state, action) => {
        state.loading = false;
        state.users = action.payload;
    },
    userDetailsFailure : (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearError : (state) => {
        state.error = null;
    }
})