import { State } from "../state.js";

export async function cmdPokedex(state: State) {
    const pokemons = state.pokemons
    console.log("Your Pokedex:")
    if(pokemons){
        for(const key of Object.keys(pokemons)){
            console.log(`  - ${key}`)
        }
    }else {
        console.log("You have no caught pokemons!")
    }
}
