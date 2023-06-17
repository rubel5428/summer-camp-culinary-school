import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
export default function AddClass() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
 } = useForm()
  const [axiosSecure] = useAxiosSecure();
    const {user} = useAuth()

    const onSubmit = data => {
      const class_name = data.class_name;
      const class_image = data.class_image;
      const seats = data.seats;
      const price = data.price;

      axiosSecure.post('/add_class',{
        class_name,
        class_image,
        seats,
        price,
        status:'pending',
        author_name:user?.displayName,
        email:user?.email,
      }).then((res)=>{
        if(res.data.insertedId){
          Swal.fire({
              position: 'center',
              icon: 'success',
              title: `Class Created Successfully`,
              showConfirmButton: false,
              timer: 3000
            })

            reset()
      }
      })
      
      

     
     
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="relative z-0 w-full mb-6 group">
      <input
        type="text"
        name="class_name"
        id="class_name"
        {...register('class_name', { required: true })}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required=""
      />
      <label
        htmlFor="class_name"
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        Class Name
      </label>
      {errors.class_name && (
        <span className="text-red-500 text-sm">This field is required</span>
    )}
    </div>
   
    <div className="relative z-0 w-full mb-6 group">
      <input
        type="text"
        name="class_image"
        id="class_image"
         {...register('class_image', { required: true })}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
      />
      <label
        htmlFor="class_image"
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        Class Image URL
      </label>
      {errors.class_image && (
        <span className="text-red-500 text-sm">This field is required</span>
    )}
    </div>
   
   <div className="flex gap-x-5">
   <div className="relative z-0 w-full mb-6 group">
      <input
        type="text"
        name="instructor_name"
        id="instructor_name"
         {...register('instructor_name', { required: true })}
        readOnly={true}
        defaultValue={user?.displayName}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
      />
     
      <label
        htmlFor="instructor_name"
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        Instructor Name 
      </label>
      {errors.instructor_name && (
        <span className="text-red-500 text-sm">This field is required</span>
    )}
    </div>
    <div className="relative z-0 w-full mb-6 group">
      <input
        type="text"
        name="author_email"
        id="author_email"
         {...register('author_email', { required: true })}
        readOnly={true}
        defaultValue={user?.email}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
      />
     
      <label
        htmlFor="author_email"
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        Instructor Email 
      </label>
      {errors.author_email && (
        <span className="text-red-500 text-sm">This field is required</span>
    )}
    </div>
   </div>
   
    <div className="grid md:grid-cols-2 md:gap-6">
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="number"
          name="seats"
           {...register('seats', { required: true })}
          id="seats"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          htmlFor="seats"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Total Seats
        </label>
        {errors.seats && (
        <span className="text-red-500 text-sm">This field is required</span>
    )}
      </div>
    
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="number"
          name="price"
           {...register('price', { required: true })}
          id="price"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
         {errors.price && (
        <span className="text-red-500 text-sm">This field is required</span>
    )}
        <label
          htmlFor="price"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Price
        </label>
      </div>
    </div>
    <button
      type="submit"
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Submit
    </button>
  </form>  
  )
}
