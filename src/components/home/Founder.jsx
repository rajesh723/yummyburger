import React from 'react'
import {motion} from 'framer-motion'
import me from "../../assests/me_too.jpeg"

const Founder = () => {
  
  const options ={
    initial:{
      x:"-100%",
      opacity:0,
    },
    whileInView:{
      x:0,
      opacity:1,
    }
  }

  return (<section className='founder'>
   <motion.div {...options} transition={{delay:0.4,}}>
     <img src={me} alt="Founder" height={250} width={250}/>
     <h3>Rajesh Kumar</h3>

     <p>Hey Everyone, I am Rajesh Kumar, the founder of Yummy Burger !!.
      <br/>
      Our aim is to serve delicious burgers all over the world.
     </p>
   </motion.div>
  </section>)
}

export default Founder