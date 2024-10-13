import { create } from 'apisauce'

const api = create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL || 'https://pokedex-api-nestjs.vercel.app/',
})

export {api};