import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../Provider/AuthProvider'
import { Helmet } from 'react-helmet-async'
import Swal from 'sweetalert2'

const SignUp = () => {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm()
   const { creatUser, updateUserProfile } = useContext(AuthContext)
   const navigate = useNavigate();
   const location = useLocation();

   const from = location.state?.from?.pathname || "/";

   const onSubmit = (data) => {
      creatUser(data.email, data.password)
      .then(result=>{
         updateUserProfile(data.name, data.photoURL)
         const saveuser = {
               name: data.name,
               email: data.email,
               photoURL: data?.photoURL,
               role:'student'
         }
         fetch('https://master-coocking-assignment-server.vercel.app/users', {
               method: 'POST',
               headers: {
                  'content-type': 'application/json',
               },
               body: JSON.stringify(saveuser),
            })
               .then((res) =>  navigate(from, { replace: true }))
      })
      .catch(error=>{
         Swal.fire({
            position: 'center',
            icon: 'error',
            title: `There Was an error!.${error?.message}`,
            showConfirmButton: false,
            timer: 3000
          })
      })
      
   }

   return (
      <>
      <Helmet>
         <title>Master Coocking School || Sign Up</title>
      </Helmet>
      <div className="flex justify-center text-gray-900">
         <div className="flex justify-center flex-1 max-w-screen-xl m-0 bg-white shadow my-20 sm:rounded-lg">
            <div className="lg:w-4/12 hidden text-center bg-indigo-100 lg:flex">
               <div
                  className="w-full m-4 bg-center bg-no-repeat bg-contain"
                  style={{
                     backgroundImage: 'url("https://svgshare.com/i/QeB.svg")',
                  }}
               />
            </div>
            <div className=" lg:w-8/12 lg:px-12 md:p-0 md:mt-0 mt-20">
               <div className="flex flex-col items-center">
                  <h1 className="text-2xl font-extrabold xl:text-3xl">
                     Sign up
                  </h1>
                  <div className="flex-1 w-full mt-4">
                     <form onSubmit={handleSubmit(onSubmit)} className="w-full ml-2">
                        <div className="md:flex gap-4">
                           <div className="flex-1 mb-4">
                              <input
                                 type="text"
                                 name="name"
                                 {...register('name', { required: true })}
                                 placeholder="Fullname"
                                 className="input !w-full bg-gray-100 focus:bg-white"
                              />
                              {errors.name && (
                                 <span className='text-red-500 text-sm'>This field is required</span>
                              )}
                           </div>
                           <div className="flex-1 mb-4">
                              <input
                                 type="email"
                                 name="email"
                                 {...register('email', { required: true })}
                                 placeholder="Email"
                                 className="input !w-full bg-gray-100 focus:bg-white"
                              />
                              {errors.email && (
                                 <span className='text-red-500 text-sm'>This field is required</span>
                              )}
                           </div>
                        </div>
                        <div className="md:flex gap-4">
                           <div className="form-control w-full mb-4">
                              <input
                                 type="password"
                                 name="password"
                                 {...register('password', {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern:
                                       /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                                 })}
                                 placeholder="Password"
                                 className="input !w-full bg-gray-100 focus:bg-white"
                              />
                              {errors.password?.type === 'required' && (
                                 <span className='text-red-500 text-sm'>Password is required</span>
                              )}
                              {errors.password?.type === 'minLength' && (
                                 <span className='text-red-500 text-sm'>
                                    Password is should be min 6 charecter
                                 </span>
                              )}
                              {errors.password?.type === 'maxLength' && (
                                 <span className='text-red-500 text-sm'>
                                    Password is should be max 20 charecter
                                 </span>
                              )}
                              {errors.password?.type === 'pattern' && (
                                 <span className='text-red-500 text-sm'>
                                    Password is should be a uppercase a
                                    lowercase one spechil and one number max 20
                                    charecter
                                 </span>
                              )}
                           </div>
                           <div className="form-control w-full mb-4">
                              <input
                                 type="password"
                                 name="confirmpassword"
                                 {...register('confirmpassword', {
                                    required: true,
                                   
                                 })}
                                 placeholder="confirm password"
                                 className="input !w-full bg-gray-100 focus:bg-white"
                              />
                              {errors.confirmpassword && (
                                 <span className='text-red-500 text-sm'>Password and confirm password must be same</span>
                              )}
                           </div>
                        </div>
                        <div className="md:flex gap-4">
                           <div className="form-control w-full mb-4">
                              <input
                                 type="text"
                                 name="photoURL"
                                 {...register('photoURL', { required: true })}
                                 placeholder="Photo URL"
                                 className="input !w-full bg-gray-100 focus:bg-white"
                              />
                              {errors.photoURL && (
                                 <span className='text-red-500 text-sm'>This field is required</span>
                              )}
                           </div>
                        </div>
                        <input
                           className="flex items-center justify-center w-full py-4 mt-5 font-semibold tracking-wide text-gray-100 transition-all duration-300 ease-in-out bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:shadow-outline focus:outline-none"
                           type="Submit"
                           defaultValue="Sign Up"
                        />

                        <p className="my-4 text-center">
                           Already have an account?
                           <Link to="/login" className="font-bold">
                              Sign In
                           </Link>
                        </p>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </div>
      </>
   )
}

export default SignUp
