import {create} from "zustand"

const storedIsLogged = localStorage.getItem("isLoggedIn") === "true"
const storedUser = localStorage.getItem("user")

export const useAuthStore = create((set) => ({

    //Estado inicial
    isLoggedIn: storedIsLogged,
    user: storedUser ? JSON.parse(storedUser) : null,

    //Acciones
    login: (user) => {
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("user", JSON.stringify(user))
      set ({ isLoggedIn: true , user})
    },
    logout: () => {
      localStorage.removeItem("isLoggedIn")
      localStorage.removeItem("user")
      set ({isLoggedIn: false , user: null})
    }

}))