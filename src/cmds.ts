import type { CLICommand } from "./state.js";
import { cmdExit } from "./cmd_exit.js";
import { cmdHelp } from "./cmd_help.js";
import { cmdMap } from "./cmd_map.js";

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
        }
    }
}
