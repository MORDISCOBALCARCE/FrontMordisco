import { useAuth } from '../context/AuthContex';

export function useApi(){
    const { token, logout } = useAuth();
    
    const fetchAuth = async (url: string, options: RequestInit = {}) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            ...options.headers, // Fusiona headers correctamente si es que vienen en options
        };

        // Separamos headers para no duplicarlos en el objeto final
        const { headers: _, ...restOptions } = options;

        const resp = await fetch(url, {
            ...restOptions,
            headers
        });

        if (resp.status === 401 || resp.status === 403) {
            logout();
            throw new Error('Token expirado o inválido');
        }
        return resp;
    };

    return { fetchAuth };
}
