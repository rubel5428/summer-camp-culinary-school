import { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Provider/AuthProvider'
import SociaLogin from '../Shared/SocialLogin/SociaLogin'
import { Helmet } from 'react-helmet-async'
import Swal from 'sweetalert2'

const Login = () => {
  const {signIn}=useContext(AuthContext)
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event) =>{
    event.preventDefault()
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    signIn(email,password)
    .then(result=>{
      const logUser = result.user;
      const saveuser = {
          name: logUser.displayName,
          email: logUser.email,
          photoURL: logUser?.photoURL,
          role:'student'
      }
      fetch('https://master-coocking-assignment-server-rubel5428.vercel.app/users', {
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
            <title>Master Coocking School || Sign In</title>
         </Helmet>
         <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-xl my-10">
               <SociaLogin></SociaLogin>
               <form
               onSubmit={handleLogin}
                  action=""
                  className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
               >
                  <p className="text-center text-lg font-medium">
                     Sign in to your account
                  </p>
                  <div>
              
                     <div className="relative">
                        <input
                        name='email'
                           type="email"
                           className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                           placeholder="Enter email"
                           required
                        />
                        <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                           >
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth={2}
                                 d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                              />
                           </svg>
                        </span>
                     </div>
                  </div>
                  <div>
                     <div className="relative">
                        <input
                        name='password'
                           type="password"
                           className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                           placeholder="Enter password"
                           required
                        />
                        <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                           >
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth={2}
                                 d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth={2}
                                 d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                           </svg>
                        </span>
                     </div>
                  </div>
                  <input
                     type="submit"
                     className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                     value="Sign In"
                  />
                    
                
                  <p className="text-center text-sm text-gray-500">
                     No account?
                     <Link to="/signup" className="underline font-bold">
                        Sign up
                     </Link>
                  </p>
               </form>
            </div>
         </div>
      </>
   )
}

export default Login
