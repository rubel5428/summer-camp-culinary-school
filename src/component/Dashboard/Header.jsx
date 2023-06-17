import useAuth from "../../hooks/useAuth"
import profilePhoto from '../../assets/user.jpeg'
export default function Header() {
    const {user,logOut} = useAuth();
  return (
    <div>
      <nav className="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-3">
        <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
            <div className="capitalize">
            
           
            </div>
            <div className="flex items-center">
           
          

             
          {user &&   <div className="navbar-end flex items-center">
         
          <img className="w-10 h-10 rounded-full" src={user?.photoURL ? user?.photoURL : profilePhoto}/>
         <button onClick={logOut} className='text-white btn bg-red-500 py-2 px-4 rounded ml-3'>Logout</button>

        </div>}
            </div>
        </div>
        </nav>

    </div>
  )
}
