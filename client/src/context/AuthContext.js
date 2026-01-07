import { Children, createContext } from "react";

let initialState = {}

const AuthContext = createContext(initialState)

export const AuthContextProvider = ({Children}) => {
    return(

        <AuthContextProvider value={{}}>{Children}</AuthContextProvider>
    )
}