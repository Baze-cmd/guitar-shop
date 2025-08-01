import { Musician } from "./Musician"
import { Specs } from "./Specs"

export type Model = {
    id: string
    name: string
    type: string
    image: string
    description: string
    price: number
    specs: Specs
    musicians: Musician[]
}
