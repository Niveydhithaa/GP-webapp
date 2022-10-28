import {Outlet, Navigate} from "react-router-dom";

const PrivateRoutes = ({children, ...rest}) => {
    let auth = {'token': false}
    let role = sessionStorage.getItem("role")
    console.log(role)
    // (role=="Admin") ? auth.token=true : false
    return (
        role==="Admin" ? <Outlet/> : <Navigate to="/"/>
    )
}
export default PrivateRoutes;