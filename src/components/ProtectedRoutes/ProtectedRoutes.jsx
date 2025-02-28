import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import { CircularProgress } from "@mui/material";

const ProtectedRoute = () => {
    const { loading, token } = useAuth();

    if (!token) {
        return <Navigate to="/authentication/sign-in" replace />;
    }
    if (loading) {
        return <div className="size-full h-[100vh] gap-5 flex justify-center items-center" >
            <CircularProgress
                size="md"
                value={40}
            // variant="soft"
            />

            loading...
        </div>;
    }

    return token ? <Outlet /> : <Navigate to="/authentication/sign-in" replace />;
};

export default ProtectedRoute;
