import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Lifecycle from './components/Lifecycle'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/lifecycle" element={<Lifecycle />} />
    </Routes>
  )
}

export default App
