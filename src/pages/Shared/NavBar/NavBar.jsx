
import { Link } from 'react-router-dom'
import logo from '../../../assets/logo.png'
import profilePhoto from '../../../assets/user.jpeg'

const NavBar = () => {
   const navOption = (
      <>
         <li>
            <Link to="/">Home</Link>
         </li>

         <li>
            <Link>Instructors</Link>
         </li>
         <li>
         <Link>Classes</Link>
         </li>
         <li>
         <Link>Dashboard </Link>
         </li>

         <li>
            <Link to="/signup">SIGN UP</Link>
         </li>
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
         <div className="navbar-end">
         
          <img className="w-10 rounded-full" src={profilePhoto}/>

         </div>
      </div>
   )
}

export default NavBar
