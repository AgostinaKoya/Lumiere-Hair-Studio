import {Navigate, Outlet} from "react-router"
import { useAuthStore } from "../store/authStore"


export const PrivateGuard = () =>{
    
    const {isLoggedIn} = useAuthStore()

    console.log("esta logeado? " + isLoggedIn)

    return isLoggedIn ? <Outlet/> : <Navigate to="/login" replace />

}