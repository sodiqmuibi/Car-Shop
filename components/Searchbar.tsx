'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import {Manufacturer} from './index'
import { useRouter } from 'next/navigation'

const SearchButton = ({other}: {other: string}) => (
  <button type='submit' className={`-ml-3 z-10 ${other}`}>
    <Image src='/magnifying-glass.svg'
      alt='glass' width={40}
      height={40} className='object-contain'/>
  </button>
)
const Searchbar = () => {
    const [manufacturer, setManufacturer] = useState('')
    const [model, setModel] = useState('')
    const router = useRouter()


    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (manufacturer === '' && model === '') {
        return alert('Car Manufacturer and Model empty')
      }
      updateSearch(model.toLowerCase(), manufacturer.toLowerCase())
    }

    const updateSearch = (model: string, manufacturer: string) => {
      const searchParams = new URLSearchParams(window.location.search)

      if (model) {
        searchParams.set('model', model)
      } else {
        searchParams.delete('model')
      }

      if (manufacturer) {
        searchParams.set('manufacturer', manufacturer)
      } else {
        searchParams.delete('manufacturer')
      }

      const newPath = `${window.location.pathname}?${searchParams.toString()}`
      router.push(newPath)
    }

  return (
    <form className='searchbar' onSubmit={handleSearch}>
      <div className='searchbar__item'>
        <Manufacturer 
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}/>
        <SearchButton other='sm:hidden'/>
      </div>
      <div className='searchbar__item'>
        <Image src='/model-icon.png'
         alt='model' width={40}
         height={40} className='object-contain'/>
        <input type='text' 
          name='model' 
          value={model} 
          onChange={(e) => setModel(e.target.value)}
          placeholder='Tiguian'
          className='searchbar__input'/>
        <SearchButton other='sm:hidden'/>
      </div>
      <SearchButton other='max-sm:hidden'/>
    </form>
  )
}

export default Searchbar
