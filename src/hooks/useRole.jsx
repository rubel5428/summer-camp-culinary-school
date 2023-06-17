import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {

    const {user,loading} = useAuth();
    const [axiosSecure] = useAxiosSecure();
    // use axios secure with react query
    const {data: role,isLoading} = useQuery({
        queryKey: ['role', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user_role/${user?.email}`);
            return res.data.role;
        }
    })
    return [role,isLoading]
}
export default useRole;