import { State } from "../state.js";
export async function cmdCatch(state:State, ...args: string[]) {
   if(args.length !== 1){
       throw new Error("Please specify a name of a Pokemon to catch")
   } 

    const name = args[0]
    const pokemon = await state.pokeapi.fetchPokemon(name)
    const chanceToCatch = () => {
        if(pokemon.base_experience < 100){
            return 10 / pokemon.base_experience
        }
        else if(pokemon.base_experience > 100 && pokemon.base_experience < 500){
            return 100 / pokemon.base_experience
        }
        else{
            return 900 / pokemon.base_experience
        }
    }
    console.log(`Throwing a Pokeball at ${name}`)
    if(Math.random() < chanceToCatch()){
        console.log(`${name} was caught!`)
    }
    else{
        console.log(`${name} escaped!`)
    }
}
