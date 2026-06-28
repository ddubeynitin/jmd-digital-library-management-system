import { useEffect, useState } from 'react'
import axios from 'axios'
import SideMenuPanel from '../../components/SideMenuPanel'
import { getSessionUser } from '../../lib/session'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

const StudentFeesPage = () => {
  const user = getSessionUser()
  const [fees, setFees] = useState([])

  useEffect(() => {
    const load = async () => {
      if (!user?.id) return
      const response = await axios.get(`${API_BASE_URL}/fees/fees/student/${user.id}`)
      setFees(response.data?.data || [])
    }
    load()
  }, [user?.id])

  const totalDue = fees.filter((fee) => fee.status !== 'paid').reduce((sum, fee) => sum + Number(fee.amount || 0), 0)
  const totalPaid = fees.filter((fee) => fee.status === 'paid').reduce((sum, fee) => sum + Number(fee.amount || 0), 0)

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-[1600px] gap-6 px-4 py-6 xl:px-10">
        <SideMenuPanel />

        <main className="flex-1">
          <div className="rounded-[40px] border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/20">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-amber-500">Fees Overview</p>
                <h1 className="mt-2 text-3xl font-semibold text-slate-900">Student Fee Details</h1>
                <p className="mt-2 text-sm text-slate-500">
                  Review your current fee status and payment history.
                </p>
              </div>
              <div className="rounded-3xl bg-slate-50 px-5 py-4 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">Current Balance</p>
                <p className="mt-2 text-2xl font-semibold text-amber-500">₹{totalDue.toFixed(2)}</p>
                <p className="mt-1 text-xs text-slate-500">Paid: ₹{totalPaid.toFixed(2)}</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Total Records</p>
                <p className="mt-4 text-3xl font-semibold text-slate-900">{fees.length}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Amount Paid</p>
                <p className="mt-4 text-3xl font-semibold text-emerald-600">₹{totalPaid.toFixed(2)}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Pending Due</p>
                <p className="mt-4 text-3xl font-semibold text-slate-900">₹{totalDue.toFixed(2)}</p>
              </div>
            </div>

            <div className="mt-10 overflow-hidden rounded-[32px] border border-slate-200">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead className="bg-slate-950 text-white">
                  <tr>
                    <th className="px-6 py-4 font-medium">Amount</th>
                    <th className="px-6 py-4 font-medium">Due Date</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white text-slate-700">
                  {fees.length === 0 ? (
                    <tr>
                      <td className="px-6 py-4 text-slate-500" colSpan={3}>No fee records found.</td>
                    </tr>
                  ) : fees.map((fee) => (
                    <tr key={fee._id} className="border-b border-slate-200">
                      <td className="px-6 py-4">₹{Number(fee.amount).toFixed(2)}</td>
                      <td className="px-6 py-4">{new Date(fee.dueDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${fee.status === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                          {fee.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default StudentFeesPage
