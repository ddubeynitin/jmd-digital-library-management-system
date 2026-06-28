import { useEffect, useState } from 'react'
import axios from 'axios'
import Scanner from '../../components/Scanner'
import SideMenuPanel from '../../components/SideMenuPanel'
import { getSessionUser } from '../../lib/session'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

const StudentAttendancePage = () => {
  const user = getSessionUser()
  const [attendance, setAttendance] = useState([])
  const [qrCode, setQrCode] = useState('')
  const [scanMessage, setScanMessage] = useState('')

  useEffect(() => {
    const load = async () => {
      if (!user?.id) return
      const [attendanceRes, qrRes] = await Promise.allSettled([
        axios.get(`${API_BASE_URL}/attendance/attendance/student/${user.id}`),
        axios.get(`${API_BASE_URL}/qr/student/${user.id}`),
      ])
      if (attendanceRes.status === 'fulfilled') setAttendance(attendanceRes.value.data?.data || [])
      if (qrRes.status === 'fulfilled') setQrCode(qrRes.value.data?.data?.qrCode || '')
    }
    load()
  }, [user?.id])

  const handleScan = async (decodedText) => {
    setScanMessage(decodedText)
    if (!user?.id) return
    const bookingId = attendance[0]?.bookingId?._id || attendance[0]?.bookingId
    await axios.post(`${API_BASE_URL}/attendance/attendance`, {
      studentId: user.id,
      bookingId,
      date: new Date().toISOString(),
    })
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-[1600px] gap-6 px-4 py-6 xl:px-10">
        <SideMenuPanel />

        <div className="grid flex-1 gap-6 xl:grid-cols-2">
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/20">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Self Attendance</h2>
            <Scanner onScan={handleScan} />
            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-600">Last scanned QR code</p>
              <p className="mt-2 text-base font-semibold text-slate-900">{scanMessage || 'No scan yet.'}</p>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/20">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Your QR & History</h2>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-[28px] p-8">
              {qrCode ? (
                <img src={qrCode} alt="QR Code" className="mx-auto w-64 rounded-3xl bg-white p-4" />
              ) : (
                <div className="mx-auto flex h-64 w-64 items-center justify-center rounded-3xl bg-white text-slate-500">
                  QR Code unavailable
                </div>
              )}
            </div>

            <div className="mt-6 overflow-hidden rounded-[28px] border border-slate-200">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-950 text-white">
                  <tr>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Check In</th>
                    <th className="px-6 py-4 font-medium">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.length === 0 ? (
                    <tr><td className="px-6 py-4 text-slate-500" colSpan={3}>No attendance history.</td></tr>
                  ) : attendance.map((item) => (
                    <tr key={item._id} className="border-b border-slate-200">
                      <td className="px-6 py-4">{new Date(item.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4">{item.checkIn ? new Date(item.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-'}</td>
                      <td className="px-6 py-4">{item.studyDuration ? `${item.studyDuration} mins` : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentAttendancePage
