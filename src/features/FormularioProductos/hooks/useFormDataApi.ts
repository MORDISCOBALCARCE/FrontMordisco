
import { useAuth } from "../../../context/AuthContext/AuthContext";

export function useApiForm(){
    const {token, logout} = useAuth();
    const fetchAuthMedia = async (url: string, formData: FormData) => {

        const resp = await fetch(url,{
            method: 'POST',
            headers: {
                Authorization : `Bearer ${token}`
            },
            body : (formData)
        })

        if(resp.status === 401 || resp.status === 403 ){
            logout()
            throw new Error('Token expirados, no tienes permisos de acceso')
        }

        return resp
    }
    return {fetchAuthMedia} //usamos este fetch para enviar imagenes a la base de datos
}