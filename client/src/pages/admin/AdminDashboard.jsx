import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';

const AdminDashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="min-h-screen bg-slate-100 text-slate-900">
        <div className="mx-auto max-w-[1600px] px-4 py-6 xl:px-10">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-amber-500">Administration</p>
              <h1 className="mt-2 text-4xl font-semibold text-slate-900">Dashboard</h1>
            </div>
            <div className="flex gap-3">
              <button onClick={()=>{navigate('/admin/library-view')}} className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
                See Library View
              </button>
              <button className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
                Export Report
              </button>
              <button
                onClick={() => navigate('/admin/messages')}
                className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Message
              </button>
              <button className="inline-flex items-center justify-center rounded-3xl bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400">
                Add New Student
              </button>
              <button className="inline-flex items-center justify-center rounded-3xl bg-red-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-400">
                <MdLogout className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/10" onClick={()=>navigate('/admin/total-students')}>
              <div className="flex items-start justify-between cursor-pointer" >
                <div >
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Total Students</p>
                  <p className="mt-4 text-3xl font-semibold text-slate-900">1,234</p>
                  <p className="mt-2 text-xs text-slate-500">↑ 8.5% from last month</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-2xl">👥</div>
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/10">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Attendance Rate</p>
                  <p className="mt-4 text-3xl font-semibold text-emerald-600">92.3%</p>
                  <p className="mt-2 text-xs text-slate-500">Today: 1,138 present</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">✓</div>
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/10">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Fees Collected</p>
                  <p className="mt-4 text-3xl font-semibold text-slate-900">₹45.2L</p>
                  <p className="mt-2 text-xs text-slate-500">↑ 12.4% pending</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-100 text-2xl">💰</div>
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/10">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Active Students</p>
                  <p className="mt-4 text-3xl font-semibold text-slate-900">156</p>
                  <p className="mt-2 text-xs text-slate-500">Currently online</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-2xl">🔴</div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/10 lg:col-span-2">
              <h2 className="text-lg font-semibold text-slate-900">Attendance Trend</h2>
              <div className="mt-6 h-64 rounded-3xl bg-slate-50 flex items-end justify-around p-4">
                {[65, 72, 68, 85, 92, 88, 95].map((val, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div
                      className="w-8 rounded-t-lg bg-gradient-to-t from-amber-500 to-amber-400 transition hover:from-amber-600 hover:to-amber-500"
                      style={{ height: `${(val / 100) * 200}px` }}
                    />
                    <p className="text-xs text-slate-500">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/10">
              <h2 className="text-lg font-semibold text-slate-900">Quick Stats</h2>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-3">
                  <p className="text-sm text-slate-600">Online Students</p>
                  <p className="font-semibold text-slate-900">342</p>
                </div>
                <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-3">
                  <p className="text-sm text-slate-600">Pending Approvals</p>
                  <p className="font-semibold text-amber-600">8</p>
                </div>
                <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-3">
                  <p className="text-sm text-slate-600">System Status</p>
                  <p className="font-semibold text-emerald-600">Operational</p>
                </div>
                <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-3">
                  <p className="text-sm text-slate-600">Database Size</p>
                  <p className="font-semibold text-slate-900">2.3 GB</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/10">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Recent Activities</h2>
              <button className="text-sm font-semibold text-amber-500 transition hover:text-amber-600">View All →</button>
            </div>

            <div className="overflow-hidden rounded-[28px] border border-slate-200">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-950 text-white">
                  <tr>
                    <th className="px-6 py-4 font-medium">Student Name</th>
                    <th className="px-6 py-4 font-medium">Activity</th>
                    <th className="px-6 py-4 font-medium">Type</th>
                    <th className="px-6 py-4 font-medium">Timestamp</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white text-slate-700">
                  <tr className="border-b border-slate-200">
                    <td className="px-6 py-4 font-medium text-slate-900">Jaya D. Patel</td>
                    <td className="px-6 py-4">Submitted Attendance</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                        Attendance
                      </span>
                    </td>
                    <td className="px-6 py-4">Today, 2:30 PM</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">Rajesh Kumar</td>
                    <td className="px-6 py-4">Fee Payment Processed</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                        Fees
                      </span>
                    </td>
                    <td className="px-6 py-4">Today, 1:45 PM</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-6 py-4 font-medium text-slate-900">Priya Sharma</td>
                    <td className="px-6 py-4">Profile Updated</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                        Profile
                      </span>
                    </td>
                    <td className="px-6 py-4">Today, 11:20 AM</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">Amit Desai</td>
                    <td className="px-6 py-4">New Registration</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                        Registration
                      </span>
                    </td>
                    <td className="px-6 py-4">Yesterday, 3:15 PM</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                        Pending
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard
