import { State } from "../state.js";

export async function cmdInspect(state: State, ...args: string[]) {
    if(args.length !== 1){
        throw new Error("Please provide a pokemon name!")
    }
    const name = args[0]
    const pokemon = state.pokemons[name]
    if(pokemon){
        console.log(`Name: ${pokemon.name}`)
        console.log(`Height: ${pokemon.height}`)
        console.log(`Stats: `)
        for(const stat of pokemon.stats){
            console.log(`  -${stat.stat.name}: ${stat.base_stat}`)
        }
        console.log(`Types: `)
        for(const type of pokemon.types){
            console.log(`  - ${type.type.name}`)
        }
    }
    else{
        console.log("This pokemon was not caught yet!")
    }
    
}
