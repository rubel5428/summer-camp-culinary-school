import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";


const InstructorRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [role,isLoading] = useRole();
    const location = useLocation();
    if(loading || isLoading){
        return <progress className="progress w-56"></progress>
    }

    if (user && role=='instructor') {
        return children;
    }
    return <Navigate to="/" state={{from: location}} replace></Navigate>
};

export default InstructorRoute;