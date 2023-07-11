import { createContext, useReducer } from "react";
import { LOGOUT, SIGN_IN, SIGN_UP } from "../constants/actionTypes";

export const UserContext = createContext();

export const userReducer = (state, action) => {
    switch (action.type) {
        case SIGN_UP:
            localStorage.setItem("profile", JSON.stringify({...state,  ...action.payload}));
            return {...state,  ...action.payload};
        case LOGOUT:
            localStorage.clear();
            return {...state};
        case SIGN_IN:
            localStorage.setItem("profile", JSON.stringify({...state,  ...action.payload}));
            return {...state, ...action.payload};
        default:
            return state;
    }
}

export const Provider = ({children}) => {

    const [state, dispatch] = useReducer(userReducer, null);

    return (
        <UserContext.Provider value={{state, dispatch}}>
            {children}
        </UserContext.Provider>
    )
}