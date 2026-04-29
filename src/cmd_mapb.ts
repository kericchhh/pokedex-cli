import { State } from "./state.js";

export async function cmdMapb(state: State) {
    if(state.prevLocationsURL === null){
       console.log("You are on the first page")
       console.log()
       return
   }
   const data = await state.pokeapi.fetchLocations(state.prevLocationsURL)
   state.prevLocationsURL = data.previous
   state.nextLocationsURL = data.next
   for(const location of data.results){
       console.log(location.name)
   }
}
