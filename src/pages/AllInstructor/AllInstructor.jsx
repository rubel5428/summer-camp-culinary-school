import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import InstructorCard from "../Home/Instructor/InstructorCard";

const AllInstructor = () => {
    const { data: instructors = [] } = useQuery({
        queryKey: ['all_instructor'],
        queryFn: async () => {
            const res = await axios.get(`https://master-coocking-assignment-server-rubel5428.vercel.app/get_all_instructors`)
            return res.data;
        },
    })
    return (
        <div className="mt-0">
           <h2 className="text-3xl font-bold text-center pt-40 mb-10">All Instructors</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
           {
           
            instructors.map((instructor)=> <InstructorCard key={instructor._id} instructor={instructor} />)
          
           }
           </div>
        </div>
    );
};

export default AllInstructor;