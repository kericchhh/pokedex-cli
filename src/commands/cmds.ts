import type { CLICommand } from "../state.js";
import { cmdExit } from "./cmd_exit.js";
import { cmdHelp } from "./cmd_help.js";
import { cmdMap } from "./cmd_map.js";
import { cmdMapb } from "./cmd_mapb.js";
import { cmdExplore } from "./cmd_explore.js";
import { cmdCatch } from "./cmd_catch.js";
import { cmdInspect } from "./cmd_inspect.js";
import { cmdPokedex } from "./cmd_pokedex.js";

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
        },

        catch: {
            name: "catch",
            desc: "Try to catch a specified Pokemon",
            callback: cmdCatch
        },

        inspect: {
            name: "inspect",
            desc: "Inspect the stats of a caught Pokemon",
            callback: cmdInspect
        },

        pokedex: {
            name: "pokedex",
            desc: "List all caught Pokemons",
            callback: cmdPokedex
        }
    }
}
