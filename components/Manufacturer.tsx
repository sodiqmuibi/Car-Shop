'use client'
import { ManufacturerProps } from '@/types'
import { Combobox, Transition } from '@headlessui/react'
import Image from 'next/image'
import { manufacturers } from '@/data'
import { Fragment, useState } from 'react'

const Manufacturer = ({manufacturer, setManufacturer}: ManufacturerProps) => {
    const [query, setQuery] = useState('')
    const filteredCar = query === '' ? manufacturers : manufacturers.filter((car) => {
        return car.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, ""))
    }) 
  return (
    <div className='search-manufacturer'>
      <Combobox value={manufacturer} onChange={setManufacturer}>
        <div className='relative w-full'>
            <Combobox.Button className='absolute top-[14px]'>
                <Image src='/car-logo.svg' alt='car logo' width={20} height={20}/>
            </Combobox.Button>
            <Combobox.Input 
             className="search-manufacturer__input"
             placeholder='Volkswagen'
             displayValue={(carManufacturer: string) => carManufacturer}
             onChange={(e) => setQuery(e.target.value)}/>
            <Transition 
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
              afterLeave={() => setQuery('')}>
                <Combobox.Options>
                    {filteredCar.map((car) => (
                        <Combobox.Option key={car} value={car} className="relative search-manufacturer__option">
                            {({active}) => (
                                <li className={`${active ? 'bg-primary-blue text-white' : 'text-gray-900'}`}>
                                    {car}
                                </li>
                            )}
                        </Combobox.Option>
                    ))}
                </Combobox.Options>
            </Transition>
        </div>
      </Combobox>
    </div>
  )
}

export default Manufacturer
