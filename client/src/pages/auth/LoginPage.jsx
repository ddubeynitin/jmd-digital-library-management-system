import { useState } from 'react'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    // TODO: connect with authentication service
    console.log({ email, password, remember })
  }

  return (
    <div className="min-h-screen bg-surface-dark flex items-center justify-center px-4 py-10">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-orange-500 to-surface opacity-90" />
      <div className="relative z-10 w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-card">
        <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="bg-primary text-black p-10 sm:p-12 lg:p-14">
            <div className="mb-10">
              <h1 className="text-4xl font-semibold tracking-tight">JMD Library Login</h1>
              <p className="mt-4 max-w-sm text-sm text-primary/90">
                Secure access for students and staff. Sign in to manage your library dashboard, view books, and track your attendance.
              </p>
            </div>
            <div className="space-y-5 rounded-3xl bg-whiteq/10 p-6 text-sm leading-6 shadow-card">
              <div>
                <p className="font-medium">Fast access</p>
                <p className="mt-2 text-primary/80">Log in quickly with your registered school account and continue where you left off.</p>
              </div>
              <div>
                <p className="font-medium">Secure by design</p>
                <p className="mt-2 text-primary/80">Your credentials remain protected with the latest standard authentication flow.</p>
              </div>
              <div>
                <p className="font-medium">Campus-ready</p>
                <p className="mt-2 text-primary/80">Access attendance, book borrowing records, and student dashboard tools from one place.</p>
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-10 lg:p-14">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Welcome back</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-on-surface">Sign in to your account</h2>
              <p className="mt-3 max-w-md text-sm text-on-surface-variant">
                Enter your login details to continue to the library management system.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-surface px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center justify-between gap-4 text-sm text-on-surface-variant">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                  />
                  Remember me
                </label>
                <button type="button" className="font-medium text-primary hover:text-secondary">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-secondary"
              >
                Sign In
              </button>
            </form>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-surface p-5 text-sm text-on-surface-variant">
              <p className="font-medium">Need help?</p>
              <p className="mt-2">Contact your library administrator if you cannot sign in or if your account is not active.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
