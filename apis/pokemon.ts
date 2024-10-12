import { api } from './api';

export const getPokemonsRequest = () =>
  api.get('/pokemons');

export const getPokemonByIdRequest = (id: string) =>
  api.get(`/pokemons/${id}`);
