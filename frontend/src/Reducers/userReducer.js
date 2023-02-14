import { createReducer } from "@reduxjs/toolkit";
const initialState = {
    isAuthenticated : false
}

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
        state.loading = true;

    },
    registerSuccess : (state, actions) => {
        state.loading = false;
        state.user = actions.payload
    },
    registerFailure : (state, actions) => {
        state.loading = false;
        state.error = actions.payload
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
})