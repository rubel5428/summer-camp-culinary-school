
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
export default function MySelectedClass() {
    const {user,loading} = useAuth();
    const navigate = useNavigate()
    const [axiosSecure] = useAxiosSecure();
    const {refetch, data: selected_data = [] } = useQuery({
        queryKey: ['selected_data', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`/my_selected_class/${user?.email}`)
            return res.data;
        },
    })
    const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/selected_class/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })

            }
        })
    }
    const payHandler = (id,seats)=>{
      if(seats > 0){
        return navigate(`/dashboard/student_checkout/${id}`)
      }else{
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: `There are no available Seats`,
          showConfirmButton: false,
          timer: 3000
        })
      }
     
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
          <th scope="col" className="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {
            selected_data.map((course, index) => <tr key={course._id}>
                <td>{index + 1}</td>
                <td>{course?.class_name}</td>
                <td><img width='60' src={course?.class_image} alt="" /></td>
                <td>{course?.author_name}</td>
                <td>${course?.price}</td>
                <td>
                 <div className="flex gap-x-2 items-center">
                   <span> <button onClick={()=>payHandler(course._id,course?.course?.seats)} className="py-2 btn btn-sm px-4 rounded text-white bg-green-500">Pay</button></span>
                   <span><div onClick={()=>handleDelete(course._id)} className="py-2  px-4 rounded text-white bg-red-500">Delete</div></span>
                 </div>
                </td>
            </tr>)
        }
      </tbody>
    </table>
  </div>
  )
}
