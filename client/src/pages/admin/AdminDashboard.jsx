import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { MdLogout } from 'react-icons/md'
import { FiSend } from 'react-icons/fi'
import Scanner from '../../components/Scanner'

const AdminDashboard = () => {
  const navigate = useNavigate() 
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
  const [activities, setActivities] = useState([])
  const [loadingActivities, setLoadingActivities] = useState(true)
  const [stats, setStats] = useState({
    totalStudents: 0,
    reservedSeats: 0,
    availableSeats: 0,
    totalFees: 0,
  })
  const [broadcast, setBroadcast] = useState({ title: '', message: '' })
  const [broadcastStatus, setBroadcastStatus] = useState('')
  const [attendanceStatus, setAttendanceStatus] = useState('')
  const [attendanceError, setAttendanceError] = useState('')

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [activitiesRes, studentsRes, seatsRes, feesRes] = await Promise.allSettled([
          axios.get(`${apiBaseUrl}/admin/recent-activities`, { params: { limit: 8 } }),
          axios.get(`${apiBaseUrl}/students/student`),
          axios.get(`${apiBaseUrl}/seats`, { params: { branchId: 'main' } }),
          axios.get(`${apiBaseUrl}/fees/fees`),
        ])

        setActivities(activitiesRes.status === 'fulfilled' ? activitiesRes.value.data?.data || [] : [])

        const students = studentsRes.status === 'fulfilled' ? studentsRes.value.data?.data || [] : []
        const seats = seatsRes.status === 'fulfilled' ? seatsRes.value.data?.data || [] : []
        const fees = feesRes.status === 'fulfilled' ? feesRes.value.data?.data || [] : []

        setStats({
          totalStudents: students.length,
          reservedSeats: seats.filter((seat) => seat.status === 'reserved').length,
          availableSeats: seats.filter((seat) => seat.status === 'available').length,
          totalFees: fees.reduce((sum, fee) => sum + Number(fee.amount || 0), 0),
        })
      } catch {
        setActivities([])
      } finally {
        setLoadingActivities(false)
      }
    }

    fetchDashboard()
  }, [apiBaseUrl])

  const handleBroadcast = async (event) => {
    event.preventDefault()
    setBroadcastStatus('')
    try {
      await axios.post(`${apiBaseUrl}/admin/broadcast`, {
        title: broadcast.title,
        message: broadcast.message,
        type: 'general',
      })
      setBroadcast({ title: '', message: '' })
      setBroadcastStatus('Broadcast sent successfully.')
    } catch (error) {
      setBroadcastStatus(error?.response?.data?.message || error.message || 'Unable to send broadcast.')
    }
  }

  const handleQrScan = async (decodedText) => {
    setAttendanceStatus('')
    setAttendanceError('')
    try {
      const parsed = JSON.parse(decodedText)
      const studentId = parsed?.studentId
      if (!studentId) {
        setAttendanceError('Invalid QR code: missing studentId.')
        return
      }

      const bookingsRes = await axios.get(`${apiBaseUrl}/bookings`, {
        params: { studentId, status: 'active' },
      })

      const bookings = bookingsRes.data?.data || bookingsRes.data || []
      const activeBooking = Array.isArray(bookings) ? bookings[0] : null
      if (!activeBooking) {
        setAttendanceError('No active booking found for this student.')
        return
      }

      const attendanceRes = await axios.post(`${apiBaseUrl}/attendance/attendance`, {
        studentId,
        bookingId: activeBooking._id,
      })

      const record = attendanceRes.data?.data || attendanceRes.data
      if (record?.checkOut) {
        setAttendanceStatus(`Check-out recorded for student ${studentId}.`)
      } else {
        setAttendanceStatus(`Check-in recorded for student ${studentId}.`)
      }
    } catch (error) {
      setAttendanceError(error?.response?.data?.message || error.message || 'Unable to mark attendance from QR.')
    }
  }

  const formatTimestamp = (value) => {
    if (!value) return '-'
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return '-'
    return new Intl.DateTimeFormat('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date)
  }

  const getTypeClass = (type) => {
    const map = {
      register: 'bg-emerald-100 text-emerald-700',
      profile_picture_update: 'bg-purple-100 text-purple-700',
      attendance_checkin: 'bg-blue-100 text-blue-700',
      attendance_checkout: 'bg-blue-100 text-blue-700',
      fee_paid: 'bg-yellow-100 text-yellow-700',
      fee_created: 'bg-amber-100 text-amber-700',
      student_update: 'bg-slate-100 text-slate-700',
      login: 'bg-cyan-100 text-cyan-700',
      broadcast_message: 'bg-fuchsia-100 text-fuchsia-700',
    }
    return map[type] || 'bg-slate-100 text-slate-700'
  }

  const getStatusClass = (status) => {
    const map = {
      completed: 'bg-emerald-100 text-emerald-700',
      pending: 'bg-amber-100 text-amber-700',
      warning: 'bg-red-100 text-red-700',
      info: 'bg-slate-100 text-slate-700',
    }
    return map[status] || 'bg-slate-100 text-slate-700'
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto max-w-[1600px] px-4 py-6 xl:px-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-amber-500">Administration</p>
            <h1 className="mt-2 text-4xl font-semibold text-slate-900">Dashboard</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate('/admin/library-view')}
              className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              See Library View
            </button>
            <button
              onClick={() => navigate('/admin/seat-management')}
              className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Manage Seats
            </button>
            <button className="inline-flex items-center justify-center rounded-3xl bg-red-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-400">
              <MdLogout className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/10">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Total Students</p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">{stats.totalStudents}</p>
            <p className="mt-2 text-xs text-slate-500">Live count from database</p>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/10">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Reserved Seats</p>
            <p className="mt-4 text-3xl font-semibold text-emerald-600">{stats.reservedSeats}</p>
            <p className="mt-2 text-xs text-slate-500">Currently reserved</p>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/10">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Fees Collected</p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">₹{stats.totalFees.toFixed(2)}</p>
            <p className="mt-2 text-xs text-slate-500">Sum of fee records</p>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/10">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Available Seats</p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">{stats.availableSeats}</p>
            <p className="mt-2 text-xs text-slate-500">Main branch seats</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/10 lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Recent Activities</h2>
              <button className="text-sm font-semibold text-amber-500 transition hover:text-amber-600">View All →</button>
            </div>

            <div className="overflow-hidden rounded-[28px] border border-slate-200">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-950 text-white">
                  <tr>
                    <th className="px-6 py-4 font-medium">Student / Admin</th>
                    <th className="px-6 py-4 font-medium">Activity</th>
                    <th className="px-6 py-4 font-medium">Type</th>
                    <th className="px-6 py-4 font-medium">Timestamp</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white text-slate-700">
                  {loadingActivities ? (
                    <tr>
                      <td className="px-6 py-4 text-slate-500" colSpan={5}>
                        Loading recent activity...
                      </td>
                    </tr>
                  ) : activities.length === 0 ? (
                    <tr>
                      <td className="px-6 py-4 text-slate-500" colSpan={5}>
                        No activity has been recorded yet.
                      </td>
                    </tr>
                  ) : (
                    activities.map((activity, index) => (
                      <tr
                        key={activity._id}
                        className={index % 2 === 1 ? 'bg-slate-50' : 'border-b border-slate-200'}
                      >
                        <td className="px-6 py-4 font-medium text-slate-900">{activity.actorName}</td>
                        <td className="px-6 py-4">{activity.title}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getTypeClass(activity.activityType)}`}>
                            {activity.activityType.replaceAll('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4">{formatTimestamp(activity.createdAt)}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(activity.status)}`}>
                            {activity.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/10">
            <h2 className="text-lg font-semibold text-slate-900">Quick Stats</h2>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-3">
                <p className="text-sm text-slate-600">Reserved Seats</p>
                <p className="font-semibold text-slate-900">{stats.reservedSeats}</p>
              </div>
              <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-3">
                <p className="text-sm text-slate-600">Available Seats</p>
                <p className="font-semibold text-emerald-600">{stats.availableSeats}</p>
              </div>
              <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-3">
                <p className="text-sm text-slate-600">System Status</p>
                <p className="font-semibold text-emerald-600">Operational</p>
              </div>
              <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-3">
                <p className="text-sm text-slate-600">Broadcast Ready</p>
                <p className="font-semibold text-slate-900">Yes</p>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-8'>
          <Scanner onScan={handleQrScan} />
          {(attendanceStatus || attendanceError) && (
            <div className='mt-4 rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/10'>
              {attendanceStatus && (
                <p className='text-sm text-emerald-700'>{attendanceStatus}</p>
              )}
              {attendanceError && (
                <p className='text-sm text-red-700'>{attendanceError}</p>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/10">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-amber-500">Broadcast</p>
              <h2 className="mt-2 text-lg font-semibold text-slate-900">Send announcement to all students</h2>
            </div>
          </div>

          <form onSubmit={handleBroadcast} className="grid gap-4 lg:grid-cols-[1fr_2fr_auto]">
            <input
              value={broadcast.title}
              onChange={(e) => setBroadcast((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Announcement title"
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-slate-900"
            />
            <input
              value={broadcast.message}
              onChange={(e) => setBroadcast((prev) => ({ ...prev, message: e.target.value }))}
              placeholder="Type the message for all students"
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-slate-900"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <FiSend className="mr-2 h-4 w-4" />
              Send
            </button>
          </form>

          {broadcastStatus ? (
            <p className="mt-4 text-sm text-slate-600">{broadcastStatus}</p>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
