
import { useAuth } from "../../context/AuthContex"
import { FormProductPost } from "../../componentes/formularioProductos/FormProductPost";


export function MiLocal() {
  const { user } = useAuth();

  return (
    <>
      <h1>Mi Local : {user?.nombre}</h1>

    <FormProductPost />

    </>

  )
}