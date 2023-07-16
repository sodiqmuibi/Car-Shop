'use client'
import { CustomFilter, Hero, Searchbar } from "@/components";
import CarCard from "@/components/CarCard";
import ShowMore from "@/components/ShowMore";
import { fuels, yearsOfProduction } from "@/data";
import { fetchCars } from "@/utils";
import { useEffect, useState } from "react";

export default function Home() {
  const [allCars, setAllCars] = useState([])
  const [manufacturer, setManufacturer] = useState('')
  const [model, setModel] = useState('')
  const [year, setYear] = useState(2022)
  const [limit, setLimit] = useState(10)
  const [fuel, setFuel] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const getCars = async () => {
    setIsLoading(true)
    try{
      const cars = await fetchCars({
        manufacturer: manufacturer,
        model: model,
        year: year,
        limit: limit,
        fuel: fuel
      })
      setAllCars(cars)
    } catch(error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  
  useEffect(() => {
    getCars()
  }, [manufacturer, model, year, limit, fuel])
  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the car you might like</p>
        </div>
        <div className="home__filters">
          <Searchbar setModel={setModel} setManufacturer={setManufacturer}/>
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} setFuelorYear={setFuel}/>
            <CustomFilter title="year" options={yearsOfProduction} setFuelorYear={setYear}/>
          </div>
        </div>
        {isLoading && (
          <div>Loading....</div>
        )}
        {allCars.length > 0 ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => (
                <CarCard car={car}/>
              ))}
            </div>
            <ShowMore pageNumber={(limit || 10) / 10}
              isNext={(limit || 10) > allCars.length} setLimit={setLimit}/>
          </section>
        ): (
          <div className="home__error-container">
            <div className="text-black text-xl font-bold">Oops no result</div>
          </div>
        )}
      </div>
    </main>
  )
}
