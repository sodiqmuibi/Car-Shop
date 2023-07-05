'use client'
import React, { Fragment, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Listbox, Transition } from '@headlessui/react'
import { CustomFilterProps } from '@/types'

const CustomFilter = ({title, options}: CustomFilterProps) => {
  const [selected, setSelected] = useState(options[0])
  const router = useRouter()

  const updateParam = (e: {title: string, value: string}) => {
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set(title, e.value.toLowerCase())
    const newPath = `${window.location.pathname}?${searchParams.toString()}`
    router.push(newPath)
  }
  return (
    <div className='w-fit'>
      <Listbox value={selected} onChange={(e) => {setSelected(e); updateParam(e)}}>
        <div className='relative w-fit z-10'>
          <Listbox.Button className='custom-filter__btn'>
            <span className='block truncate'>{selected.title}</span>
            <Image 
              src='/chevron-up-down.svg' alt='up-down'
              width={20} height={20}
              className='ml-4 object-contain'/>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
              <Listbox.Options className='custom-filter__options'>
                {options.map((option) => (
                  <Listbox.Option key={option.title} value={option}>
                    {({active}) => (
                      <li className={`${active ? 'bg-primary-blue text-white' : 'text-gray-900'}`}>
                        {option.title}
                      </li>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default CustomFilter
