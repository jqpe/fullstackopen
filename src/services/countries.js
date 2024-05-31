import axios from 'axios'

const API_ENDPOINT = 'https://studies.cs.helsinki.fi/restcountries/api/'

export const getAll = () => {
  return axios.get(new URL('all', API_ENDPOINT))
}

const countriesService = { getAll }
export default countriesService
