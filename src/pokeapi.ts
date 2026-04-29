import {z} from "zod"
import { Cache } from "./pokecache.js"

const cache = new Cache(5 * 60 * 1000)

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2"

    constructor() {}

    async fetchLocations(pageURL? : string): Promise<ShallowLocations> {
        const url = pageURL ?? `${PokeAPI.baseURL}/location-area`
        const cached = cache.get<ShallowLocations>(url)
        if(cached) {
            return cached
        }
        try {
            
            const res = await fetch(url)
            if(!res.ok){
                throw new Error(`HTTP error: ${res.status}`)
            }
            const data = await res.json()
            const parsed = ShallowLocationsSchema.parse(data)
            cache.add(url, parsed)
            return parsed
            
        } catch (e) {
            console.log(e)
            throw e
        }
    }

    async fetchLocation(locationName: string): Promise<Location> {
        try {
            const res = await fetch(`${PokeAPI.baseURL}/location-area/${locationName}`)
            if(!res.ok){
                throw new Error(`HTTP error: ${res.status}`)
                
            }
            const data = await res.json()
            return LocationSchema.parse(data)
        } catch (e) {
            console.log(e)
            throw e
        }
    }
}

const ShallowLocationsSchema = z.object({
    count : z.number(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
    results: z.array(z.object({
        name: z.string(),
        url: z.string()
    }))
})

export type ShallowLocations = z.infer<typeof ShallowLocationsSchema> 

const LocationSchema = z.object({
    encounter_method_rates : z.array(z.object({
        encounter_method: z.object({
            name: z.string(),
            url: z.string()
            }),
        version_details: z.array(z.object({
            rate: z.number(),
            version: z.object({
                name: z.string(),
                url: z.string()
            })
        }))
    })),
    game_index: z.number(),
    id: z.number(),
    location: z.object({
        name: z.string(),
        url: z.string()
    }),
    name: z.string(),
    names: z.array(z.object({
        language: z.object({
            name: z.string(),
            url: z.string()
        }),
        name: z.string()
    })),
    pokemon_encounters: z.array(z.object({
        pokemon: z.object({
            name: z.string(),
            url: z.string()
        }),
        version_details: z.any()
    }))
})    

export type Location = z.infer<typeof LocationSchema> 


