import { type EvolutionChain, type Pokemon, type PokemonSpecies, type Move } from 'pokedex-promise-v2';

async function fetchAs<T>(fetch: Function, url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) throw new Error(response.statusText);

    return await response.json() as T;
}

export async function load({params, fetch, setHeaders}) {
    const pokemon        = await fetchAs<Pokemon       >(fetch, "https://pokeapi.co/api/v2/pokemon/" + params.name);
    const species        = await fetchAs<PokemonSpecies>(fetch, pokemon.species.url);
    const evolutionChain = await fetchAs<EvolutionChain>(fetch, species.evolution_chain.url);
    const moves          = await Promise.all(
        pokemon.moves.map(element => fetchAs<Move>(fetch, element.move.url))
    );
    
    setHeaders({
        "cache-control": "public, max-age=604800", //7 days
    });

    return {
        pokemon       : pokemon       , 
        species       : species       , 
        evolutionChain: evolutionChain, 
        moves         : moves         , 
    };
}
