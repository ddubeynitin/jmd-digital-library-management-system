import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

const SeatManagementPage = () => {
  const navigate = useNavigate()
  const [branchId, setBranchId] = useState('main')
  const [seats, setSeats] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [newSeatNumber, setNewSeatNumber] = useState('')

  const seatStats = useMemo(() => {
    return {
      total: seats.length,
      available: seats.filter((seat) => seat.status === 'available').length,
      reserved: seats.filter((seat) => seat.status === 'reserved').length,
      inactive: seats.filter((seat) => seat.status === 'inactive' || seat.active === false).length,
    }
  }, [seats])

  const fetchSeats = async () => {
    if (!branchId) return
    setLoading(true)
    setError('')
    try {
      const res = await axios.get(`${API_BASE_URL}/seats`, { params: { branchId } })
      setSeats(res.data.data || [])
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Unable to load seats')
      setSeats([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSeats()
  }, [branchId])

  const handleAddSeat = async () => {
    if (!newSeatNumber.trim()) {
      setError('Enter a seat number')
      return
    }

    setError('')
    try {
      await axios.post(`${API_BASE_URL}/seats`, {
        branchId,
        seatNumber: Number(newSeatNumber),
      })
      setNewSeatNumber('')
      fetchSeats()
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Unable to create seat')
    }
  }

  const handleEnsureDefault = async () => {
    setLoading(true)
    setError('')
    try {
      const existing = seats.map((seat) => String(seat.seatNumber))
      const missing = []
      for (let i = 1; i <= 35; i += 1) {
        const seatNumber = String(i)
        if (!existing.includes(seatNumber)) missing.push(seatNumber)
      }

      await Promise.all(
        missing.map((seatNumber) =>
          axios.post(`${API_BASE_URL}/seats`, {
            branchId,
            seatNumber: Number(seatNumber),
          }),
        ),
      )

      await fetchSeats()
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Unable to ensure default seats')
    } finally {
      setLoading(false)
    }
  }

  const handleSeatAction = async (seat, nextStatus) => {
    setError('')
    try {
      await axios.put(`${API_BASE_URL}/seats/${seat._id}`, {
        status: nextStatus,
      })
      fetchSeats()
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Unable to update seat')
    }
  }

  const setSeatInactive = async (seat) => {
    setError('')
    try {
      await handleSeatAction(seat, 'inactive')
      fetchSeats()
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Unable to disable seat')
    }
  }

  const setSeatAvailable = async (seat) => {
    setError('')
    try {
      await handleSeatAction(seat, 'available')
      fetchSeats()
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Unable to enable seat')
    }
  }

  const handleDelete = async (seat) => {
    if (!window.confirm(`Delete seat ${seat.seatNumber}?`)) return
    try {
      await axios.delete(`${API_BASE_URL}/seats/${seat._id}`)
      fetchSeats()
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Unable to delete seat')
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-amber-500">Admin</p>
              <h1 className="mt-2 text-2xl font-semibold text-slate-900">Seat Management</h1>
              <p className="mt-1 text-sm text-slate-500">
                Manage branch seats, enable/disable them, and keep the layout ready for bookings.
              </p>
            </div>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              Back to Dashboard
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div>
              <label className="text-sm font-semibold">Branch</label>
              <select
                value={branchId}
                onChange={(e) => setBranchId(e.target.value)}
                className="mt-2 w-full rounded-xl border px-3 py-2"
              >
                <option value="main">Main</option>
              </select>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Total</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{seatStats.total}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Available</p>
              <p className="mt-2 text-2xl font-semibold text-emerald-600">{seatStats.available}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Reserved / Inactive</p>
              <p className="mt-2 text-2xl font-semibold text-red-600">
                {seatStats.reserved} / {seatStats.inactive}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={fetchSeats}
              className="rounded-2xl bg-slate-900 px-4 py-2 font-semibold text-white"
            >
              Refresh
            </button>
            <button
              onClick={handleEnsureDefault}
              className="rounded-2xl bg-emerald-600 px-4 py-2 font-semibold text-white"
            >
              Ensure 35 Seats
            </button>
            <div className="flex gap-2">
              <input
                value={newSeatNumber}
                onChange={(e) => setNewSeatNumber(e.target.value)}
                placeholder="Seat number"
                className="rounded-2xl border px-3 py-2"
              />
              <button
                onClick={handleAddSeat}
                className="rounded-2xl bg-blue-600 px-4 py-2 font-semibold text-white"
              >
                Add seat
              </button>
            </div>
          </div>

          {error ? <div className="mt-6 rounded-xl border p-3 text-red-700 bg-red-50">{error}</div> : null}

          <div className="mt-6">
            {loading ? (
              <div className="rounded border p-6 text-center">Loading...</div>
            ) : seats.length === 0 ? (
              <div className="rounded border p-6 text-center text-slate-500">
                No seats configured for this branch yet.
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {seats.map((seat) => {
                  const inactive = seat.status === 'inactive' || seat.active === false
                  const reserved = seat.status === 'reserved'
                  return (
                    <div key={seat._id} className="rounded-2xl border bg-white p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-lg font-semibold">Seat {seat.seatNumber}</div>
                          <div className="text-xs text-slate-500">Branch: {seat.branchId}</div>
                        </div>
                        <div className="text-xs">
                          <span
                            className={`rounded-full px-2 py-1 font-semibold ${
                              reserved
                                ? 'bg-red-100 text-red-700'
                                : inactive
                                  ? 'bg-slate-200 text-slate-600'
                                  : 'bg-emerald-100 text-emerald-700'
                            }`}
                          >
                            {seat.status}
                          </span>
                        </div>
                      </div>

                      {seat.reservedBy ? (
                        <div className="mt-3 text-sm text-slate-700">
                          <div>
                            Reserved by: <strong>{seat.reservedBy.name}</strong>
                          </div>
                          <div className="text-xs text-slate-500">
                            {seat.reservedBy.email} · {seat.reservedBy.studentId}
                          </div>
                        </div>
                      ) : null}

                      {seat.bookingId ? (
                        <div className="mt-3 text-xs text-slate-500">
                          Booking linked: {seat.bookingId._id || seat.bookingId}
                        </div>
                      ) : null}

                      <div className="mt-4 flex flex-wrap gap-2">
                        {!inactive ? (
                          <button
                            onClick={() => setSeatInactive(seat)}
                            className="rounded-xl bg-slate-200 px-3 py-1 text-sm font-semibold text-slate-700"
                          >
                            Disable
                          </button>
                        ) : (
                          <button
                            onClick={() => setSeatAvailable(seat)}
                            className="rounded-xl bg-emerald-600 px-3 py-1 text-sm font-semibold text-white"
                          >
                            Enable
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(seat)}
                          className="rounded-xl bg-red-600 px-3 py-1 text-sm font-semibold text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeatManagementPage
