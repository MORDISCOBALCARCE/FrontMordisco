import { useEffect, useState } from "react";
import {  type FetchState, type Productos, type respGet } from "../types/type";
import { getDataPro } from "../servicio/service";

export function useProductos(){
    const[state, setState] = useState<FetchState<respGet<Productos>>>({status:'idle'})

    useEffect(()=>{
        const controller = new AbortController();
        setState({status:'loading'});
        
        const getProductos = async () =>{

            try {
                const resp = await getDataPro(controller)
                setState({status: 'success', data: resp})

            } catch (error) {
                    if (error instanceof Error && error.name === 'AbortError') {
                    return;
                }
                setState({ status: 'error' })
                return;
            }
        }
        getProductos()
        return ()=> {controller.abort()}
    },[])

    return {state}
}