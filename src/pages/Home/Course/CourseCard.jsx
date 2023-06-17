import useAxiosSecure from "../../../hooks/useAxiosSecure"
import useAuth from "../../../hooks/useAuth"
import Swal from "sweetalert2";
import useClass from "../../../hooks/useClass";
import useRole from "../../../hooks/useRole";

const CourseCard = ({ course,refetch }) => {
   
   const [axiosSecure] = useAxiosSecure()
   const {user} = useAuth();
   const { class_image,class_name,author_name,price,seats,_id } = course
   const [isSelected,isEnrolled,refresh] = useClass(_id)
   const [role] = useRole()
   const selectHandler = async () =>{
    if(user){
      const selectDetails = {
         name:user?.displayName || 'Unkhown',
         email:user?.email || 'Unkhown',
         class_image,
         class_name,
         author_name,
         price,
         classId:_id

      }
      axiosSecure.post(`/select_class`,selectDetails)
      .then(data => {
          if(data.data.insertedId){
              refetch()
              refresh()
              Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: `Class Selected Successfully`,
                  showConfirmButton: false,
                  timer: 1500
                })
          }

      })
    }else{
      Swal.fire({
         position: 'center',
         icon: 'warning',
         title: `Please login first!`,
         showConfirmButton: false,
         timer: 1500
       })
    }
 }
   return (
         <div>
         <div className={seats > 0 ? 'card card-compact w-96 bg-base-100 shadow-xl' : 'card card-compact w-96 bg-red-100 shadow-xl'}>
            <figure>
               <img
                  src={class_image}
                  alt={class_name}
               />
            </figure>
            <div className="card-body">
               <h2 className="card-title">{class_name}</h2>
               <p><span className="font-bold">Instructor: </span>{author_name}</p>
               <p><span className="font-bold">Available seats: </span>{seats}</p>
               <p><span className="font-bold">Price: </span>${price}</p>
               <div className="card-actions justify-end">
                  <button disabled={isSelected || isEnrolled || seats < 1 || role == 'admin' || role == 'instructor'} onClick={selectHandler} className="btn btn-primary">{isSelected ? 'Selected': isEnrolled ? 'Enrolled':'Select'}</button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default CourseCard
