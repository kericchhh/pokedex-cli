import type { State } from "./state.js";

export function cmdHelp(state: State) {
    console.log()
    console.log("Welcome to the Pokedex!")
    console.log("Available commands: ")
    console.log()
    for(const cmd of Object.values(state.commands)){
        console.log(`  ${cmd.name}:    ${cmd.desc}`)
    }
    console.log()
}
