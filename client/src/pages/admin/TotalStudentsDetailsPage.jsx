import { useMemo, useState } from 'react'

const sampleStudents = [
  {
    id: 1,
    name: 'Aarav Patel',
    registrationNo: 'STD-1001',
    studentClass: 'Grade 9',
    section: 'A',
    status: 'Active',
    feesDue: '₹1,200',
  },
  {
    id: 2,
    name: 'Sanya Sharma',
    registrationNo: 'STD-1002',
    studentClass: 'Grade 10',
    section: 'B',
    status: 'Pending',
    feesDue: '₹0',
  },
  {
    id: 3,
    name: 'Rohan Gupta',
    registrationNo: 'STD-1003',
    studentClass: 'Grade 8',
    section: 'C',
    status: 'Inactive',
    feesDue: '₹650',
  },
  {
    id: 4,
    name: 'Meera Joshi',
    registrationNo: 'STD-1004',
    studentClass: 'Grade 9',
    section: 'B',
    status: 'Active',
    feesDue: '₹0',
  },
  {
    id: 5,
    name: 'Devansh Rao',
    registrationNo: 'STD-1005',
    studentClass: 'Grade 10',
    section: 'A',
    status: 'Active',
    feesDue: '₹2,300',
  },
]

const studentClasses = ['All', 'Grade 8', 'Grade 9', 'Grade 10']
const studentStatuses = ['All', 'Active', 'Inactive', 'Pending']

const TotalStudentsDetailsPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedClass, setSelectedClass] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')

  const filteredStudents = useMemo(() => {
    return sampleStudents.filter((student) => {
      const searchLower = searchQuery.trim().toLowerCase()
      const matchesSearch =
        student.name.toLowerCase().includes(searchLower) ||
        student.registrationNo.toLowerCase().includes(searchLower) ||
        student.section.toLowerCase().includes(searchLower)

      const matchesClass =
        selectedClass === 'All' || student.studentClass === selectedClass
      const matchesStatus =
        selectedStatus === 'All' || student.status === selectedStatus

      return matchesSearch && matchesClass && matchesStatus
    })
  }, [searchQuery, selectedClass, selectedStatus])

  return (
    <div className='min-h-screen bg-slate-100 text-slate-900'>
      <div className='mx-auto max-w-screen-2xl px-4 py-6 xl:px-10'>
        <div className='mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
          <div>
            <p className='text-sm uppercase tracking-[0.24em] text-amber-500'>Student Records</p>
            <h1 className='mt-2 text-3xl font-semibold text-slate-900'>Total Students</h1>
            <p className='mt-2 max-w-2xl text-sm text-slate-500'>Browse all enrolled students and narrow the results using search or filters.</p>
          </div>
          <div className='rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm'>
            <p className='text-xs uppercase tracking-[0.24em] text-slate-400'>Filtered Results</p>
            <p className='mt-1 text-3xl font-semibold text-slate-900'>{filteredStudents.length}</p>
          </div>
        </div>

        <div className='mb-6 grid gap-4 md:grid-cols-3'>
          <label className='block'>
            <span className='text-sm font-medium text-slate-700'>Search students</span>
            <input
              type='search'
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder='Search by name, reg no, or section'
              className='mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100'
            />
          </label>

          <label className='block'>
            <span className='text-sm font-medium text-slate-700'>Filter by class</span>
            <select
              value={selectedClass}
              onChange={(event) => setSelectedClass(event.target.value)}
              className='mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100'
            >
              {studentClasses.map((className) => (
                <option key={className} value={className}>
                  {className}
                </option>
              ))}
            </select>
          </label>

          <label className='block'>
            <span className='text-sm font-medium text-slate-700'>Filter by status</span>
            <select
              value={selectedStatus}
              onChange={(event) => setSelectedStatus(event.target.value)}
              className='mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100'
            >
              {studentStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className='overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm'>
          <table className='min-w-full text-left text-sm'>
            <thead className='bg-slate-950 text-white'>
              <tr>
                <th className='px-6 py-4 font-medium'>Name</th>
                <th className='px-6 py-4 font-medium'>Registration</th>
                <th className='px-6 py-4 font-medium'>Class</th>
                <th className='px-6 py-4 font-medium'>Section</th>
                <th className='px-6 py-4 font-medium'>Status</th>
                <th className='px-6 py-4 font-medium'>Fees Due</th>
              </tr>
            </thead>
            <tbody className='bg-white text-slate-700'>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, index) => (
                  <tr
                    key={student.id}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                  >
                    <td className='px-6 py-4 font-medium text-slate-900'>{student.name}</td>
                    <td className='px-6 py-4'>{student.registrationNo}</td>
                    <td className='px-6 py-4'>{student.studentClass}</td>
                    <td className='px-6 py-4'>{student.section}</td>
                    <td className='px-6 py-4'>
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          student.status === 'Active'
                            ? 'bg-emerald-100 text-emerald-700'
                            : student.status === 'Pending'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className='px-6 py-4'>{student.feesDue}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='6' className='px-6 py-12 text-center text-sm text-slate-500'>
                    No students match the current search or filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TotalStudentsDetailsPage