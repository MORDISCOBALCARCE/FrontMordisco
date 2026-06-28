
import { useAuth } from "../context/AuthContex";

export function useApiForm(){
    const {token, logout} = useAuth();
    const fetchAuth2 = async (url: string, formData: FormData) => {

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
    return {fetchAuth2} //usamos este fetch para enviar imagenes a la base de datos
}