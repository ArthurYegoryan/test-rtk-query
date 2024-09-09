import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import TicketsPage from "../pages/ticketsPage/TicketsPage";
import { paths } from "../constants/paths/paths";

const ProtectedRoute = () => {
    const authData = useSelector((state) => state.auth.authData?.payload) ?? localStorage.getItem("authData");


    if (!authData) {
        return <Navigate to={paths.LOGIN} />
    }
    
    return (
        <TicketsPage />
    );
};

export default ProtectedRoute;