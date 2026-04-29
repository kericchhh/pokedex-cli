import { State } from "../state.js";

export async function cmdExplore (state: State, ...args: string[]) {
    if(args.length !== 1){
        throw new Error("Please provide a location name")
        
    }
    const name = args[0]
    const location = await state.pokeapi.fetchLocation(name)
    const pokemons = location.pokemon_encounters
    console.log(`Exploring ${args}...`)
    console.log("Found Pokemon:")
    for(const pokemon of pokemons){
        console.log(`- ${pokemon.pokemon.name}`)
    }
}
