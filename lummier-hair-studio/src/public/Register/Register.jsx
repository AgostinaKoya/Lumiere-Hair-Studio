import { TurnsSelectContext } from "../../context/TurnsSelectContext";
import { useContext } from "react";
import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useId } from "react";
import { useNavigate } from "react-router";
import styles from './register.module.css'

export function Register (){

    const nameId = useId()
    const emailId = useId()
    const passwordId = useId()

  const { login } = useAuthStore()
  const navigate = useNavigate()


  //   const handleSubmit = () =>{

  //  e.preventDefault()

  //   const formData = new FormData(e.target)
  //   const name = formData.get(nameId)
  //   const email = formData.get(emailId)
  //   const password = formData.get(passwordId)

  //   // Mock register - en una app real, harías una petición a la API
  //   if (name && email && password) {
  //     login()
  //     navigate('/search')
  //   }

  //   }

  //PROBAR... Luego del error de cors..
  const handleSubmit = async (e) => {
  e.preventDefault()

  const formData = new FormData(e.target)

  const name = formData.get(nameId)
  const email = formData.get(emailId)
  const password = formData.get(passwordId)

  try {
    const res = await fetch("http://localhost:1234/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    })

    if (!res.ok) throw new Error("Error en registro")

    // después del register mandamos a login
    navigate("/login")

  } catch (error) {
    console.error(error)
  }
}


    return(
     <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Crear Cuenta</h1>
        <p className={styles.subtitle}>
          Regístrate para aplicar a ofertas de trabajo
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Nombre completo
            </label>
            <input
              id={nameId}
              name={nameId}
              type="text"
              className={styles.input}
              placeholder="Juan Pérez"
              required
            />
          </div>  
          <div className={styles.formGroup}>
            <label htmlFor={emailId} className={styles.label}>
              Email
            </label>
            <input
              id={emailId}
              name={emailId}
              type="email"
              className={styles.input}
              placeholder="tu@email.com"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Contraseña
            </label>
            <input
              id={passwordId}
              name={passwordId}
              type="password"
              className={styles.input}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Crear Cuenta
          </button>
        </form>

        <p className={styles.footer}>
          ¿Ya tienes cuenta?{' '}
          <a href="/login" className={styles.link}>
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </div>
    )
}