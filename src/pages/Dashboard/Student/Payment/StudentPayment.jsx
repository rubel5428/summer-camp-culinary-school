import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";

const stripePromise = loadStripe(import.meta.env.VITE_stripe_pk);


const StudentPayment = () => {
    let { id } = useParams();
    const {loading} = useAuth()
    const navigate = useNavigate()
    const [axiosSecure] = useAxiosSecure();
    const {isLoading, data: select_course = [] } = useQuery({
        queryKey: ['select_course', id],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`/class_enroll/${id}`)
            return res.data;
        },
    })
    let course = {}

    if(select_course.length >0){
         course = select_course[0];
    }else{
         course = {};
    }

    let mainPrice = Number(course?.price);
    const price = parseFloat(mainPrice.toFixed(2))


    if(isLoading){
        return <progress className="progress w-56"></progress>
    }else if(course?.course?.seats < 1){
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: `There are no available Seats`,
            showConfirmButton: false,
            timer: 3000
          })

          navigate('/dashboard')

        
    }else{
        return (
            <div>
                <h2 className="text-3xl ml-7">Please Payment for {course.class_name}</h2>
    
                <Elements stripe={stripePromise}>
                    <CheckoutForm course={course} price={price}></CheckoutForm>
                </Elements>
            </div>
        );
    }
   
};

export default StudentPayment;