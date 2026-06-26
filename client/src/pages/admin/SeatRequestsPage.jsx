import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SeatRequestsPage = () => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
  const navigate = useNavigate()

  const fetchRequests = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await axios.get(`${API_BASE_URL}/seats/requests`)
      setRequests(response.data.data || [])
    } catch (err) {
      setError(err.message || 'Failed to load seat requests')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  const handleAction = async (id, action) => {
    setError('')

    try {
      await axios.put(`${API_BASE_URL}/seats/${id}/${action}`)
      fetchRequests()
    } catch (err) {
      setError(err.message || 'Unable to complete action')
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 py-10 px-4">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/10">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-amber-500">Seat Requests</p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">Pending Seat Approvals</h1>
              <p className="mt-2 text-sm text-slate-500">Approve or reject student seat allocation requests from the admin panel.</p>
            </div>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Back to dashboard
            </button>
          </div>

          {error ? (
            <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          {loading ? (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-500">Loading seat requests…</div>
          ) : requests.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-500">No pending seat requests.</div>
          ) : (
            <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-950 text-white">
                  <tr>
                    <th className="px-6 py-4 font-medium">Seat</th>
                    <th className="px-6 py-4 font-medium">Batch / Shift</th>
                    <th className="px-6 py-4 font-medium">Student</th>
                    <th className="px-6 py-4 font-medium">Requested At</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white text-slate-700">
                  {requests.map((request) => (
                    <tr key={request._id} className="border-b border-slate-200 hover:bg-slate-50">
                      <td className="px-6 py-4 font-semibold text-slate-900">{request.seatNumber}</td>
                      <td className="px-6 py-4">{request.batch} · {request.shift}</td>
                      <td className="px-6 py-4">
                        {request.requestedBy ? request.requestedBy.name : 'Unknown'}
                        <div className="text-xs text-slate-500">{request.requestedBy?.studentId || ''}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{new Date(request.requestedAt).toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">Requested</span>
                      </td>
                      <td className="px-6 py-4 space-x-2">
                        <button
                          onClick={() => handleAction(request._id, 'approve')}
                          className="inline-flex rounded-3xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-500"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleAction(request._id, 'reject')}
                          className="inline-flex rounded-3xl bg-red-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-red-500"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SeatRequestsPage
