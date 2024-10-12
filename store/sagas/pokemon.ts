import { getPokemonsRequest, getPokemonByIdRequest } from '../../apis/pokemon';

export const getPokemons = () => {
	return new Promise((resolve, reject) => {
		try {
			getPokemonsRequest().then((res) => {
				if (res.status === 200) {
					console.log(res);
					resolve(res.data);
				} else {
				}
			});
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};

export const getPokemonById = (id: string) => {
	return new Promise((resolve, reject) => {
		try {
			getPokemonByIdRequest(id).then((res) => {
				if (res.status === 200) {
					resolve(res.data);
				}
			});
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};
