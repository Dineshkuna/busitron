import { Children, createContext, useEffect, useReducer } from "react";

let initialState = {
    user: localStorage.getItem("user") !== undefined ? JSON.parse(localStorage.getItem("user")) : null,
    token : localStorage.getItem("token") || null,
    role : localStorage.getItem("role") || null


}

export const AuthContext = createContext(initialState)

const reducer = (state, action)=> {
    switch (action.type) {
        case  "LOGIN-START":
        return {
            user: null,
            token: null,
            role: null
        };
        case "LOGIN-SUCCESS":
        return {
            user: action.payload,
            token: action.token,
            role: action.role
        };
        default:
            return state

    }
}

export const AuthContextProvider = ({Children}) => {
    const [state, dispatch] = useReducer(reducer, initialState) 

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("role", state.role);
        localStorage.setItem("token", state.token);

    },[state])

    return(

        <AuthContextProvider value={{
            user: state.user, token: state.token, dispatch
        }}>{Children}</AuthContextProvider>
    )
}