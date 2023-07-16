'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import {Manufacturer} from './index'


interface SearchBarProps {
  setManufacturer: (manufacturer: string) => void,
  setModel: (model: string) => void
}
const SearchButton = ({other}: {other: string}) => (
  <button type='submit' className={`-ml-3 z-10 ${other}`}>
    <Image src='/magnifying-glass.svg'
      alt='glass' width={40}
      height={40} className='object-contain'/>
  </button>
)
const Searchbar = ({setManufacturer, setModel} : SearchBarProps) => {
    const [searchManufacturer, setSearchManufacturer] = useState('')
    const [searchModel, setSearchModel] = useState('')


    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (searchManufacturer === '' && searchModel === '') {
        return alert('Car Manufacturer and Model empty')
      }
      setManufacturer(searchManufacturer)
      setModel(searchModel)
    }

    

  return (
    <form className='searchbar' onSubmit={handleSearch}>
      <div className='searchbar__item'>
        <Manufacturer 
          manufacturer={searchManufacturer}
          setManufacturer={setSearchManufacturer}/>
        <SearchButton other='sm:hidden'/>
      </div>
      <div className='searchbar__item'>
        <Image src='/model-icon.png'
         alt='model' width={40}
         height={40} className='object-contain'/>
        <input type='text' 
          name='model' 
          value={searchModel} 
          onChange={(e) => setSearchModel(e.target.value)}
          placeholder='Tiguian'
          className='searchbar__input'/>
        <SearchButton other='sm:hidden'/>
      </div>
      <SearchButton other='max-sm:hidden'/>
    </form>
  )
}

export default Searchbar
