import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import './CheckoutForm.css'
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const CheckoutForm = ({ course, price }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure()
    const [payError, setPayError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const navigate = useNavigate(); 

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment', { price })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [price, axiosSecure])


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return
        }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            setPayError(error.message);
        }
        else {
            setPayError('');
        }

        setProcessing(true)

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'unknown',
                        name: user?.displayName || 'anonymous'
                    },
                },
            },
        );
        setProcessing(false)
        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);
            const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                price,
                date: new Date(),
                course,
            }
            axiosSecure.post('/payments', payment)
                .then(res => {
                   if(res.data.insertResult.insertedId){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `Your payment successfully.Transaction ID is ${transactionId}`,
                        showConfirmButton: false,
                        timer: 3000
                      })

                      navigate('/dashboard/my_enrolled_class')

                   }
                })
        }


    }

    return (
        <>
            <form className="w-2/3 m-8" onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-success text-white btn-sm mt-2" type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            {payError && <p className="text-red-600 ml-8">{payError}</p>}
        </>
    );
};

export default CheckoutForm;