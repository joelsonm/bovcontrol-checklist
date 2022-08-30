import axios from 'axios'

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ENV_VARIABLE,
})

export default http
