import axios from 'axios'
const API_ENDPOINT = 'http://localhost:3001/persons'

export const getAll = () => {
  return axios.get(API_ENDPOINT)
}

export const create = newObject => {
  return axios.post(API_ENDPOINT, newObject)
}

export const remove = id => {
  return axios.delete([API_ENDPOINT, id].join('/'))
}

const personService = { getAll, create, remove }

export default personService
