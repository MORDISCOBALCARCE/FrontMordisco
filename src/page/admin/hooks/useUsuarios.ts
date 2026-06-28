import { useEffect, useState } from "react";
import type { FetchState, respGet, User } from "../../../types/type";
import { getUser } from "../../../servicio/service";
import { useApi } from "../../../hooks/useApi";

export function useUsuarios() {
    const [state, setState] = useState<FetchState<respGet<User>>>({ status: 'idle' })
    const { fetchAuth } = useApi();

    useEffect(() => {
        const controller = new AbortController();
        setState({ status: 'loading' });

        const todosUsuarios = async () => {

            try {
                const resp = await getUser(fetchAuth, controller);
                setState({ status: 'success', data: resp })

            } catch (error) {
                if (error instanceof Error && error.name === 'AbortError') {
                    return;
                }
                setState({ status: 'error', error: 'Error al cargar usuarios' })
            }
        }
        todosUsuarios()
        return () => { controller.abort() }

    }, [])

    return { state }

}