import { State } from "./state.js"

export function cleanInput(input:string): string[] {
    const arr = input.toLowerCase().split(" ")
    const trimmed = arr.map(s => s.trim())
    return trimmed.filter(s => s!="")
}

export function startRepl(state: State) {
    state.readline.prompt() 

    state.readline.on('line', async (input:string) => {
        const clean = cleanInput(input)
        
        if(clean.length === 0){
            state.readline.prompt()
            return
        }
        
        const cmdName = clean[0]
        const cmd = state.commands[cmdName]
        if (!cmd){
            console.log(`Unknown command: "${cmdName}". Type "help" for a list of commands.`)
            state.readline.prompt()
            return
        }

        try{
           await cmd.callback(state)
        }catch (e) {
            console.log(e)
        }

        state.readline.prompt()
    })
}
