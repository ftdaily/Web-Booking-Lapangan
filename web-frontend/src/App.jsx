import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
// import { Button } from './components/Button.jsx';
import {Front} from './Page/Front.jsx';
import Navbar from "./components/Navbar";
import Login from './Page/Login.jsx';
import Register from './Page/Register.jsx';
function App() {

  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Front />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
