import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
export default function MyClass() {
    const {user,loading} = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { refetch, data: class_data = [] } = useQuery({
        queryKey: ['class_data', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`/my_class/${user?.email}`)
            return res.data;
        },
    })
  return (
    <div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
           Id
          </th>
          <th scope="col" className="px-6 py-3">
            Class Name
          </th>
          <th scope="col" className="px-6 py-3">
            Image
          </th>
          <th scope="col" className="px-6 py-3">
           Seats
          </th>
          <th scope="col" className="px-6 py-3">
            Price
          </th>
          <th scope="col" className="px-6 py-3">
            FeedBack
          </th>
           <th scope="col" className="px-6 py-3">
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        {
            class_data.map((course, index) => <tr key={course._id}>
                <th>{index + 1}</th>
                <th>{course?.class_name}</th>
                <th><img width='100' src={course?.class_image} alt="" /></th>
                <th>{course?.seats}</th>
                <th>{course?.price}</th>
                <th>{course?.feedback}</th>
                <th><span className={course?.status == 'pending' ? 'text-yellow-500'  : course?.status == 'approved' ? 'text-green-500': 'text-red-500'}>{course?.status}</span></th>
            </tr>)
        }
      </tbody>
    </table>
  </div>
  
  )
}
