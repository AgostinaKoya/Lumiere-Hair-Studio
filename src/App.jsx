import { useState } from 'react'
import {Routes, Route} from 'react-router'
import './index.css'

import {Header} from './components/Header'

import { Login } from './pages/Login'
import { HomePage } from './pages/Home'
import { Services } from './pages/Services'
import { NotFoundPage } from './pages/404'
import { HairCutDetails } from './pages/HairCutDetails'

function App() {


  return (
    <div>
    <Header/>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/services' element={<Services/>}/>
      <Route path='*' element={<NotFoundPage/>}/>
      <Route path="/services/:haircutId" element={<HairCutDetails/>} />
    </Routes>

    </div>
  )
}

export default App
