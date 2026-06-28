import { useEffect, useState } from "react";
import type { FetchState, Local, respGet } from "../../../types/type";
import { getLocal } from "../../../servicio/service";
import { useApi } from "../../../hooks/useApi";

export function useLocales() {
    const [state, setState] = useState<FetchState<respGet<Local>>>({ status: 'idle' })
    const { fetchAuth } = useApi();

    useEffect(() => {
        const controller = new AbortController();
        setState({ status: 'loading' });

        const todosLocales = async () => {

            try {
                const resp = await getLocal(fetchAuth, controller);
                setState({ status: 'success', data: resp })

            } catch (error) {
                if (error instanceof Error && error.name === 'AbortError') {
                    return;
                }
                setState({ status: 'error', error: 'Error al cargar locales' })
            }
        }
        todosLocales()
        return () => { controller.abort() }

    }, [])

    return { state }

}