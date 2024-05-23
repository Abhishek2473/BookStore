import { useState } from 'react'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
// import About from './pages/About'
// import Profile from './pages/Profile'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookDetails from './components/Book';
import AllBooks from './components/AllBooks';
import ReadingList from './components/ReadingList';
function App() {

  return (
<BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/books" element={<AllBooks />} />
        <Route path="/reading/:userId" element={<ReadingList />} />

        {/* <Route path='/about' element={<About />} />
       
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
     
        </Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
