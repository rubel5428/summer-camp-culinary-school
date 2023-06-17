import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
    const {user} = useAuth();
    const [axiosSecure] = useAxiosSecure();
    // use axios secure with react query
    const {data: role,isLoading} = useQuery({
        queryKey: ['role', user?.email],
        enabled: user !== null,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user_role/${user?.email}`);
            return res.data.role;
        }
    })
    return [role,isLoading]
}
export default useRole;