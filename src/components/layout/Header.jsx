import React from 'react'
import {IoFastFoodOutline} from 'react-icons/io5'
import { Link} from 'react-router-dom'
import {FiLogIn, FiShoppingCart,FiHome,FiPhone,FiInfo} from 'react-icons/fi'
import {FaUser} from 'react-icons/fa'
import {motion} from 'framer-motion'

const Header = ({isAuthenticated=false}) => {
  return <nav>

    <motion.div
    initial={{x:"-100%"}}
    whileInView={{x:"0"}}
    >
      <IoFastFoodOutline />
    </motion.div>

    <div>
        <Link to="/"> <FiHome /> </Link>
        <Link to="/contact"><FiPhone /> </Link> 
        <Link to="/about"><FiInfo /></Link>
        <Link to="/cart">
            <FiShoppingCart />
        </Link>
        
        <Link to={isAuthenticated?"/me":"/login"}>
            {isAuthenticated ? <FaUser /> : <FiLogIn />}
        </Link>

    </div>

  </nav>
}

export default Header