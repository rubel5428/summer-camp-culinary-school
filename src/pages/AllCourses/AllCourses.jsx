import { useQuery } from "@tanstack/react-query";
import CourseCard from "../Home/Course/CourseCard";
import axios from "axios";

const AllCourses = () => {
    const {refetch, data: courses = [] } = useQuery({
        queryKey: ['courses'],
        queryFn: async () => {
            const res = await axios.get(`https://master-coocking-assignment-server-rubel5428.vercel.app/all_class`)
            return res.data;
        },
    })
    return (
        <div className="mt-0">
           <h2 className="text-3xl font-bold text-center pt-40 mb-10">All Classes</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
           {
            courses.map((course)=><CourseCard
            key={course._id}
            course={course}
            refetch={refetch}
            ></CourseCard>)
           }
           </div>
        </div>
    );
};

export default AllCourses;