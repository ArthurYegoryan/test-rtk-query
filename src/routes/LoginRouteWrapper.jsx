import { paths } from "../constants/paths/paths";
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const LoginRouteWrapper = () => {
    const authData = useSelector((state) => state.auth.authData?.payload) ?? localStorage.getItem("authData");

    if (authData) {
        return <Navigate to={paths.TICKETS} />
    }

    return <Outlet />;
};

export default LoginRouteWrapper;