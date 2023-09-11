import {Navigate, Outlet} from "react-router-dom";

export const PrivateRoute = ({isAllowed, redirectPath, children}) => {
    if (isAllowed) {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
};
