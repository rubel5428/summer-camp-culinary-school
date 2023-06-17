
import { Link } from 'react-router-dom'
import logo from '../../../assets/logo.png'
import profilePhoto from '../../../assets/user.jpeg'
import useAuth from '../../../hooks/useAuth'

const NavBar = () => {
   const {user,logOut} = useAuth();
   const navOption = (
      <>
         <li>
            <Link to="/">Home</Link>
         </li>

         <li>
            <Link to='all_instructor'>Instructors</Link>
         </li>
         <li>
         <Link to='/all_class'>Classes</Link>
         </li>
          {user && <li>
         <Link to='/dashboard'>Dashboard </Link>
         </li>}
         {!user &&   <><li>
            <Link to="/signup">SIGN UP</Link>
         </li>
          <li>
          <Link to="/login">SIGN IN</Link>
       </li></>
         }
        
      </>
   )
   return (
      <div className="navbar bg-black bg-opacity-70 fixed z-10 max-w-screen-xl px-4 text-white">
         <div className="navbar-start">
            <div className="dropdown">
               <label tabIndex={0} className="btn btn-ghost lg:hidden">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="h-5 w-5"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h8m-8 6h16"
                     />
                  </svg>
               </label>
               <ul
                  tabIndex={0}
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-black bg-opacity-90 uppercase rounded-box w-52"
               >
                  {navOption}
               </ul>
            </div>
            <div className='flex'>
                <img className='w-16' src={logo} alt="" />
            <a className="btn btn-ghost normal-case text-2xl -ml-6 mt-3">MC School</a>
            </div>
         </div>
         <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 uppercase">{navOption}</ul>
         </div>
       {user &&   <div className="navbar-end">
         
         <img className="w-10 rounded-full" src={user?.photoURL ? user?.photoURL : profilePhoto}/>
         <button onClick={logOut} className='text-white btn btn-sm bg-red-500 py-2 px-4 rounded ml-3'>Logout</button>

        </div>}
      </div>
   )
}

export default NavBar
