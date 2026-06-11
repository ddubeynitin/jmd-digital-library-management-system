import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import StudentDashboard from './pages/client/StudentDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import StudentAttendancePage from './pages/client/StudentAttendancePage'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/attendance" element={<StudentAttendancePage/>} />
        <Route path="/admin/dashboard" element={<AdminDashboard/>} />
      </Routes>
    </Router>
  )
}

export default App
