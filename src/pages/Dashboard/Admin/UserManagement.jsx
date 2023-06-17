import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

export default function UserManagement() {
    const {loading} = useAuth()
    const [axiosSecure] = useAxiosSecure();
    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`/users`)
            return res.data;
        },
    })

    const userHandler = (id,role) =>{
         axiosSecure.patch(`/users_manage/${id}/${role}`)
         .then(data => {
            if(data.data.modifiedCount){
                refetch()
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `User Role Change Successfully`,
                    showConfirmButton: false,
                    timer: 3000
                  })
            }
  
        })
   }

  return (
    <div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
           Id
          </th>
          <th scope="col" className="px-6 py-3">
           Name
          </th>
          <th scope="col" className="px-6 py-3">
            Image
          </th>
          <th scope="col" className="px-6 py-3">
            Email
          </th>
          <th scope="col" className="px-6 py-3">
           Role
          </th>
          <th scope="col" className="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {
            users.map((user, index) => <tr key={user._id}>
                <td className="text-center">{index + 1}</td>
                <td>{user?.name}</td>
                <td><img width='50' src={user?.photoURL} alt="" /></td>
                <td>{user?.email}</td>
                <td>{user?.role}</td>
                <td>
                <div className="flex gap-2 flex-wrap">
                  <button disabled={user.role == 'instructor'} onClick={()=>userHandler(user._id,'instructor')} className={user.role == 'instructor' ? 'py-2 px-3 rounded text-white bg-blue-500 opacity-40 btn btn-sm': 'py-2 px-3 btn btn-sm rounded text-white bg-blue-500'}>Make Instructor</button>
                  <button disabled={user.role == 'admin'} onClick={()=>userHandler(user._id,'admin')} className={user.role == 'admin' ? 'py-2 px-3 rounded text-white bg-green-500 opacity-40 btn btn-sm':'py-2 px-3 rounded btn btn-sm text-white bg-green-500'}>Make Admin</button>
                </div>
                </td>
            </tr>)
        }
      </tbody>
    </table>
  </div>
  )
}
