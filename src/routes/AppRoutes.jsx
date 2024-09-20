import { Navigate, Route, Routes } from "react-router-dom";
import { paths } from "../constants/paths/paths";
import LoginRouteWrapper from "./LoginRouteWrapper";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "../pages/loginPage/LoginPage";
import TicketsPage from "../pages/ticketsPage/TicketsPage";
import Error404Page from "../pages/errorPage/Error404Page";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={paths.LOGIN} element={<LoginRouteWrapper />}>
                <Route index element={<LoginPage />} />
            </Route>
            <Route path={paths.MAIN} element={<ProtectedRoute />}>
                <Route index element={<Navigate to={paths.TICKETS} />} />
                <Route path={paths.TICKETS} element={<TicketsPage />} />
                <Route path={paths.ANY} element={<Error404Page />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;