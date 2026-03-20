import { Link } from "../components/Link";
import styles from "./header.module.css";
import { useAuthStore } from '../store/authStore'


export function Header() {

  const {isLoggedIn , logout} = useAuthStore()

  const handleLogout = async (e) =>{
    e.preventDefault();

    const response = await fetch('http://localhost:1234/logout' , {
      method: 'POST',
      credentials: 'include', 
    })

if (response.ok) {
    logout();
  }



  
  }


  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9b261c"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 7m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
              <path d="M6 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
              <path d="M8.6 8.6l10.4 10.4" />
              <path d="M8.6 15.4l10.4 -10.4" />
            </svg>

            <span>Lumiere Hair Studio</span>
          </div>

          <nav className={styles.nav}>
            <Link to="/services"> Services </Link>
            <Link to="/"> Home </Link>
            <Link to="/private/dashboard"> Mis Turnos </Link>
            {
              isLoggedIn ?
              (
                 <button onClick={handleLogout} > Logout</button>
              ) :
              (
               <Link to="/login"> Login </Link>
              )
            }

          </nav>

          {/* Botón */}
          <a href="#" className={styles.button}>
            Reservar cita
          </a>
        </div>
      </header>
    </>
  );
}
