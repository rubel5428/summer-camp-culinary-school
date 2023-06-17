import { Link } from "react-router-dom";
import {AiFillFileAdd,AiFillHome} from 'react-icons/ai'
import {DiGhostSmall} from 'react-icons/di'
import {SiCoursera} from 'react-icons/si'
import {TfiBookmarkAlt,TfiBook} from 'react-icons/Tfi'
import {FaUserCog} from 'react-icons/Fa'
import {GoHistory} from 'react-icons/Go'
import useRole from "../../hooks/useRole";

export default function Sidebar() {
  const [role,refresh] = useRole();
  return (
    <>
    <aside
      id="default-sidebar"
      className="h-screen"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
        <li>
            <Link
              to='/'
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <AiFillHome size='24px' color="#6B7280" />
              <span className="ml-3">Back to Home</span>
            </Link>
          </li>  
        {
        role=='instructor' && <>
        <li>
            <Link
              to='/dashboard/add_class'
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <AiFillFileAdd size='24px' color="#6B7280" />
              <span className="ml-3">Add Course</span>
            </Link>
          </li>  
           <li>
            <Link
              to='/dashboard/my_class'
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <DiGhostSmall size='24px' color="#6B7280" />
              <span className="ml-3">My Class</span>
            </Link>
          </li></>
          }
        {
          role=='admin' && <>   <li>
          <Link
            to='/dashboard/manage_class'
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <SiCoursera size='24px' color="#6B7280" />
            <span className="ml-3">Manage Classes</span>
          </Link>
        </li> 
        <li>
          <Link
            to='/dashboard/user_management'
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaUserCog size='24px' color="#6B7280" />
            <span className="ml-3">User Managemant</span>
          </Link>
        </li></>
        }
          
          {
            role == 'student' && <>
            <li>
            <Link
              to='/dashboard/my_selected_class'
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <TfiBookmarkAlt size='24px' color="#6B7280" />
              <span className="ml-3">My Selected Class</span>
            </Link>
          </li>
          <li>
            <Link
              to='/dashboard/my_enrolled_class'
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <TfiBook size='24px' color="#6B7280" />
              <span className="ml-3">My Enrolled Class</span>
            </Link>
          </li> 
           <li>
            <Link
              to='/dashboard/payment_history'
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <GoHistory size='24px' color="#6B7280" />
              <span className="ml-3">Payment History</span>
            </Link>
          </li> 
            </>
          }
         
        </ul>
      </div>
    </aside>    
  </>
  
  )
}
