import { State } from "../state.js";
export async function cmdCatch(state:State, ...args: string[]) {
   if(args.length !== 1){
       throw new Error("Please specify a name of a Pokemon to catch")
   } 

    const name = args[0]
    try{
        const pokemon = await state.pokeapi.fetchPokemon(name)
        const chanceToCatch = () => {
            const base = 20 / (pokemon.base_experience ** 0.75) 
            return Math.min(base, 0.93)
        }
        console.log(`Throwing a Pokeball at ${name}...`)
        if(Math.random() < chanceToCatch()){
            console.log(`${name} was caught!`)
            state.pokemons[name] = pokemon
        }
        else{
            console.log(`${name} escaped!`)
        }
    }catch {
        throw new Error("Something went wrong...Check if you spelled the pokemon name correctly")
        
    }
}
