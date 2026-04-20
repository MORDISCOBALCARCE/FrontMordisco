import {type Producto } from "../componentes/promociones/promociones.types"
import { productosMock } from "../data/productos.data"
import { Card } from "../componentes/menu/card"

export function useSearch(search:string){
    let prods = productosMock.filter((prod:Producto)=> prod.titulo.includes(search))
    let cards = prods.map(prod=>{return <Card key={prod.id} producto={prod}/>})
    return cards
}

export function useFilter(cat:string){
    let prods = productosMock.filter((prod:Producto)=> {prod.titulo.includes(cat)})
    let cards = prods.map(prod=>{return <Card key={prod.id} producto={prod}/>})
    return cards
}

export function useLoad(){
    let cards = productosMock.map(prod=>{return <Card key={prod.id} producto={prod}/>})
    return cards
}
