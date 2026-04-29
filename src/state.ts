import { createInterface, Interface } from "node:readline"
import { getCommands } from "./cmds.js"
import { PokeAPI } from "./pokeapi.js"

export type CLICommand = {
    name: string,
    desc: string,
    callback: (state: State) => Promise<void>
}
export type State = {
    readline: Interface,
    commands: Record<string, CLICommand>,
    pokeapi: PokeAPI,
    nextLocationsURL: string | null,
    prevLocationsURL: string | null
}

export function initState(): State {
    const rl = createInterface({
        input:process.stdin,
        output:process.stdout,
        prompt: "Pokedex > "
    })
    return {
        readline: rl,
        commands: getCommands(),
        pokeapi: new PokeAPI(),
        nextLocationsURL: null,
        prevLocationsURL: null
    }
}
