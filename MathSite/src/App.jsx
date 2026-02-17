import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import ProgramsPage from './pages/ProgramsPage.jsx'
import Grade9Page from './pages/Grade9Page.jsx'
import Grade12Page from './pages/Grade12Page.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/programs" element={<ProgramsPage />} />
      <Route path="/programs/grade-9" element={<Grade9Page />} />
      <Route path="/programs/grade-12" element={<Grade12Page />} />
    </Routes>
  )
}

export default App
