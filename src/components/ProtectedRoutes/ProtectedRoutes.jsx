import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import { CircularProgress } from "@mui/material";

const ProtectedRoute = () => {
    const { loading, token, isActive } = useAuth();

    // Show loading spinner while checking authentication
    if (loading) {
        return (
            <div className="size-full h-[100vh] gap-5 flex justify-center items-center">
                <CircularProgress
                    size="md"
                    value={40}
                />
                <span>Loading...</span>
            </div>
        );
    }

    // If no token exists, redirect to login
    if (!token) {
        return <Navigate to="/authentication/sign-in" replace />;
    }

    // If user is not active, redirect to login
    if (isActive === 'unset' || isActive === false) {
        return <Navigate to="/authentication/sign-in" replace />;
    }

    // If token exists and user is active, render protected content
    return <Outlet />;
};

export default ProtectedRoute;
