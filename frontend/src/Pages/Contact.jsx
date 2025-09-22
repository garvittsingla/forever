import React from 'react'
import Title from '../Components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../Components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center pt-10 border-t border-gray-200 text-2xl'>
      <Title text1={"CONTACT"} text2={"US"}/>
    </div>

    <div className='my-10 flex flex-col justify-center gap-10 md:flex-row mb-28'>
      <img src={assets.contact_img} className='w-full md:max-w-[480px]' />
      <div className='flex flex-col justify-center items-start gap-6'>
        <p className='font-semibold text-xl'>Our Store</p>
        <p className='text-gray-500'>6900 John Point <br />Suite 1317, Meschutstes, USA</p>
        <p className='text-gray-500'>Tel: (725) 696-0854 <br />Email: ketan1317@gmail.com</p>
        <p className='font-semibold text-xl text-gray-600'>Career at Forever</p>
        <p className='text-gray-500'>Learn more about out teams & Job openings</p>
        <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 cursor-pointer'>Explore Jobs</button>
      </div>

    </div>
    <NewsletterBox/>
    </div>
  )
}

export default Contact
