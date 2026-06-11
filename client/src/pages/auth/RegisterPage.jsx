import { useState } from 'react'
import { Link } from 'react-router-dom'

const RegisterPage = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    // TODO: connect with registration service
    console.log({ fullName, email, password, confirmPassword })
  }

  return (
    <div className="min-h-screen bg-surface-dark flex items-center justify-center px-4 py-10">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-orange-500 to-surface opacity-90" />
      <div className="relative z-10 w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-card">
        <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="bg-primary text-black p-10 sm:p-12 lg:p-14">
            <div className="mb-10">
              <h1 className="text-4xl font-semibold tracking-tight">Create your account</h1>
              <p className="mt-4 max-w-sm text-sm text-primary/90">
                Join JMD Library to reserve books, track attendance, and manage your student dashboard.
              </p>
            </div>
            <div className="space-y-5 rounded-3xl bg-white/10 p-6 text-sm leading-6 shadow-card">
              <div>
                <p className="font-medium">Student-first</p>
                <p className="mt-2 text-primary/80">Register once and access borrowing history, course materials and campus resources.</p>
              </div>
              <div>
                <p className="font-medium">Safe registration</p>
                <p className="mt-2 text-primary/80">We keep your student data private and help you get online quickly.</p>
              </div>
              <div>
                <p className="font-medium">One account</p>
                <p className="mt-2 text-primary/80">Use the same login for attendance tracking, fees, library access, and dashboard tools.</p>
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-10 lg:p-14">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Register now</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-on-surface">Start your library journey</h2>
              <p className="mt-3 max-w-md text-sm text-on-surface-variant">
                Create a new account to begin borrowing books, viewing attendance, and accessing digital library resources.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-on-surface-variant">
                  Full name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-surface px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-on-surface-variant">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-surface px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="you@school.edu"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-on-surface-variant">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-surface px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Create a strong password"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-on-surface-variant">
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-surface px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Repeat your password"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-secondary"
              >
                Create account
              </button>
            </form>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-surface p-5 text-sm text-on-surface-variant">
              <p className="font-medium">Already have an account?</p>
              <p className="mt-2">
                <Link to="/login" className="font-semibold text-primary hover:text-secondary">
                  Log in here
                </Link>{' '}
                to access the library dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
