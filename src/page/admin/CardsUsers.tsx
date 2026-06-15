import type { User } from "../../types/type";
import './style.css'

interface props{
    usuario : User
}

export function CardsUsers({usuario}:props){
    
    return(
        <article className="cont-card">
        <p><strong>Nombre: </strong>{usuario.nombre}</p>
        <p><strong>Apellido:</strong> {usuario.apellido}</p>
        <p><strong>Email:</strong> {usuario.email}</p>
        </article>
    )
}