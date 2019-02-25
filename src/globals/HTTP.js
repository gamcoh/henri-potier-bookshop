import axios from 'axios'

const HTTP = axios.create({
  baseURL: 'http://henri-potier.xebia.fr/books',
  headers: {
    Accept: 'application/json'
  }
})

export { HTTP }
