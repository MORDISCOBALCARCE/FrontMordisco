import type { User } from "./context/type";
const Url_Base = 'http://localhost:3000';

export async function fetchUsuarios(fetchAuth: Function): Promise<User> {
    const resp = await fetchAuth(`${Url_Base}/usuarios`);
    if(!resp.ok) throw new Error
    const data = await resp.json()
    return data
}