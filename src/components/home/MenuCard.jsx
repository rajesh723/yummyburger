import React from 'react'
import {motion} from 'framer-motion'

const MenuCard = ({itemNum,burgerSrc,price,title,handler,delay=0.1}) => {
  return <motion.div  className='menuCard'
     initial={{
        x:"-100%",
        opacity:0,
     }}
     whileInView={{
        x:0,
        opacity:1,
        
     }}
     transition={{
      delay,
     }}
  >
   <div>Item {itemNum}</div>
   <main>
    <img src={burgerSrc} alt={itemNum} />

    <h5>₹{price}</h5>
    
    <p>{title}</p>
     <button onClick={()=>handler(itemNum)}>Add to plate</button>
   </main>
  </motion.div>
}

export default MenuCard