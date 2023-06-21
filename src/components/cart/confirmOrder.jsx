import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, paymentVerification } from '../../redux/actions/order.js';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../redux/store.js';
import { useEffect } from 'react';

const ConfirmOrder =  () => {


  const [paymentMethod,setPaymentMethod] = useState("");
  const [disableBtn,setDisableBtn] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

const {cartItems, subTotal, tax, shippingCharges, total, shippingInfo} = useSelector((state)=>state.cart)
const {message,error} = useSelector((state)=>state.order);


  const SubmitHandler = async (e) =>{
    e.preventDefault();
    setDisableBtn(true);


    if(paymentMethod === "COD"){
       dispatch(createOrder(
        shippingInfo,
        cartItems,
        paymentMethod,
        subTotal,
        tax,
        shippingCharges,
        total
       ));

              
    }
    else{
    const {data : {order,orderOptions},} = await axios.post(`${server}/createorderonline`,{
            
      shippingInfo,
      orderItems : cartItems,
      paymentMethod,
      itemsPrice : subTotal,
      taxPrices: tax ,
      shippingCharges,
      totalAmount: total
      },{
          headers:{
              "Content-Type": "application/json"
          },
          withCredentials: true,
      });

      const options = {
        key:"rzp_test_cdPamL5aQTXIxI",
        amount: order.amount,
        currency: "INR",
        name: "YummyBurger", 
        description: "an online burger delivering website",
        order_id: order.id,
        handler:  function (response) {
          
            const {razorpay_payment_id,razorpay_order_id,razorpay_signature} =response;

            dispatch(paymentVerification(razorpay_payment_id,razorpay_order_id,razorpay_signature,orderOptions));

        },

        theme: {
            color: "#9c003c"
        }
    };
    const razorpay = new window.Razorpay(options);
     razorpay.open();

    }
     

};

useEffect(()=>{
    
  if(message){
    toast.success(message);
    dispatch({type:"clearMessage"});
    dispatch({type:"emptyState"});
    navigate("/paymentsuccess");
  }

  if(error){
    toast.error(error);
    dispatch({type:"clearError"});
    setDisableBtn(false);
  }
},[dispatch,message,error,navigate]);



  return <section className='confirmOrder'>
    <main>
        <h1>Confirm Order</h1>

     <form onSubmit={SubmitHandler}>
        <div>
            <label>Cash On Delivery</label>
            <input type="radio" name='payment' required onChange={()=> setPaymentMethod("COD")}/>
        </div>
        <div>
            <label>Online payment</label>
            <input type="radio" name='payment' required onChange={()=> setPaymentMethod("Online")}/>
        </div>
        <button disabled={disableBtn} type="submit">Place Order</button>
     </form>

    </main>
  </section>
}

export default ConfirmOrder