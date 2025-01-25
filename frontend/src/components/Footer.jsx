import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
      
      <div>
        <img src={assets.logo} className='mb-5 w-32'alt="" />

        <p className='w-full md:w-2/3 text-gray-600'>
        At Organic Aura, we believe in the power of nature to nurture and heal. 
        Our products are crafted with the purest organic ingredients, bringing you 
        closer to a healthier and more sustainable lifestyle. With a commitment to 
        quality and sustainability, Organic Aura is your gateway to radiance and well-being, 
        naturally.
        </p>
      </div>
      <div>
        <p className='text-x1 font-medium mb-5'>COMPANY</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>

        </ul>
      </div>

      <div>
        <p className='text-x1 font-mdium mb-5'>GET IN TOUCH</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+91 638-299-2155</li>
            <li>contact@organicaura.@gmail.com</li>
        </ul>
      </div>
    </div>

        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2025@ organicaura.com - All Right Reserved.</p>
        </div>

    </div>
        
    
  )
}

export default Footer
