import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import Burger1 from '../../assests/burger1.png'
import Burger2 from '../../assests/burger2.png'
import Burger3 from '../../assests/burger3.png'
import { useDispatch, useSelector } from 'react-redux'

const CartItem=({value,title,img,increment,decrement})=>{
 return <div className="cartItem">
    <div>
      <h4>{title}</h4>
       <img src={img} alt="Item" />
    </div>

   <div>
    <button onClick={decrement}>-</button>
     <input type="number" readOnly value={value}/>
    <button onClick={increment}>+</button>
   </div>

  </div>
}

const Cart = () => {

  const {
    cartItems:{
    cheeseBurger:{  quantity:cheeseBurger},
    grilledChickenBurger:{  quantity:grilledChickenBurger},
    jumboBurger:{  quantity:jumboBurger}}, 
    subTotal, tax, shippingCharges, total
    } = useSelector((state)=>state.cart);

const {cartItems:orderItems} = useSelector((state)=>state.cart);

const dispatch = useDispatch()

const increment = (item) =>{
     switch (item){
      case 1:
        dispatch({type:"cheeseBurgerIncrement"})
        dispatch({type:"calculatePrice"})
        break;

      case 2:
        dispatch({type:'grilledChickenBurgerIncrement'})
        dispatch({type:"calculatePrice"})
        break;  
       
        case 3:
          dispatch({type:'jumboBurgerIncrement'})
          dispatch({type:"calculatePrice"})
          break;

      default:
        dispatch({type:'cheeseBurgerIncrement'})
        dispatch({type:"calculatePrice"})
        break; 
     }

    
};

const decrement = (item) =>{
  switch (item){
   case 1:
    if(cheeseBurger===0) break;
     dispatch({type:"cheeseBurgerDecrement"})
     dispatch({type:"calculatePrice"})
     break;

   case 2:
    if(grilledChickenBurger === 0) break;
     dispatch({type:'grilledChickenBurgerDecrement'})
     dispatch({type:"calculatePrice"})
     break;  
    
     case 3:
      if(jumboBurger === 0) break;
       dispatch({type:'jumboBurgerDecrement'})
       dispatch({type:"calculatePrice"})
       break;

     default:
      if(cheeseBurger === 0) break;
       dispatch({type:'jumboBurgerDecrement'})
       dispatch({type:"calculatePrice"})
     break; 
  }

 
};


useEffect(()=>{
  localStorage.setItem("cartItems",JSON.stringify(orderItems));
  localStorage.setItem("cartPrices",JSON.stringify({subTotal, tax, shippingCharges, total}));

},[orderItems,subTotal, tax, shippingCharges, total]);

  return <section className='cart'>
    <main>
      
<CartItem title={"Cheese Burger"} 
  img={Burger1} 
  value={cheeseBurger} 
  increment={()=>increment(1)} 
  decrement={()=>decrement(1)} 
/>

<CartItem title={"Grilled Chicken Burger"} 
 img={Burger2} 
 value={grilledChickenBurger} 
 increment={()=>increment(2)} 
 decrement={()=>decrement(2)} 
/>

<CartItem title={"Jumbo Burger & Fries"} 
 img={Burger3} 
 value={jumboBurger} 
 increment={()=>increment(3)} 
 decrement={()=>decrement(3)} 
/>

  <article>
    <div>
      <h4>Sub Total</h4>
      <p>₹{subTotal}</p>
    </div>
    <div>
      <h4>Tax</h4>
      <p>₹{tax}</p>
    </div>
    <div>
      <h4>Shipping Charges</h4>
      <p>₹{shippingCharges}</p>
    </div>
    <div>
      <h4>Net Total</h4>
      <p>₹{total}</p>
    </div>

   <Link to='/shipping'>Checkout</Link>

  </article>

  </main>
  </section>
  
}

export default Cart