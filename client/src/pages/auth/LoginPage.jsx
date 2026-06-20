import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiZap, FiShield, FiBook } from 'react-icons/fi'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    // TODO: connect with authentication service
    console.log({ email, password, remember })
  }

  return (
    <div className="min-h-screen bg-[url('images/inside-study-center.jpg')]">
      <div className="relative flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl">
          <div className="overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200/50">
            <div className="grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
              {/* Left Panel - Branding & Benefits */}
              <div className="relative overflow-hidden bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-10 text-white sm:p-12 lg:p-16">
                <div className="absolute right-0 top-0 -mt-8 -mr-8 h-32 w-32 rounded-full bg-slate-700/20 blur-2xl" />
                <div className="absolute left-0 bottom-0 -mb-8 -ml-8 h-40 w-40 rounded-full bg-slate-700/20 blur-3xl" />

                <div className="relative z-10">
                  <div className="mb-12">
                    <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
                      <FiBook className="h-5 w-5" />
                      <span className="text-sm font-semibold">JMD Library</span>
                    </div>
                    <h1 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl">Welcome back to your library</h1>
                    <p className="mt-4 text-base leading-relaxed text-slate-300">
                      Access your dashboard, manage seat reservations, track attendance, and more.
                    </p>
                  </div>

                  <div className="space-y-5">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                        <FiZap className="h-6 w-6 text-amber-300" />
                      </div>
                      <div>
                        <p className="font-semibold">Quick access</p>
                        <p className="mt-1 text-sm text-slate-400">Sign in instantly with your registered account credentials.</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                        <FiShield className="h-6 w-6 text-green-300" />
                      </div>
                      <div>
                        <p className="font-semibold">Secure by default</p>
                        <p className="mt-1 text-sm text-slate-400">Your credentials are encrypted and never shared with third parties.</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                        <FiBook className="h-6 w-6 text-blue-300" />
                      </div>
                      <div>
                        <p className="font-semibold">Full dashboard access</p>
                        <p className="mt-1 text-sm text-slate-400">View your attendance, fees, profile, and reserved seats instantly.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                    <p className="text-sm text-slate-400">Don't have an account?</p>
                    <Link to="/register" className="mt-2 inline-flex items-center gap-2 font-semibold text-white transition hover:gap-3">
                      Create one now <FiArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Panel - Login Form */}
              <div className="p-8 sm:p-10 lg:p-16">
                <div className="mb-10">
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Sign in</h2>
                  <p className="mt-3 text-slate-600">Enter your credentials to access your library account.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-900">
                      Email address
                    </label>
                    <div className="relative mt-3">
                      <FiMail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 py-3 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-slate-900">
                      Password
                    </label>
                    <div className="relative mt-3">
                      <FiLock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-12 py-3 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                      >
                        {showPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember & Forgot */}
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <label className="inline-flex cursor-pointer items-center gap-2 text-slate-600 transition hover:text-slate-900">
                      <input
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                      />
                      <span className="font-medium">Remember me</span>
                    </label>
                    <button type="button" className="font-medium text-slate-900 transition hover:text-slate-600">
                      Forgot password?
                    </button>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-95"
                  >
                    Sign In
                  </button>
                </form>

                {/* Help Section */}
                <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-semibold text-slate-900">Need help signing in?</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Contact your library administrator if you cannot access your account or have forgotten your password.
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

export default LoginPage

