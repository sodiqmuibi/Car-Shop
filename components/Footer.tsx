import React from 'react'
import Image from 'next/image'
import { footerLinks } from '@/data'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='flex flex-col border-t border-gray-100 text-black-100 mt-5'>
      <div className='flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10'>
        <div className='flex flex-col justify-start items-start gap-6'>
          <Image src='/logo.svg' alt='logo' width={118} height={18} className='object-contain'/>
          <p className='text-base text-gray-700'>
            Car Hub 2023 <br />
            All rights reserved &copy;
          </p>
        </div>
        <div className='footer__links'>
          {footerLinks.map((item) => (
            <div key={item.title} className='footer__link'>
              <h3 className='font-bold'>{item.title}</h3>
              {item.links.map((link) => (
                <Link href={link.url} key={link.title} className='text-gray-500'>{link.title}</Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className='flex justify-between items-center flex-wrap mt-10 border-t border-gray-100 sm:px-16 px-6 py-10'>
        <p>@2023 All rights reserved</p>
        <Link href='/' className='text-gray-500'>Privacy Policy</Link>
        <Link href='/' className='text-gray-500'>Terms of Use</Link>    
      </div>
    </footer>
  )
}

export default Footer
