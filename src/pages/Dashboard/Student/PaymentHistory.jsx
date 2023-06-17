
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
export default function PaymentHistory() {
    const {user,loading} = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const {data: paymentHistory = [] } = useQuery({
        queryKey: ['payment_history', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`/payment_history/${user?.email}`)
            return res.data;
        },
    })
   
  return (
    <div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
           Transactin Id
          </th>
          <th scope="col" className="px-6 py-3">
           Class Name
          </th>
          <th scope="col" className="px-6 py-3">
           Price
          </th>
          <th scope="col" className="px-6 py-3">
            Image
          </th>
          <th scope="col" className="px-6 py-3">
           Instructor
          </th>
        </tr>
      </thead>
      <tbody>
        {
            paymentHistory.map((payment) => <tr key={payment._id}>
                <td>{payment.transactionId}</td>
                <td>{payment?.course?.class_name}</td>
                <td>${payment?.price}</td>
                <td><img width='60' src={payment.course?.class_image} alt="" /></td>
                <td>{payment?.course?.author_name}</td>
            </tr>)
        }
      </tbody>
    </table>
  </div>
  )
}
