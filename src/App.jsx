import './App.css'
import Register from './pages/Register';
import Login from './pages/Login';
import Pre_exam from './pages/Pre_exam';
import Exam from './pages/Exam';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/precbt" element={<Pre_exam />} />
          <Route path="/exam" element={<Exam />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
