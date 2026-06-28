import { useEffect, useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import SideMenuPanel from '../../components/SideMenuPanel'
import { getSessionUser } from '../../lib/session'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

const StudentDashboard = () => {
  const sessionUser = getSessionUser()
  const studentId = sessionUser?.id
  const [student, setStudent] = useState(null)
  const [booking, setBooking] = useState(null)
  const [attendance, setAttendance] = useState([])
  const [fees, setFees] = useState([])
  const [qrCode, setQrCode] = useState('')

  useEffect(() => {
    const load = async () => {
      if (!studentId) return
      const [studentRes, bookingRes, attendanceRes, feesRes, qrRes] = await Promise.allSettled([
        axios.get(`${API_BASE_URL}/students/student/${studentId}`),
        axios.get(`${API_BASE_URL}/bookings`),
        axios.get(`${API_BASE_URL}/attendance/attendance/student/${studentId}`),
        axios.get(`${API_BASE_URL}/fees/fees/student/${studentId}`),
        axios.get(`${API_BASE_URL}/qr/student/${studentId}`),
      ])

      if (studentRes.status === 'fulfilled') setStudent(studentRes.value.data?.data || null)
      if (bookingRes.status === 'fulfilled') {
        const items = bookingRes.value.data?.data || []
        setBooking(items.find((item) => String(item.studentId?._id || item.studentId) === String(studentId)) || null)
      }
      if (attendanceRes.status === 'fulfilled') setAttendance(attendanceRes.value.data?.data || [])
      if (feesRes.status === 'fulfilled') setFees(feesRes.value.data?.data || [])
      if (qrRes.status === 'fulfilled') setQrCode(qrRes.value.data?.data?.qrCode || '')
    }

    load()
  }, [studentId])

  const paidFees = fees.filter((item) => item.status === 'paid').length
  const pendingFees = fees.filter((item) => item.status === 'unpaid').length
  const latestAttendance = attendance[0]

  if (!sessionUser) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-[1600px] gap-6 px-4 py-6 xl:px-10">
        <SideMenuPanel studentName={student?.name} studentId={student?.studentId} />

        <main className="flex-1 space-y-6">
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/30">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
              Welcome, {student?.name || 'Student'}
            </p>
            <h1 className="mt-2 text-4xl font-semibold text-slate-900">Student Dashboard</h1>
            <p className="mt-2 text-sm text-slate-500">
              {booking ? `Seat #${booking.seatId?.seatNumber || '-'} · ${booking.membershipType}` : 'No active booking yet'}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-4">
            {[
              { label: 'Student ID', value: student?.studentId || '-', badge: 'Live' },
              { label: 'Current Seat', value: booking?.seatId?.seatNumber || '-', badge: booking?.status || 'None' },
              { label: 'Paid Fees', value: String(paidFees), badge: 'Fees' },
              { label: 'Pending Fees', value: String(pendingFees), badge: 'Due' },
            ].map((item) => (
              <div key={item.label} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-500">{item.label}</p>
                    <p className="mt-3 text-2xl font-semibold text-slate-900">{item.value}</p>
                  </div>
                  <span className="rounded-2xl bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                    {item.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
            <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Attendance</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-900">Latest Check-in / Check-out</h2>
                </div>
                <div className="rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  {latestAttendance ? new Date(latestAttendance.date).toLocaleDateString() : 'No attendance yet'}
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Check In</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">
                    {latestAttendance?.checkIn ? new Date(latestAttendance.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-'}
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Check Out</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">
                    {latestAttendance?.checkOut ? new Date(latestAttendance.checkOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-'}
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Study Duration</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">
                    {latestAttendance?.studyDuration ? `${latestAttendance.studyDuration} mins` : '-'}
                  </p>
                </div>
              </div>

              <div className="mt-8 overflow-hidden rounded-[28px] border border-slate-200">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-slate-950 text-white">
                    <tr>
                      <th className="px-6 py-4 font-medium">Date</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {attendance.length === 0 ? (
                      <tr>
                        <td className="px-6 py-4 text-slate-500" colSpan={3}>No attendance records found.</td>
                      </tr>
                    ) : attendance.slice(0, 5).map((item) => (
                      <tr key={item._id} className="border-b border-slate-200">
                        <td className="px-6 py-4">{new Date(item.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4">{item.status}</td>
                        <td className="px-6 py-4">{item.studyDuration ? `${item.studyDuration} mins` : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <aside className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/30">
              <div className="rounded-[28px] bg-slate-50 p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Membership</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">{booking?.membershipType || 'No membership'}</p>
                <p className="mt-2 text-sm text-slate-600">
                  {booking ? `${new Date(booking.startDate).toLocaleDateString()} to ${new Date(booking.endDate).toLocaleDateString()}` : 'Please complete registration'}
                </p>
              </div>

              <div className="rounded-[28px] bg-slate-50 p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">QR Code</p>
                {qrCode ? (
                  <img src={qrCode} alt="Student QR" className="mt-4 w-full rounded-3xl bg-white p-4" />
                ) : (
                  <div className="mt-4 rounded-3xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
                    QR not available
                  </div>
                )}
              </div>

              <div className="rounded-[28px] bg-slate-50 p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Profile</p>
                <div className="mt-4 space-y-3 text-sm text-slate-700">
                  <p><span className="font-semibold">Email:</span> {student?.email || '-'}</p>
                  <p><span className="font-semibold">Phone:</span> {student?.phone || '-'}</p>
                  <p><span className="font-semibold">Branch:</span> {student?.branchId || 'main'}</p>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  )
}

export default StudentDashboard
