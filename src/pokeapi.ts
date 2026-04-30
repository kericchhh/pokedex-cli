import {z} from "zod"
import { Cache } from "./pokecache.js"
import { version } from "node:os";


export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private cache : Cache
    
    constructor(cacheInterval: number) {
        this.cache = new Cache(cacheInterval)
    }

    closeCache(){
        this.cache.stopReapLoop()
    }

    async fetchLocations(pageURL? : string): Promise<ShallowLocations> {
        const url = pageURL ?? `${PokeAPI.baseURL}/location-area`
        const cached = this.cache.get<ShallowLocations>(url)
        if(cached) {
            return cached
        }
        try {
            
            const res = await fetch(url)
            if(!res.ok){
                throw new Error(`HTTP error: ${res.status}`)
            }
            const data: ShallowLocations = await res.json()
            const parsed = ShallowLocationsSchema.parse(data)
            this.cache.add(url, parsed)
            return parsed
            
        } catch (e) {
            console.log(e)
            throw e
        }
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`
        const cached = this.cache.get<Location>(url)
        if(cached){
            return cached
        }
        try {
            const res = await fetch(url)
            if(!res.ok){
                throw new Error(`HTTP error: ${res.status}`)
                
            }

            const data : Location = await res.json()
            const parsed =  LocationSchema.parse(data)
            this.cache.add(url, data)
            return parsed
        } catch (e) {
            console.log(e)
            throw e
        }
    }

    async fetchPokemon(pokemonName: string): Promise<Pokemon> {
        const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`
        console.log("Fetching url",url)
        const cached = this.cache.get<Pokemon>(url)
        if(cached){
            return cached
        }
        try {
            const res = await fetch(url)
            if(!res.ok){
                throw new Error(`HTTP error: ${res.status}`)
                
            }
            const data : Pokemon = await res.json()
            const parsed = PokemonSchema.parse(data)
            this.cache.add(url,data)
            return parsed
        } catch (e) {
            console.log(e)
            throw e
        }
    }
}

const PokemonSchema = z.object({
    id: z.number(),
    name: z.string(),
    base_experience: z.number(),
    height: z.number(),
    is_default: z.boolean(),
    order: z.number(),
    weight: z.number(), 
    stats: z.array(z.object({
        base_stat: z.number(),
        effort: z.number(),
        stat: z.object({
            name: z.string(),
            url: z.string()
        })
    })),
    types: z.array(z.object({
        slot: z.number(),
        type: z.object({
            name: z.string(),
            url: z.string()
        })
    }))
})

export type Pokemon = z.infer<typeof PokemonSchema>

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


