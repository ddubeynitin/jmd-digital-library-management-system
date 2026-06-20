import { useState } from 'react'

const LibraryViewPage = () => {
  const rowASeats = Array.from({ length: 17 }, (_, index) => index + 1)
  const rowBSeats = Array.from({ length: 16 }, (_, index) => 18 + index)
  const [selectedSeat, setSelectedSeat] = useState(null)
  const [reservedSeats, setReservedSeats] = useState({
    3: { name: 'Rohit Sharma', studentId: 'S1001', email: 'rohit@example.com', phone: '9876543210', batch: '2024', duration: '6 months' },
    22: { name: 'Priya Singh', studentId: 'S1005', email: 'priya@example.com', phone: '9123456780', batch: '2023', duration: '1 year' },
  })

  const handleRemoveReservation = (seat) => {
    if (!seat) return
    const next = { ...reservedSeats }
    delete next[seat]
    setReservedSeats(next)
    setSelectedSeat(null)
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-4xl bg-white p-6 shadow-xl ring-1 ring-slate-200/80">
          <div className="mb-6">
            <h1 className="text-3xl font-semibold text-slate-900">Library Seat View</h1>
            <p className="mt-2 text-slate-600">Study center layout from the upper side</p>
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
                      const isSelected = selectedSeat === seat
                      const reserved = Boolean(reservedSeats[seat])
                      return (
                        <button
                          key={seat}
                          type="button"
                          onClick={() => setSelectedSeat(seat)}
                          className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl border text-sm font-semibold transition ${reserved ? 'border-yellow-400 bg-yellow-300 text-slate-900' : isSelected ? 'border-cyan-600 bg-cyan-600 text-white shadow-lg' : 'border-slate-300 bg-white text-slate-800 hover:border-slate-400 hover:bg-slate-50'}`}
                          aria-pressed={isSelected}
                        >
                          {seat}
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
                      const isSelected = selectedSeat === seat
                      const reserved = Boolean(reservedSeats[seat])
                      return (
                        <button
                          key={seat}
                          type="button"
                          onClick={() => setSelectedSeat(seat)}
                          className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl border text-sm font-semibold transition ${reserved ? 'border-yellow-400 bg-yellow-300 text-slate-900' : isSelected ? 'border-cyan-600 bg-cyan-600 text-white shadow-lg' : 'border-slate-300 bg-white text-slate-800 hover:border-slate-400 hover:bg-slate-50'}`}
                          aria-pressed={isSelected}
                        >
                          {seat}
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
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-600">
                Click any seat to see its student details.
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedSeat !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSelectedSeat(null)} />
          <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-start justify-between">
              <h3 className="text-lg font-semibold">Seat {selectedSeat} details</h3>
              <button className="text-slate-500" onClick={() => setSelectedSeat(null)}>Close</button>
            </div>
            {reservedSeats[selectedSeat] ? (
              <div className="space-y-3">
                <p className="text-sm"><strong>Name:</strong> {reservedSeats[selectedSeat].name}</p>
                <p className="text-sm"><strong>Student ID:</strong> {reservedSeats[selectedSeat].studentId}</p>
                <p className="text-sm"><strong>Email:</strong> {reservedSeats[selectedSeat].email}</p>
                <p className="text-sm"><strong>Phone:</strong> {reservedSeats[selectedSeat].phone}</p>
                <p className="text-sm"><strong>Batch:</strong> {reservedSeats[selectedSeat].batch}</p>
                <div className="mt-4 flex justify-end gap-3">
                  <button onClick={() => setSelectedSeat(null)} className="rounded-md border border-slate-200 px-3 py-1 text-sm text-slate-600">Close</button>
                  <button onClick={() => handleRemoveReservation(selectedSeat)} className="rounded-md bg-red-600 px-3 py-1 text-sm font-semibold text-white">Remove</button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-slate-600">This seat is not reserved.</p>
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