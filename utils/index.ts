import { CarProps, FilterProps } from "@/types"

export async function fetchCars (filters: FilterProps) {
    const {manufacturer, year, model, limit, fuel} = filters
    const headers = {
        'X-RapidAPI-Key': process.env.API_KEY || "",
        'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
    }
    const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=${model}&make=${manufacturer}&limit=${limit}&fuel_type=${fuel}&year=${year}`, {
        headers: headers
    })
    const result = response.json()
    return result
}

export const calculatePrice = (city_mpg: number, year: number) => {
    const basePrice = 50
    const mileage = 0.2
    const age = 0.05
    const mileageRate = city_mpg * mileage
    const ageRate = (new Date().getFullYear() - year) * age
    const rentalRate = basePrice + mileageRate + ageRate
    return rentalRate.toFixed(0)
}

export const generateCarImage = (car: CarProps, angle?: string) => {
    const url = new URL('https://cdn.imagin.studio/getimage')

    const {make, year, model} = car

    url.searchParams.append('customer', process.env.CUSTOMER || "")
    url.searchParams.append('make', make)
    url.searchParams.append('modelFamily', model.split(' ')[0])
    url.searchParams.append('zoomType', 'fullscreen')
    url.searchParams.append('modelYear', `${year}`)
    url.searchParams.append('angle', `${angle}`)
    
    return `${url}`
}