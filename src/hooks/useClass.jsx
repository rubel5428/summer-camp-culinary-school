import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useClass = (id) => {
    const {user, loading} = useAuth();
    const [axiosSecure] = useAxiosSecure();
    // use axios secure with react query
    const {data: check,refetch:refresh} = useQuery({
        queryKey: ['isSelected', user?.email,id],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/class_is_selected_or_enrolled/${user?.email}/${id}`);
            return res.data;
        }
    })

    const isSelected = check?.isSelected;
    const isEnrolled = check?.isEnrolled;
    return [isSelected,isEnrolled,refresh]
}
export default useClass;