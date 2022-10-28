import {Outlet, Navigate} from "react-router-dom";

const PrivateRoutes = ({children, ...rest}) => {
    let user = sessionStorage.getItem("user")
    console.log(user)
    // (role=="Admin") ? auth.token=true : false
    return (
        user==="true" ? <Outlet/> : <Navigate to="/"/>
    )
}
export default PrivateRoutes;