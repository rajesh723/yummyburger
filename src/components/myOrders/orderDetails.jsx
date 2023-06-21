import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails } from '../../redux/actions/order';
import { useParams } from 'react-router-dom';
import Loader from '../layout/Loader';

const OrderDetails = () => {

    const params =useParams();

const {order,loading} = useSelector(state =>state.orders);   

const dispatch = useDispatch();

useEffect(()=>{
  dispatch(getOrderDetails(params.id));
},[dispatch,params.id])

  return (
    <section className="orderDetails">
        {
            loading===false && order!==undefined ?(
            <main>
            <h1>Order Details</h1>

            <div>
                <h1>Shipping</h1>
                <p>
                    <b>Address:</b>
                    {`${order.shippingInfo.hNo} ${order.shippingInfo.city} ${order.shippingInfo.state}
                       ${order.shippingInfo.country} ${order.shippingInfo.pinCode}`}
                </p>
            </div>

            <div>
                <h1>Contact</h1>
                <p>
                    <b>Name:</b>
                    {order.user.name}
                </p>
                <p>
                    <b>Phone:</b>
                    {order.shippingInfo.phoneNo}
                </p>
            </div>

            <div>
                <h1>Status</h1>
                <p>
                    <b>Order status:</b>
                    {order.orderStatus}
                </p>
                <p>
                    <b>Placed at:</b>
                    {order.createdAt.split("T")[0]}
                </p>
                <p>
                    <b>Delivered at:</b>
                    {order.deliveredAt?order.deliveredAt.split("T")[0]:"Not Delivered"}
                </p>
            </div>

            <div>
                <h1>Payment</h1>
                <p>
                    <b>Payment Method:</b>
                    {order.paymentMethod}
                </p>
                <p>
                    <b>Payment reference:</b>
                    #{order.paymentMethod==="COD"?"NA":order.paymentInfo}
                </p>
                <p>
                    <b>Paid at:</b>
                    {order.paymentMethod==="COD"?"NA":`${order.paidAt.split("T")[0]}`}
                </p>
            </div>

            <div>
                <h1>Amount</h1>
                <p>
                    <b>Items Total:</b>
                    ₹{order.itemsPrice}
                </p>
                
                <p>
                    <b>Shipping Charges:</b>
                    ₹{order.shippingCharges}
                </p>
                
                <p>
                    <b>Tax:</b>
                    ₹{order.itemsPrice*0.18}
                </p>
                <p>
                    <b>Total:</b>
                    ₹{order.totalAmount}
                </p>

            </div>

            <article>
                <h1>Ordered Items</h1>

             <div>
                <h4>Cheese Burger</h4>
                <div>
                    <span>{order.orderItems.cheeseBurger.price}</span> x <span>{order.orderItems.cheeseBurger.quantity}</span>
                </div>
             </div>

             <div>
                <h4>Grilled Chicken Burger</h4>
                <div>
                    <span>{order.orderItems.grilledChickenBurger.price}</span> x <span>{order.orderItems.grilledChickenBurger.quantity}</span>
                </div>
             </div>

             <div>
                <h4>Jumbo Burger & Fries</h4>
                <div>
                    <span>{order.orderItems.jumboBurger.price}</span> x <span>{order.orderItems.jumboBurger.quantity}</span>
                </div>
             </div>

             <div>
                <h4 
                style={{
                    fontWeight:800,
                }}
                >Sub Total</h4>
                <div
                style={{fontWeight:800}}
                >₹{order.itemsPrice}</div>
             </div>

            </article>
            
        </main>):<Loader />
        }
    </section>
  )
}

export default OrderDetails