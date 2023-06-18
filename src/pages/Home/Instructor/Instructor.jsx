import axios from "axios";
import InstructorCard from "./InstructorCard"
import { useQuery } from "@tanstack/react-query";
import { Fade } from "react-awesome-reveal";

export default function Instructor() {
  const { data: instructors = [] } = useQuery({
    queryKey: ['instructors'],
    queryFn: async () => {
        const res = await axios.get(`https://master-coocking-assignment-server-rubel5428.vercel.app/get_six_instructor`)
        return res.data;
    },
})
  return (
   
      <div className="my-10">
          <h2 className="text-3xl font-bold text-center mt-10">Our Popular Instructor</h2>
          <Fade cascade damping={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {
              instructors.map((instructor)=> <InstructorCard key={instructor._id} instructor={instructor} />)
            }
          </div>
          </Fade>
      </div>
    
  )
}
