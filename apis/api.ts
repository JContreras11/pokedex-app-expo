import { create } from 'apisauce'

const api = create({
  baseURL: process.env.API_BASE_URL || 'https://pokedex-api-nestjs.vercel.app/',
})

export {api};