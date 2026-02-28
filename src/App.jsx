import { useState } from 'react'
import {Routes, Route} from 'react-router'
import './index.css'

import {Header} from './components/Header'

import { Login } from './pages/Login'
import { HomePage } from './pages/Home'
import { Services } from './pages/Services'
import { NotFoundPage } from './pages/404'
import { HairCutDetails } from './pages/HairCutDetails'
import {PageOrderSuccess} from './pages/Success'
import { Register } from './pages/Register'

function App() {


  return (
    <div>
    <Header/>
<Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>  
        
        {/* Primero las rutas específicas de servicios */}
        <Route path='/services' element={<Services/>}/>
        <Route path="/services/:haircutId" element={<HairCutDetails/>} />
        <Route path="/success" element={<PageOrderSuccess/>} />    

        
        {/* El comodín * DEBE ir siempre al final */}
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>

    </div>
  )
}

export default App
