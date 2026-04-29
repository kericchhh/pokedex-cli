import { startRepl } from "./repl.js"
import { initState } from "./state.js"

async function main() {
    const state = initState()
    await startRepl(state)
}
main()
