import { create } from 'apisauce'

const api = create({
  baseURL: process.env.API_BASE_URL || 'YOUR_LOCAL_IP',
})

export {api};