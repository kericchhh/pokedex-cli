import type { State } from "./state.js";

export async function cmdMap(state:State) {
    const data = await state.pokeapi.fetchLocations()
    state.nextLocationsURL = data.next
    state.prevLocationsURL = data.previous
    for(const location of data.results){
        console.log(location.name)
    }
}
