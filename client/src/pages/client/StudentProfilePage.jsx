import { useEffect, useState } from 'react'
import axios from 'axios'
import SideMenuPanel from '../../components/SideMenuPanel'
import { getSessionUser } from '../../lib/session'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

const StudentProfilePage = () => {
  const user = getSessionUser()
  const [student, setStudent] = useState(null)
  const [booking, setBooking] = useState(null)

  useEffect(() => {
    const load = async () => {
      if (!user?.id) return
      const [studentRes, bookingRes] = await Promise.allSettled([
        axios.get(`${API_BASE_URL}/students/student/${user.id}`),
        axios.get(`${API_BASE_URL}/bookings`),
      ])
      if (studentRes.status === 'fulfilled') setStudent(studentRes.value.data?.data || null)
      if (bookingRes.status === 'fulfilled') {
        const items = bookingRes.value.data?.data || []
        setBooking(items.find((item) => String(item.studentId?._id || item.studentId) === String(user.id)) || null)
      }
    }
    load()
  }, [user?.id])

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-[1600px] gap-6 px-4 py-6 xl:px-10">
        <SideMenuPanel />

        <main className="flex-1">
          <div className="rounded-[40px] border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/20">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-amber-500">Profile</p>
                <h1 className="mt-2 text-3xl font-semibold text-slate-900">Student Profile</h1>
                <p className="mt-2 text-sm text-slate-500">
                  Personal information, contact details, and enrollment status.
                </p>
              </div>
              <div className="rounded-3xl bg-slate-50 px-5 py-4 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">Enrollment Status</p>
                <p className="mt-2 text-xl font-semibold text-emerald-600">
                  {booking?.status || 'No booking'}
                </p>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
              <section className="space-y-4 rounded-[32px] border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-center gap-4">
                  {student?.profilePicture ? (
                    <img
                      src={student.profilePicture}
                      alt={student?.name || 'Student profile'}
                      className="h-20 w-20 rounded-[28px] object-cover ring-4 ring-white"
                    />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-[28px] bg-slate-900 text-4xl font-semibold text-white">
                      {student?.name?.slice(0, 2)?.toUpperCase() || 'ST'}
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-slate-500">Student ID</p>
                    <p className="mt-1 text-2xl font-semibold text-slate-900">{student?.studentId || '-'}</p>
                  </div>
                </div>

                <div className="space-y-3 rounded-[28px] bg-white p-5 shadow-sm shadow-slate-200/50">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Name</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">{student?.name || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Branch</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">{student?.branchId || 'main'}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Membership</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">{student?.duration || '-'}</p>
                  </div>
                </div>
              </section>

              <section className="rounded-[32px] border border-slate-200 bg-white p-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Email</p>
                    <p className="mt-2 text-base font-semibold text-slate-900">{student?.email || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Phone</p>
                    <p className="mt-2 text-base font-semibold text-slate-900">{student?.phone || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Class</p>
                    <p className="mt-2 text-base font-semibold text-slate-900">{student?.studentClass || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Admission Date</p>
                    <p className="mt-2 text-base font-semibold text-slate-900">
                      {student?.createdAt ? new Date(student.createdAt).toLocaleDateString() : '-'}
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-50 p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Seat</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      {booking?.seatId?.seatNumber || '-'}
                    </p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Slot Count</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      {booking?.slotIds?.length || 0}
                    </p>
                  </div>
                </div>

                <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Address</p>
                  <p className="mt-3 text-sm leading-6 text-slate-700">
                    {student?.address || '-'} {student?.city ? `, ${student.city}` : ''} {student?.state ? `, ${student.state}` : ''}
                  </p>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default StudentProfilePage
