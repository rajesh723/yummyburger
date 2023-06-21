import React from 'react'
import {AiFillFacebook,AiFillLinkedin,AiFillGithub} from 'react-icons/ai'

const Footer = () => {
  return <footer>
    <div>
        <h2>𝓨𝓤𝓜𝓜𝓨 𝓑𝓤𝓡𝓖𝓔𝓡!!</h2>
        <br />
        <p>We are trying to serve you the best taste possible.</p>
        <br />
        <em>Kindly give your feedback.</em>
        <strong>All right reserved @YummyBurger</strong>
    </div>
    <aside>
      <h4>Follow Us</h4>
       
       
      <a href="https://www.facebook.com/profile.php?id=100010742146388" className='media'><AiFillFacebook /></a>
      <a href="https://www.linkedin.com/in/rajesh-kumar-82530b189/" className='media'><AiFillLinkedin /></a>
      <a href="https://github.com/rajesh723" className='media'><AiFillGithub /></a>
      
    </aside>
  </footer>
}

export default Footer