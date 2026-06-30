import { useEffect, useState } from 'react'
import axios from 'axios'

const LibraryViewPage = () => {
  const [seats, setSeats] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedSeat, setSelectedSeat] = useState(null)
  const [refreshing, setRefreshing] = useState(false)

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

  useEffect(() => {
    let isMounted = true

    const loadSeats = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/seats`, { params: { branchId: 'main' } })
        const seatsData = response.data?.data || response.data || []
        if (isMounted) {
          setSeats(seatsData)
        }
      } catch (error) {
        console.error('Failed to fetch seats:', error)
      } finally {
        if (isMounted) {
          setLoading(false)
          setRefreshing(false)
        }
      }
    }

    loadSeats()

    return () => {
      isMounted = false
    }
  }, [apiBaseUrl])

  const handleRefresh = async () => {
    setRefreshing(true)
    try {
      const response = await axios.get(`${apiBaseUrl}/seats`, { params: { branchId: 'main' } })
      const seatsData = response.data?.data || response.data || []
      setSeats(seatsData)
    } catch (error) {
      console.error('Failed to fetch seats:', error)
    } finally {
      setRefreshing(false)
    }
  }


  const rowASeats = seats.filter(seat => seat.seatNumber >= 1 && seat.seatNumber <= 17)
  const rowBSeats = seats.filter(seat => seat.seatNumber >= 18 && seat.seatNumber <= 33)

  const getSeatDetails = (seatNumber) => {
    return seats.find(seat => seat.seatNumber === seatNumber)
  }

  const selectedSeatDetails = selectedSeat ? getSeatDetails(selectedSeat) : null

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 py-10 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-4xl bg-white p-6 shadow-xl ring-1 ring-slate-200/80">
            <h1 className="text-3xl font-semibold text-slate-900">Library Seat View</h1>
            <p className="mt-4 text-slate-600">Loading seats...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-4xl bg-white p-6 shadow-xl ring-1 ring-slate-200/80">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">Library Seat View</h1>
              <p className="mt-2 text-slate-600">Study center layout from the upper side</p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 disabled:opacity-50"
            >
              {refreshing ? 'Refreshing...' : 'Refresh ↻'}
            </button>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-100 p-6">
            <div className="mx-auto max-w-4xl rounded-3xl bg-white p-6 shadow-sm">
              <div className="mb-8 text-center">
                <div className="mx-auto inline-flex h-12 items-center justify-center rounded-full bg-slate-900/5 px-6 text-sm font-medium uppercase tracking-[0.28em] text-slate-600">
                  Librarian Desk 
                </div>
                <p className="mt-3 text-sm text-slate-500">Upper-side view showing the study hall and seat numbers.</p>
              </div>

              <div className="space-y-8">
                <div>
                  <div className="mb-3 flex items-center justify-between text-sm font-medium text-slate-700">
                    <span>Row A</span>
                    <span className="text-slate-500">17 seats</span>
                  </div>
                  <div className="flex flex-wrap justify-center gap-3">
                    {rowASeats.map((seat) => {
                      const isSelected = selectedSeat === seat.seatNumber
                      const isReserved = seat.status === 'reserved'
                      const isInactive = seat.status === 'inactive'
                      return (
                        <button
                          key={seat._id}
                          type="button"
                          onClick={() => setSelectedSeat(seat.seatNumber)}
                          className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl border text-sm font-semibold transition ${
                            isInactive
                              ? 'border-slate-300 bg-slate-200 text-slate-500 cursor-not-allowed'
                              : isReserved
                              ? 'border-yellow-400 bg-yellow-300 text-slate-900'
                              : isSelected
                              ? 'border-cyan-600 bg-cyan-600 text-white shadow-lg'
                              : 'border-slate-300 bg-white text-slate-800 hover:border-slate-400 hover:bg-slate-50'
                          }`}
                          aria-pressed={isSelected}
                          disabled={isInactive}
                        >
                          {seat.seatNumber}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex items-center justify-between text-sm font-medium text-slate-700">
                    <span>Row B</span>
                    <span className="text-slate-500">16 seats</span>
                  </div>
                  <div className="flex flex-wrap justify-center gap-3">
                    {rowBSeats.map((seat) => {
                      const isSelected = selectedSeat === seat.seatNumber
                      const isReserved = seat.status === 'reserved'
                      const isInactive = seat.status === 'inactive'
                      return (
                        <button
                          key={seat._id}
                          type="button"
                          onClick={() => setSelectedSeat(seat.seatNumber)}
                          className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl border text-sm font-semibold transition ${
                            isInactive
                              ? 'border-slate-300 bg-slate-200 text-slate-500 cursor-not-allowed'
                              : isReserved
                              ? 'border-yellow-400 bg-yellow-300 text-slate-900'
                              : isSelected
                              ? 'border-cyan-600 bg-cyan-600 text-white shadow-lg'
                              : 'border-slate-300 bg-white text-slate-800 hover:border-slate-400 hover:bg-slate-50'
                          }`}
                          aria-pressed={isSelected}
                          disabled={isInactive}
                        >
                          {seat.seatNumber}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

              <div className="mt-6 flex flex-col gap-4 rounded-3xl bg-slate-50 p-5 text-sm text-slate-700 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-slate-500">Selected seat</p>
                <p className="text-lg font-semibold text-slate-900">{selectedSeat ? `Seat ${selectedSeat}` : 'No seat selected'}</p>
                {selectedSeatDetails && (
                  <p className="mt-1 text-xs text-slate-500">
                    Status: <span className={`font-medium ${selectedSeatDetails.status === 'available' ? 'text-emerald-600' : selectedSeatDetails.status === 'reserved' ? 'text-yellow-600' : 'text-slate-500'}`}>{selectedSeatDetails.status}</span>
                  </p>
                )}
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-600">
                {selectedSeat ? 'Click seat again or Close to deselect' : 'Click any seat to see its details'}
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedSeat !== null && selectedSeatDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSelectedSeat(null)} />
          <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-start justify-between">
              <h3 className="text-lg font-semibold">Seat {selectedSeat} details</h3>
              <button className="text-slate-500" onClick={() => setSelectedSeat(null)}>Close</button>
            </div>
            {selectedSeatDetails.status === 'reserved' && selectedSeatDetails.reservedBy ? (
              <div className="space-y-3">
                <p className="text-sm"><strong>Status:</strong> <span className="text-yellow-600">Reserved</span></p>
                <p className="text-sm"><strong>Seat Number:</strong> {selectedSeatDetails.seatNumber}</p>
                <p className="text-sm"><strong>Student ID:</strong> {selectedSeatDetails.reservedBy?.studentId || selectedSeatDetails.reservedBy || 'N/A'}</p>
                <p className="text-sm"><strong>Booking ID:</strong> {selectedSeatDetails.bookingId?._id || (typeof selectedSeatDetails.bookingId === 'string' ? selectedSeatDetails.bookingId : 'N/A')}</p>
                <p className="text-sm"><strong>Reserved At:</strong> {selectedSeatDetails.reservedAt ? new Date(selectedSeatDetails.reservedAt).toLocaleString('en-IN') : 'N/A'}</p>
                <div className="mt-4 flex justify-end gap-3">
                  <button onClick={() => setSelectedSeat(null)} className="rounded-md border border-slate-200 px-3 py-1 text-sm text-slate-600">Close</button>
                </div>
              </div>
            ) : selectedSeatDetails.status === 'available' ? (
              <div className="space-y-3">
                <p className="text-sm"><strong>Status:</strong> <span className="text-emerald-600">Available</span></p>
                <p className="text-sm"><strong>Seat Number:</strong> {selectedSeatDetails.seatNumber}</p>
                <p className="text-sm text-slate-600">This seat is available for booking.</p>
                <div className="mt-4 flex justify-end">
                  <button onClick={() => setSelectedSeat(null)} className="rounded-md border border-slate-200 px-3 py-1 text-sm text-slate-600">Close</button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm"><strong>Status:</strong> <span className="text-slate-500">Inactive</span></p>
                <p className="text-sm"><strong>Seat Number:</strong> {selectedSeatDetails.seatNumber}</p>
                <p className="text-sm text-slate-600">This seat is currently inactive.</p>
                <div className="mt-4 flex justify-end">
                  <button onClick={() => setSelectedSeat(null)} className="rounded-md border border-slate-200 px-3 py-1 text-sm text-slate-600">Close</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default LibraryViewPage