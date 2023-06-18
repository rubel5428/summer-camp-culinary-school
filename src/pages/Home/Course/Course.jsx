import { useQuery } from "@tanstack/react-query";
import CourseCard from "./CourseCard";
import axios from "axios";
import { Slide } from "react-awesome-reveal";

const Course = () => {
    const {refetch, data: courses = [] } = useQuery({
        queryKey: ['popular_class'],
        queryFn: async () => {
            const res = await axios.get(`https://master-coocking-assignment-server-rubel5428.vercel.app/lts_six_class`)
            return res.data;
        },
    })
    return (
        <div className="my-10">
           <h2 className="text-3xl font-bold text-center mt-10">Our Popular Classes</h2>
          <Slide triggerOnce> 
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
           {
            courses.map((course)=><CourseCard
            key={course._id}
            course={course}
            refetch={refetch}
            ></CourseCard>)
           }
           </div>
           </Slide>
        </div>
    );
};

export default Course;