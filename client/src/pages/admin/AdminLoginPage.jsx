import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMail, FiLock, FiEye, FiEyeOff, FiShield, FiUserCheck, FiServer, FiArrowLeft } from 'react-icons/fi'

const AdminLoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    // TODO: connect with admin authentication service
    console.log({ email, password })
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="relative flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-slate-950/40" />
        <div className="relative w-full max-w-6xl overflow-hidden rounded-4xl bg-white/95 shadow-2xl shadow-slate-950/20 ring-1 ring-slate-200/20 backdrop-blur-xl">
          <div className="grid min-h-screen gap-0 lg:grid-cols-2">
            <div className="relative overflow-hidden bg-linear-to-br from-slate-900 via-slate-800 to-slate-950 px-10 py-12 sm:px-12 sm:py-16 lg:px-14 lg:py-20 text-white">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />
              <div className="absolute -left-16 -bottom-16 h-52 w-52 rounded-full bg-amber-400/10 blur-3xl" />

              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold tracking-[0.18em] text-slate-200 shadow-sm shadow-black/10 backdrop-blur-sm">
                    <FiShield className="h-5 w-5 text-cyan-300" />
                    ADMIN PORTAL
                  </div>
                  <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">Secure admin access</h1>
                  <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                    Sign in to manage students, library reports, attendance, and fees from one secure dashboard.
                  </p>
                </div>

                <div className="mt-8 space-y-5 text-sm text-slate-300">
                  <div className="flex gap-4 rounded-3xl bg-white/5 p-4 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.8)]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300">
                      <FiUserCheck className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Admin user control</p>
                      <p className="mt-1 text-slate-400">Only authorised personnel can sign in.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 rounded-3xl bg-white/5 p-4 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.8)]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-300/15 text-amber-300">
                      <FiServer className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Library system overview</p>
                      <p className="mt-1 text-slate-400">Monitor reports, manage users, and view analytics in one place.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 rounded-3xl bg-white/5 p-4 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.8)]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100/10 text-slate-100">
                      <FiLock className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Encrypted credentials</p>
                      <p className="mt-1 text-slate-400">Every login attempt is protected with secure validation.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5 text-slate-300 backdrop-blur-sm">
                  <p className="text-sm font-semibold text-slate-100">Need separate access?</p>
                  <p className="mt-2 text-sm text-slate-400">Use the standard user login if you are not an administrator.</p>
                  <Link to="/login" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200">
                    Go to user login <FiArrowLeft className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center bg-white px-8 py-10 sm:px-10 lg:px-14">
              <div className="w-full max-w-md">
                <div className="mb-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-500">Administrator</p>
                  <h2 className="mt-4 text-3xl font-semibold text-slate-900">Admin Login</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Enter your official admin credentials to continue.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="admin-email" className="block text-sm font-medium text-slate-700">
                      Email address
                    </label>
                    <div className="relative mt-3">
                      <FiMail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        id="admin-email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                        placeholder="admin@example.com"
                        className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 pl-12 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="admin-password" className="block text-sm font-medium text-slate-700">
                      Password
                    </label>
                    <div className="relative mt-3">
                      <FiLock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        id="admin-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                        placeholder="Enter your password"
                        className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 pl-12 pr-12 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-700"
                      >
                        {showPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <label className="inline-flex items-center gap-2 text-sm text-slate-600">
                      <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500" />
                      Remember me
                    </label>
                    <button type="button" className="text-sm font-semibold text-cyan-600 transition hover:text-cyan-500">
                      Forgot password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800 active:scale-[0.99]"
                  >
                    Sign in as Admin
                  </button>
                </form>

                <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-semibold text-slate-900">Admin support</p>
                  <p className="mt-2 text-sm text-slate-600">
                    If you have problems logging in, contact the library IT team for assistance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLoginPage