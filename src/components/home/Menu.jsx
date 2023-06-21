import React from 'react'
import MenuCard from './MenuCard'
import burger1 from '../../assests/burger1.png'
import burger2 from '../../assests/burger2.png'
import burger3 from '../../assests/burger3.png'
import { useDispatch } from 'react-redux'
import { toast } from 'react-hot-toast'


const Menu = () => {
  
  const dispatch = useDispatch()

  const addToCartHandler = (itemNum) => {
    switch (itemNum) {
      case 1:
        dispatch({ type: "cheeseBurgerIncrement" });
        dispatch({ type: "calculatePrice" });
        toast.success("Added To Cart");
        break;
      case 2:
        dispatch({ type: "grilledChickenBurgerIncrement" });
        dispatch({ type: "calculatePrice" });
        toast.success("Added To Cart");
        break;
      case 3:
        dispatch({ type: "jumboBurgerIncrement" });
        dispatch({ type: "calculatePrice" });
        toast.success("Added To Cart");
        break;

      default:
        dispatch({ type: "cheeseBurgerIncrement" });
        dispatch({ type: "calculatePrice" });
        toast.success("Added To Cart");
        break;
    }
  };

  return <section id='menu'>
    <h1>MENU</h1>

  <div>
    <MenuCard itemNum={1} burgerSrc={burger1} price={200} title="Cheese Burger" handler={addToCartHandler} delay={0.2}/>
    <MenuCard itemNum={2} burgerSrc={burger2} price={500} title="Grilled Chicken Burger" handler={addToCartHandler} delay={1.0}/>
    <MenuCard itemNum={3} burgerSrc={burger3} price={900} title="Jumbo Burger & Fries" handler={addToCartHandler} delay={1.8}/>
  </div>

  </section>
}

export default Menu