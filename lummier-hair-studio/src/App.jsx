
import {Routes, Route} from 'react-router'
import './index.css'
import {Header} from './components/Header'
// import { useAuthStore } from './store/authStore'
// import { Login } from './public/Login/Login'
// import { HomePage } from './pages/Home'
// import { Services } from './pages/Services'

// import {RoutesWithNotFount} from './components/RoutesWithNotFound'
// import { HairCutDetails } from './pages/HairCutDetails'
// import {PageOrderSuccess} from './pages/Success'
// import { Register } from './public/Register/Register'
// import { PrivateGuard } from './guard/PrivateGuard'
// import { PrivateRouter } from './private/PrivateRoutes/privateRoutes'



function App({children}) {

  return (
    <>
    <Header/>
    {children}

    </>
  )
}

export default App
