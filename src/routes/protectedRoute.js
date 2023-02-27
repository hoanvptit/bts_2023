import { Navigate, Outlet } from "react-router-dom";
import { isUserLoggedIn, getUserData } from "~/util/auth";

export default function ProtectedRoute({redirectPath = "/login", children}){
    const user = getUserData();
    if(!isUserLoggedIn()){
    console.log("hoanv",isUserLoggedIn())
        return <Navigate to={redirectPath} replace/>
    }
    return children?children:<Outlet/>
}