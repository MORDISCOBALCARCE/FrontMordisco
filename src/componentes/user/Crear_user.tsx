import { useState } from "react"
import { enviarDatos } from "./service"
import { useNavigate } from "react-router-dom"


export function Crear_user() {
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [email, setEmail] = useState('')
    const [telefono, setTelefono] = useState('')
    const [password, setPassword] = useState('')
    const [mensage, setMensage] = useState('')

    const navigate = useNavigate()


    const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        try {
            const usuario = { nombre, apellido, telefono, password, email }
            await enviarDatos(usuario);
            alert('Usuario creado con éxito');
            navigate('/login')

        } catch (error) {
            console.error(error)
            setMensage('Hubo un error al registrar el usuario');
            return
        }
    }


    return (
        <section className='login-container'>
            <p>{mensage}</p>
            <article className="login-box">
                <h2>Crear Cuenta</h2>
                <form className='login-form' onSubmit={handleSubmit}>
                    <label>Nombre</label>
                    <input type="text" name="nombre" value={nombre} onChange={(e) => { setNombre(e.target.value) }} placeholder="Ingresar nombre"/>

                    <label>Apellido</label>
                    <input type="text" name="apellido" value={apellido} onChange={(e) => { setApellido(e.target.value) }} placeholder="Ingresar apellido" />

                    <label>Mail</label>
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="@e-mail" />

                    <label>Contraseña</label>
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />

                    <label>Telefono</label>
                    <input type="text" name="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="+54..." />

                    <button type='submit'>Crear</button>
                </form>
            </article>
        </section>

    )
}