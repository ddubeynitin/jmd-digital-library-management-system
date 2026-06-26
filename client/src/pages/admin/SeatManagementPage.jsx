import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SeatManagementPage = () => {
  const [batch, setBatch] = useState('7 to 12')
  const [shift, setShift] = useState('Morning')
  const [seats, setSeats] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [newSeatNumber, setNewSeatNumber] = useState('')
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
  const navigate = useNavigate()

  const fetchSeats = async () => {
    if (!batch || !shift) return
    setLoading(true)
    setError('')
    try {
      const res = await axios.get(`${API_BASE_URL}/seats`, { params: { batch, shift } })
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
  }, [batch, shift])

  const handleAddSeat = async () => {
    if (!newSeatNumber) return setError('Enter a seat number')
    try {
      await axios.post(`${API_BASE_URL}/seats`, { batch, shift, seatNumber: String(newSeatNumber) })
      setNewSeatNumber('')
      fetchSeats()
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Unable to create seat')
    }
  }

  const handleEnsureDefault = async () => {
    // Ensure seats 1..35 exist
    setLoading(true)
    setError('')
    try {
      const existing = seats.map((s) => String(s.seatNumber))
      const toCreate = []
      for (let i = 1; i <= 35; i += 1) {
        const n = String(i)
        if (!existing.includes(n)) toCreate.push(n)
      }
      await Promise.all(
        toCreate.map((seatNumber) => axios.post(`${API_BASE_URL}/seats`, { batch, shift, seatNumber }))
      )
      await fetchSeats()
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Unable to ensure default seats')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this seat?')) return
    try {
      await axios.delete(`${API_BASE_URL}/seats/${id}`)
      fetchSeats()
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Unable to delete seat')
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-amber-500">Admin</p>
              <h1 className="mt-2 text-2xl font-semibold text-slate-900">Seat Management</h1>
              <p className="mt-1 text-sm text-slate-500">Add, remove and inspect seat allocations.</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="text-sm font-semibold">Batch</label>
              <select value={batch} onChange={(e) => {
                const selectedBatch = e.target.value
                setBatch(selectedBatch)
                setShift(selectedBatch === '7 to 12' ? 'Morning' : 'Evening')
              }} className="mt-2 w-full rounded border px-3 py-2">
                <option value="7 to 12">7 to 12</option>
                <option value="12 to 8">12 to 8</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold">Shift</label>
              <select value={shift} onChange={(e) => setShift(e.target.value)} className="mt-2 w-full rounded border px-3 py-2">
                <option value="Morning">Morning</option>
                <option value="Evening">Evening</option>
              </select>
            </div>
            <div className="flex items-end gap-2">
              <button onClick={fetchSeats} className="rounded bg-slate-900 text-white px-4 py-2">Refresh</button>
              <button onClick={handleEnsureDefault} className="rounded bg-emerald-600 text-white px-4 py-2">Ensure 35 seats</button>
            </div>
          </div>

          <div className="mt-6">
            {error ? <div className="mb-4 rounded border p-3 text-red-700 bg-red-50">{error}</div> : null}
            <div className="flex gap-2">
              <input value={newSeatNumber} onChange={(e) => setNewSeatNumber(e.target.value)} placeholder="Seat number" className="rounded border px-3 py-2" />
              <button onClick={handleAddSeat} className="rounded bg-blue-600 text-white px-4 py-2">Add seat</button>
            </div>
          </div>

          <div className="mt-6">
            {loading ? (
              <div className="rounded border p-6 text-center">Loading…</div>
            ) : seats.length === 0 ? (
              <div className="rounded border p-6 text-center text-slate-500">No seats for this batch/shift.</div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-4">
                {seats.map((seat) => (
                  <div key={seat._id} className="rounded-2xl border p-4 bg-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-semibold">Seat {seat.seatNumber}</div>
                        <div className="text-xs text-slate-500">{seat.batch} · {seat.shift}</div>
                      </div>
                      <div className="text-xs">
                        <div className={`rounded-full px-2 py-1 font-semibold ${seat.status === 'reserved' ? 'bg-red-100 text-red-700' : seat.status === 'requested' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                          {seat.status}
                        </div>
                      </div>
                    </div>

                    {seat.requestedBy ? (
                      <div className="mt-3 text-sm text-slate-700">
                        <div>Requested by: <strong>{seat.requestedBy.name}</strong></div>
                        <div className="text-xs text-slate-500">{seat.requestedBy.email} · {seat.requestedBy.studentId}</div>
                      </div>
                    ) : null}

                    {seat.reservedBy ? (
                      <div className="mt-3 text-sm text-slate-700">
                        <div>Reserved by: <strong>{seat.reservedBy.name}</strong></div>
                        <div className="text-xs text-slate-500">{seat.reservedBy.email} · {seat.reservedBy.studentId}</div>
                      </div>
                    ) : null}

                    <div className="mt-4 flex justify-end gap-2">
                      <button disabled={seat.status === 'reserved' || seat.status === 'requested'} onClick={() => handleDelete(seat._id)} className="rounded bg-red-600 text-white px-3 py-1 text-sm disabled:opacity-50">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeatManagementPage
