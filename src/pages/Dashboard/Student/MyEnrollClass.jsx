
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
export default function MyEnrolledClass() {
    const {user,loading} = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const {data: EnrollClass = [] } = useQuery({
        queryKey: ['my_enrolled', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`/my_enrolled_class/${user?.email}`)
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
           Instructor
          </th>
          <th scope="col" className="px-6 py-3">
            Price
          </th>
        </tr>
      </thead>
      <tbody>
        {
            EnrollClass.map((course, index) => <tr key={course._id}>
                <td>{index + 1}</td>
                <td>{course?.class_name}</td>
                <td><img width='60' src={course?.class_image} alt="" /></td>
                <td>{course?.author_name}</td>
                <td>${course?.price}</td>
            </tr>)
        }
      </tbody>
    </table>
  </div>
  )
}
