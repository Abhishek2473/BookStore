import { useState } from 'react'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
// import About from './pages/About'
// import Profile from './pages/Profile'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
<BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        {/* <Route path='/about' element={<About />} />
       
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
     
        </Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
