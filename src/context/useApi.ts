import { useAuth } from "./AuthContex";

export function useApi(){
    const {token, logout} = useAuth();
   
    const fetchAuth = async (url: string, options = {})=>{
        const headers = {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`,
            ...options
        }

        const resp = await fetch(url, {...options, headers})

        if(resp.status === 401 || resp.status === 403){
            logout();
            throw new Error ('Token expirado')
        }
        return resp
    }
    return {fetchAuth}
    
}