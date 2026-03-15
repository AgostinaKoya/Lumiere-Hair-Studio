
import { Navigate, Route, Routes } from "react-router"

import { Dashboard } from "../Dashboard/dashboard"

export const PrivateRouter = ()=> {

    console.log("va hacia las rutas privadas?")

    return(
        <Routes>
            <Route path="" element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
        </Routes>
    )

}