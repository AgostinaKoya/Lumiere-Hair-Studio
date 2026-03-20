import { Routes, Route, Navigate } from "react-router";
import { NotFoundPage } from '../pages/404'

export const RoutesWithNotFount = ({children}) => {

return (
<Routes>
    {children}
    <Route path="*" element={<Navigate to="/404"/>} />
    <Route path="/404" element={<NotFoundPage/>}/> 
</Routes>
)





}