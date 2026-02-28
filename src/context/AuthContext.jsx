import {createContext, useState} from "react";
import { useContext } from "react";


export const AuthContext = createContext(null)

export function AuthProvider({children}){

    const [user, setUser] = useState({
        id: null,
        name: "",
        phone: ""
    })

    return (
        <AuthContext.Provider value={{user}}>
        {children}
        </AuthContext.Provider>
    )


}