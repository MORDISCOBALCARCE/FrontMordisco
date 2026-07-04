import { useEffect, useState } from "react";
import type { FetchState, User } from "../../../types/type";
import { getUser } from "../../../servicio/service";
import { useApi } from "../../../hooks/useApi";

export function useUsuariosAdmin() {
  const [state, setState] = useState<FetchState<{ data: User[] }>>({ status: 'idle' });
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const { fetchAuth } = useApi();

        const cargarUsuarios = async (signal?: AbortSignal) => {
            try {
            const resp = await getUser(fetchAuth, { signal } as any);
            setState({ status: 'success', data: resp });
            setUsuarios(resp.data);
            } catch (error) {
            if (error instanceof Error && error.name === 'AbortError') return;
            setState({ status: 'error', error: 'Error al cargar usuarios' });
            }
        };

        useEffect(() => {
            const controller = new AbortController();
            setState({ status: 'loading' });
            cargarUsuarios(controller.signal);
            return () => controller.abort();
        }, []);

        const agregarUsuarioLocal = (nuevoUsuario: User) => {
            setUsuarios((prev) => [nuevoUsuario, ...prev]);
        };

        const actualizarUsuarioLocal = (id: number, cambios: Partial<User>) => {
            setUsuarios((prev) =>
            prev.map((u) => (u.id_usuario === id ? { ...u, ...cambios } : u))
            );
        };

        const desactivarUsuarioLocal = (id: number) => {
            setUsuarios((prev) =>
            prev.map((u) => (u.id_usuario === id ? { ...u, activo: false } : u))
            );
        };

        const activarUsuarioLocal = (id: number) => {
            setUsuarios((prev) =>
            prev.map((u) => (u.id_usuario === id ? { ...u, activo: true } : u))
            );
        };

        return {
            state,
            usuarios,
            agregarUsuarioLocal,
            actualizarUsuarioLocal,
            desactivarUsuarioLocal,
            activarUsuarioLocal,
            recargar: () => cargarUsuarios()
        };
}