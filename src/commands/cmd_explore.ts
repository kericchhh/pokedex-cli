import { State } from "../state.js";

export async function cmdExplore (state: State, ...id: string[]) {
    if(id.length !== 1){
        throw new Error("Please provide a location name")
        
    }
    const name = id[0]
    const location = await state.pokeapi.fetchLocation(name)
    const pokemons = location.pokemon_encounters
    console.log(`Exploring ${id}...`)
    console.log("Found Pokemon:")
    for(const pokemon of pokemons){
        console.log(`- ${pokemon.pokemon.name}`)
    }
}
