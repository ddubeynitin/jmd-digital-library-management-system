import { useMemo, useState } from 'react'
import { FiSearch, FiSend, FiMessageSquare, FiUser } from 'react-icons/fi'

const mockStudents = [
  { id: 'stu-001', name: 'Amit Desai', class: '11' },
  { id: 'stu-002', name: 'Priya Sharma', class: '12' },
  { id: 'stu-003', name: 'Jaya D. Patel', class: '9' },
  { id: 'stu-004', name: 'Rajesh Kumar', class: 'Intermediate' },
]

const initialMessages = {
  'stu-001': [
    { sender: 'student', text: 'Hello admin, I need help with my library card.', time: '10:02 AM' },
    { sender: 'admin', text: 'Sure Amit, I can help. Which issue are you facing?', time: '10:05 AM' },
  ],
  'stu-002': [
    { sender: 'student', text: 'Can I renew my book for one more week?', time: '9:20 AM' },
    { sender: 'admin', text: 'Yes, Priya. I will extend it today.', time: '9:24 AM' },
  ],
  'stu-003': [
    { sender: 'student', text: 'When is the next library orientation?', time: '8:45 AM' },
  ],
  'stu-004': [
    { sender: 'student', text: 'My fee receipt is not visible in the app.', time: 'Yesterday' },
    { sender: 'admin', text: 'We are working on that issue, Rajesh.', time: 'Yesterday' },
  ],
}

const AdminMessagePage = () => {
  const [searchText, setSearchText] = useState('')
  const [selectedStudentId, setSelectedStudentId] = useState(mockStudents[0].id)
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState('')

  const activeStudent = useMemo(
    () => mockStudents.find((student) => student.id === selectedStudentId) || mockStudents[0],
    [selectedStudentId],
  )

  const filteredStudents = useMemo(
    () =>
      mockStudents.filter((student) =>
        student.name.toLowerCase().includes(searchText.toLowerCase()) || student.class.toLowerCase().includes(searchText.toLowerCase()),
      ),
    [searchText],
  )

  const conversation = messages[selectedStudentId] || []

  const handleSendMessage = () => {
    const trimmed = newMessage.trim()
    if (!trimmed) return

    const nextMessage = { sender: 'admin', text: trimmed, time: 'Now' }
    setMessages((prev) => ({
      ...prev,
      [selectedStudentId]: [...(prev[selectedStudentId] || []), nextMessage],
    }))
    setNewMessage('')
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-amber-500">Admin Messaging</p>
            <h1 className="mt-2 text-4xl font-semibold text-slate-900">Chat with students</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-600">
              Manage conversations with students, reply quickly, and keep track of open chat threads.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
              <FiMessageSquare className="mr-2 h-4 w-4" /> New Message
            </button>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/10">
            <div className="mb-6 flex items-center gap-3 rounded-3xl bg-slate-50 p-4">
              <FiSearch className="h-5 w-5 text-slate-500" />
              <input
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Search students"
                className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
            </div>

            <div className="space-y-3">
              {filteredStudents.map((student) => (
                <button
                  key={student.id}
                  type="button"
                  onClick={() => setSelectedStudentId(student.id)}
                  className={`w-full rounded-3xl border px-4 py-4 text-left transition ${
                    student.id === selectedStudentId
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                          <FiUser className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{student.name}</p>
                          <p className="text-xs text-slate-500">Class {student.class}</p>
                        </div>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                      Active
                    </span>
                  </div>
                </button>
              ))}
              {filteredStudents.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
                  No students found.
                </div>
              ) : null}
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/10">
            <div className="mb-6 flex flex-col gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-500">Chatting with</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">{activeStudent.name}</h2>
                <p className="text-sm text-slate-500">Class {activeStudent.class}</p>
              </div>
              <div className="rounded-3xl bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                {conversation.length} messages
              </div>
            </div>

            <div className="flex h-[520px] flex-col gap-4 overflow-hidden rounded-[32px] border border-slate-200 bg-slate-100 p-5">
              <div className="flex-1 space-y-4 overflow-y-auto pr-2">
                {conversation.length === 0 ? (
                  <div className="flex h-full items-center justify-center rounded-3xl bg-white p-10 text-sm text-slate-500">
                    No messages yet. Send the first message.
                  </div>
                ) : (
                  conversation.map((message, index) => (
                    <div
                      key={index}
                      className={`max-w-[80%] rounded-3xl px-5 py-4 shadow-sm ${
                        message.sender === 'admin' ? 'ml-auto bg-amber-500 text-white' : 'bg-white text-slate-900'
                      }`}
                    >
                      <p className="whitespace-pre-line text-sm leading-6">{message.text}</p>
                      <p className="mt-2 text-xs text-slate-200 opacity-80">{message.time}</p>
                    </div>
                  ))
                )}
              </div>

              <div className="rounded-3xl bg-white p-4 shadow-sm">
                <label htmlFor="message" className="sr-only">
                  Write a message
                </label>
                <div className="flex gap-3">
                  <input
                    id="message"
                    type="text"
                    value={newMessage}
                    onChange={(event) => setNewMessage(event.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                  />
                  <button
                    type="button"
                    onClick={handleSendMessage}
                    className="inline-flex items-center gap-2 rounded-3xl bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
                  >
                    <FiSend className="h-4 w-4" /> Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminMessagePage
