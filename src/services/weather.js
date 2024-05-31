// see https://openweathermap.org/api/one-call-3

import axios from 'axios'

const API_ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather'

export const getWeather = ({ lat, lon }) => {
  const searchParams = new URLSearchParams({
    lat,
    lon,
    appid: import.meta.env.VITE_WEATHER_KEY,
    units: 'metric'
  })
  const weatherUrl = `${API_ENDPOINT}?${searchParams}`

  return axios.get(weatherUrl)
}

const weatherService = { getWeather }

export default weatherService
