import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'
const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Organic Aura is your trusted destination for premium organic products that promote a healthier and more sustainable lifestyle.
            We are committed to offering a diverse range of eco-friendly and chemical-free products, from fresh produce to skincare essentials,
            ensuring you enjoy the purest and most natural experience. At Organic Aura, we believe in nurturing both your well-being and the environment,
            sourcing products responsibly and supporting sustainable farming practices. Discover the essence of nature in every product, and join us
            in creating a greener, healthier future for generations to come.</p>

          <p>At Organic Aura, we are passionate about bringing you closer to nature with our wide range of organic and eco-friendly products.
            Our goal is to inspire healthier choices by offering items that are not only good for you but also gentle on the environment.
            From farm-fresh organic foods to sustainable lifestyle products, every item is carefully selected to meet the highest standards of quality
            and purity. With Organic Aura, you’re not just choosing a product—you’re choosing a commitment to health, sustainability, and a better future for all.</p>

          <b className='text-gray-800'>Our Mission</b>
          <p>At Organic Aura, our mission is to offer high-quality organic products that promote health and sustainability.
            We are committed to providing chemical-free options while supporting ethical farming practices, helping you make natural choices
            that benefit both your well-being and the planet.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>At Organic Aura, we ensure all products meet the highest standards of quality, guaranteeing purity,
            safety, and sustainability for your health and the environment.</p>
        </div>

        {/* Remove this extra opening div */}
        {/* <div className='flex flex-col md:flex-row text-sm mb-20'> */}

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Organic Aura offers the convenience of easy access to premium organic products,
            making it simple for you to choose healthy, sustainable options that fit seamlessly into your lifestyle.</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Organic Aura is committed to delivering exceptional customer service,
            offering prompt and friendly support to ensure a smooth and satisfying experience.</p>
        </div>
      </div>
    <NewsletterBox/>
    </div>
  )
}

export default About
