import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import StudentDashboard from './pages/client/StudentDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import StudentAttendancePage from './pages/client/StudentAttendancePage'
import StudentFeesPage from './pages/client/StudentFeesPage'
import StudentProfilePage from './pages/client/StudentProfilePage'
import LibraryViewPage from './pages/admin/LibraryViewPage'
import SeatRequestsPage from './pages/admin/SeatRequestsPage'
import SeatManagementPage from './pages/admin/SeatManagementPage'
import TotalStudentsDetailsPage from './pages/admin/TotalStudentsDetailsPage'
import AdminLoginPage from './pages/admin/AdminLoginPage'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/attendance" element={<StudentAttendancePage/>} />
        <Route path="/student/fees" element={<StudentFeesPage/>} />
        <Route path="/student/profile" element={<StudentProfilePage/>} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard/>} />
        <Route path="/admin/library-view" element={<LibraryViewPage/>} />
        <Route path="/admin/seat-requests" element={<SeatRequestsPage/>} />
        <Route path="/admin/seat-management" element={<SeatManagementPage/>} />
        <Route path="/admin/total-students" element={<TotalStudentsDetailsPage/>} />
      </Routes>
    </Router>
  )
}

export default App
