'use client'
import { CarProps } from '@/types'
import { calculatePrice, generateCarImage } from '@/utils'
import React, { useState } from 'react'
import Image from 'next/image'
import CustomButton from './CustomButton'
import CarDetails from './CarDetails'

interface CarCardProps {
    car: CarProps
}
const CarCard = ({car}: CarCardProps) => {
    const price = calculatePrice(car.city_mpg, car.year)
    const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='car-card group'>
      <div className='car-card__content'>
        <h2 className='car-card__content-title'>{car.make} {car.model}</h2>
      </div>
      <p className='flex mt-6 text-[32px] font-extrabold'>
        <span className='self-start text-[14px] font-semibold'>
            $
        </span>
        {price}
        <span className='self-end text-[14px]'>/day</span>
      </p>
      <div className='relative w-full h-40 my-3'>
        <Image src={generateCarImage(car)} alt='car' fill priority className='object-contain'/>
      </div>
      <div className='relative flex w-full'>
        <div className='flex group-hover:invisible w-full justify-between text-gray'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <Image src='/steering-wheel.svg' alt='steering' width={20} height={20}/>
            <p className='text-[14px]'>
              {car.transmission === 'a' ? 'Automatic' : 'Manual'}
            </p>
          </div>
          <div className='flex flex-col justify-center items-center gap-2'>
            <Image src='/tire.svg' alt='steering' width={20} height={20}/>
            <p className='text-[14px]'>
              {car.drive.toUpperCase()}
            </p>
          </div>
          <div className='flex flex-col justify-center items-center gap-2'>
            <Image src='/gas.svg' alt='steering' width={20} height={20}/>
            <p className='text-[14px]'>
              {car.city_mpg} MPG
            </p>
          </div>
        </div>
        <div className='car-card__btn-container'>
          <CustomButton 
            title='View More'
            containerStyles='w-full py-[16px] rounded-full bg-primary-blue text-white text-[14px] leading-[17px] font-bold'
            rightIcon='/right-arrow.svg'
            handleClick={() => setIsOpen(true)}/>
        </div>
      </div>
      {isOpen && (
        <CarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car}/>
      )}
    </div>
  )
}

export default CarCard
