import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { useForm } from 'react-hook-form'
import { useState } from "react";
import Swal from "sweetalert2";
export default function ManageClass() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
 } = useForm()
    const {user,loading} = useAuth();
    const [show,setShow] = useState(false)
    const [classId,setClassId] = useState('');
    const [axiosSecure] = useAxiosSecure();
    const { refetch, data: class_data = [] } = useQuery({
        queryKey: ['class_data', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure('/all_classes_admin')
            return res.data;
        },
    })
    const statusHandler = async (id,status) =>{
         await axiosSecure.patch(`/change_status/${id}?status=${status}`)
         refetch();
    }
    
    const handleModal = (id) => {
      setShow((prev)=> !prev)
      if(show == false){
        setClassId(id)
      }else{
        setClassId('')
        reset()
      }
      
    }


    const sendFeedbackHandler = async(data) =>{
        try {
          await axiosSecure.patch(`/sendfeedback/${classId}`,{feedback:data.feedback})
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Successfully feedback Send`,
            showConfirmButton: false,
            timer: 3000
          })
          reset()
          setClassId('');
          setShow(false)
          refetch()
        } catch (error) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: `There Was an error!`,
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
            Instructor Name
          </th>
          <th scope="col" className="px-6 py-3">
            Instructor Email
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
          <th scope="col" className="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {
            class_data.map((course, index) => <tr key={course._id}>
                <td className="text-center">{index + 1}</td>
                <td>{course?.class_name}</td>
                <td><img width='50' src={course?.class_image} alt="" /></td>
                <td>{course?.author_name}</td>
                <td>{course?.email}</td>
                <td className="text-center">{course?.seats}</td>
                <td className="text-center">${course?.price}</td>
                <td>{course?.feedback}</td>
                <td><span className={course?.status == 'pending' ? 'text-yellow-500'  : course?.status == 'approved' ? 'text-green-500': 'text-red-500'}>{course?.status}</span></td>
                <td>
                <div className="flex gap-2">
                <button disabled={course.status != 'pending'} onClick={()=>statusHandler(course._id,'approved')} className={course.stats != 'pending' ? 'text-white bg-green-500 py-2 px-4 rounded opacity-60 btn btn-sm' : 'py-2 px-4 rounded text-white bg-green-500 btn btn-sm'}>Aprrove</button>
                 <button disabled={course.status != 'pending'} onClick={()=>statusHandler(course._id,'denied')} className={course.status != 'pending' ? 'text-white bg-red-500 py-2 px-4 rounded opacity-60 btn btn-sm' : 'py-2 px-4 rounded text-white bg-red-500 btn btn-sm'}>Deny</button>
                 <button onClick={()=>handleModal(course._id)} disabled={course.status == 'pending'} className="py-2 px-4 rounded btn btn-sm text-white bg-gray-500">feedback</button>
                </div>
                </td>
            </tr>)
        }
      </tbody>
    </table>


  {
    show &&   <>
    {/* Main modal */}
    <div
      id="authentication-modal"
  
      className="fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative w-full max-w-md max-h-full">
        {/* Modal content */}
        <div className="relative top-[75%] left-[90%]  bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            onClick={handleModal}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-hide="authentication-modal"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
             Send FeedBack
            </h3>
            <form className="space-y-6" onSubmit={handleSubmit(sendFeedbackHandler)}>
              <div>
                <label
                  htmlFor="feedback"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                 Feedback
                </label>
                <input
                  type="text"
                  name="feedback"
                  {...register('feedback', { required: true })}
                  id="feedback"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
                 {errors.feedback && (
                      <span className='text-red-500 text-sm'>This field is required</span>
                  )}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
               send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>
  
  }
  </div>
  
  )
}
