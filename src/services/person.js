import axios from 'axios'
const API_ENDPOINT = 'http://localhost:3001/api/persons'

export const getAll = () => {
  return axios.get(API_ENDPOINT)
}

export const create = newObject => {
  return axios.post(API_ENDPOINT, newObject)
}

export const remove = id => {
  return axios.delete([API_ENDPOINT, id].join('/'))
}

export const update = person => {
  return axios.put([API_ENDPOINT, person.id].join('/'), person)
}

const personService = { getAll, create, remove, update }

export default personService
