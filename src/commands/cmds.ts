import type { CLICommand } from "../state.js";
import { cmdExit } from "./cmd_exit.js";
import { cmdHelp } from "./cmd_help.js";
import { cmdMap } from "./cmd_map.js";
import { cmdMapb } from "./cmd_mapb.js";
import { cmdExplore } from "./cmd_explore.js";

export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            desc: "Exits the pokedex",
            callback: cmdExit
        },

        help: {
            name: "help",
            desc: "Displays a helpful message",
            callback: cmdHelp
        },

        map: {
            name: "map",
            desc: "Displays 20 next locations",
            callback: cmdMap
        },

        mapb: {
            name: "mapb",
            desc: "Display 20 previous locations",
            callback: cmdMapb
        },

        explore: {
            name: "explore",
            desc: "Lists the pokemons in the specified area (provide location name)",
            callback: cmdExplore
        }
    }
}
