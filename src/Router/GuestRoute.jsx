import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router";


const GuestRoute = ({ children }) => {
    const { user} = useAuth();

    if (!user) {
        return children;
    }
    return <Navigate to="/"></Navigate>
};

export default GuestRoute;