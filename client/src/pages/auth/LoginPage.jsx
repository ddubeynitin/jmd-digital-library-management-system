import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiZap,
  FiShield,
  FiBook,
  FiKey,
  FiRefreshCw,
  FiSend,
  FiCheckCircle,
} from 'react-icons/fi'
import { saveSession } from '../../lib/session'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

const MODES = {
  PASSWORD: 'password',
  OTP: 'otp',
  RESET: 'reset',
}

const LoginPage = () => {
  const navigate = useNavigate()
  const [mode, setMode] = useState(MODES.PASSWORD)
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [resetOtpSent, setResetOtpSent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const resetTransientState = () => {
    setOtp('')
    setNewPassword('')
    setConfirmPassword('')
    setShowPassword(false)
    setOtpSent(false)
    setResetOtpSent(false)
    setMessage('')
    setError('')
  }

  const switchMode = (nextMode) => {
    setMode(nextMode)
    resetTransientState()
  }

  const handleAuthSuccess = (payload) => {
    saveSession({
      token: payload?.token,
      user: payload?.user,
    })
    navigate('/student/dashboard', { replace: true })
  }

  const handlePasswordLogin = async (event) => {
    event.preventDefault()
    setError('')
    setMessage('')
    setIsSubmitting(true)

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        identifier,
        password,
      })
      handleAuthSuccess(response.data)
    } catch (loginError) {
      setError(loginError?.response?.data?.message || 'Unable to sign in right now.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSendLoginOtp = async (event) => {
    event.preventDefault()
    setError('')
    setMessage('')
    setIsSubmitting(true)

    try {
      await axios.post(`${API_BASE_URL}/auth/login/request-otp`, {
        identifier,
      })
      setOtpSent(true)
      setMessage('OTP sent to your registered email address.')
    } catch (otpError) {
      setError(otpError?.response?.data?.message || 'Unable to send OTP right now.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleVerifyLoginOtp = async (event) => {
    event.preventDefault()
    setError('')
    setMessage('')
    setIsSubmitting(true)

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login/verify-otp`, {
        identifier,
        otp,
      })
      handleAuthSuccess(response.data)
    } catch (verifyError) {
      setError(verifyError?.response?.data?.message || 'Unable to verify OTP right now.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSendResetOtp = async (event) => {
    event.preventDefault()
    setError('')
    setMessage('')
    setIsSubmitting(true)

    try {
      await axios.post(`${API_BASE_URL}/auth/password/request-reset-otp`, {
        identifier,
      })
      setResetOtpSent(true)
      setMessage('Password reset OTP sent to your registered email address.')
    } catch (resetError) {
      setError(resetError?.response?.data?.message || 'Unable to send reset OTP right now.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResetPassword = async (event) => {
    event.preventDefault()
    setError('')
    setMessage('')

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setIsSubmitting(true)

    try {
      await axios.post(`${API_BASE_URL}/auth/password/reset-with-otp`, {
        identifier,
        otp,
        newPassword,
      })

      setMessage('Password updated successfully. You can now sign in with your new password.')
      setMode(MODES.PASSWORD)
      setPassword('')
      setOtp('')
      setNewPassword('')
      setConfirmPassword('')
      setResetOtpSent(false)
    } catch (resetError) {
      setError(resetError?.response?.data?.message || 'Unable to reset password right now.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderAuthForm = () => {
    if (mode === MODES.OTP) {
      return (
        <form onSubmit={otpSent ? handleVerifyLoginOtp : handleSendLoginOtp} className="space-y-6">
          <div>
            <label htmlFor="identifier" className="block text-sm font-semibold text-slate-900">
              Email address or enrollment ID
            </label>
            <div className="relative mt-3">
              <FiMail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                id="identifier"
                name="identifier"
                type="text"
                autoComplete="username"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 py-3 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                placeholder="you@example.com or 12345678"
              />
            </div>
          </div>

          {otpSent ? (
            <div>
              <label htmlFor="otp" className="block text-sm font-semibold text-slate-900">
                Enter OTP
              </label>
              <div className="relative mt-3">
                <FiKey className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  inputMode="numeric"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 py-3 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                  placeholder="6-digit code"
                />
              </div>
            </div>
          ) : null}

          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          {message ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {message}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isSubmitting
              ? 'Working...'
              : otpSent
                ? 'Verify OTP and Sign In'
                : 'Send OTP'}
          </button>
        </form>
      )
    }

    if (mode === MODES.RESET) {
      return (
        <form onSubmit={resetOtpSent ? handleResetPassword : handleSendResetOtp} className="space-y-6">
          <div>
            <label htmlFor="identifier" className="block text-sm font-semibold text-slate-900">
              Email address or enrollment ID
            </label>
            <div className="relative mt-3">
              <FiMail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                id="identifier"
                name="identifier"
                type="text"
                autoComplete="username"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 py-3 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                placeholder="you@example.com or 12345678"
              />
            </div>
          </div>

          {resetOtpSent ? (
            <>
              <div>
                <label htmlFor="otp" className="block text-sm font-semibold text-slate-900">
                  Enter OTP
                </label>
                <div className="relative mt-3">
                  <FiKey className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    inputMode="numeric"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 py-3 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                    placeholder="6-digit code"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-semibold text-slate-900">
                  New password
                </label>
                <div className="relative mt-3">
                  <FiLock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    id="newPassword"
                    name="newPassword"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-12 py-3 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                    placeholder="Create a new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                  >
                    {showPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-900">
                  Confirm new password
                </label>
                <div className="relative mt-3">
                  <FiLock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 py-3 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                    placeholder="Repeat the new password"
                  />
                </div>
              </div>
            </>
          ) : null}

          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          {message ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {message}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isSubmitting
              ? 'Working...'
              : resetOtpSent
                ? 'Reset Password'
                : 'Send Reset OTP'}
          </button>
        </form>
      )
    }

    return (
      <form onSubmit={handlePasswordLogin} className="space-y-6">
        <div>
          <label htmlFor="identifier" className="block text-sm font-semibold text-slate-900">
            Email address or enrollment ID
          </label>
          <div className="relative mt-3">
            <FiMail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              id="identifier"
              name="identifier"
              type="text"
              autoComplete="username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 py-3 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
              placeholder="you@example.com or 12345678"
            />
          </div>
        </div>

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
              onClick={() => setShowPassword((current) => !current)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
            >
              {showPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {message ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {message}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isSubmitting ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    )
  }

  return (
    <div className="min-h-screen bg-[url('images/inside-study-center.jpg')] bg-cover bg-center">
      <div className="relative flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl">
          <div className="overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200/50">
            <div className="grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
              <div className="relative overflow-hidden bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-10 text-white sm:p-12 lg:p-16">
                <div className="absolute right-0 top-0 -mt-8 -mr-8 h-32 w-32 rounded-full bg-slate-700/20 blur-2xl" />
                <div className="absolute left-0 bottom-0 -mb-8 -ml-8 h-40 w-40 rounded-full bg-slate-700/20 blur-3xl" />

                <div className="relative z-10">
                  <div className="mb-12">
                    <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
                      <FiBook className="h-5 w-5" />
                      <span className="text-sm font-semibold">JMD Library</span>
                    </div>
                    <h1 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl">
                      Welcome back to your library
                    </h1>
                    <p className="mt-4 text-base leading-relaxed text-slate-300">
                      Sign in with your email or enrollment ID, use OTP if you prefer, and reset your password from the same screen.
                    </p>
                  </div>

                  <div className="space-y-5">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                        <FiZap className="h-6 w-6 text-amber-300" />
                      </div>
                      <div>
                        <p className="font-semibold">Flexible login</p>
                        <p className="mt-1 text-sm text-slate-400">
                          Use email, enrollment ID, password, or a one-time code.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                        <FiShield className="h-6 w-6 text-green-300" />
                      </div>
                      <div>
                        <p className="font-semibold">Secure by default</p>
                        <p className="mt-1 text-sm text-slate-400">
                          Password reset OTPs are sent only to your registered email address.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                        <FiCheckCircle className="h-6 w-6 text-blue-300" />
                      </div>
                      <div>
                        <p className="font-semibold">Instant dashboard access</p>
                        <p className="mt-1 text-sm text-slate-400">
                          Successful login takes you directly to your student dashboard.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                    <p className="text-sm text-slate-400">Don't have an account?</p>
                    <Link
                      to="/register"
                      className="mt-2 inline-flex items-center gap-2 font-semibold text-white transition hover:gap-3"
                    >
                      Create one now <FiArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="p-8 sm:p-10 lg:p-16">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    Sign in
                  </h2>
                  <p className="mt-3 text-slate-600">
                    Choose how you want to access your account.
                  </p>
                </div>

                <div className="mb-6 grid grid-cols-3 gap-2 rounded-2xl bg-slate-100 p-1">
                  {[
                    { key: MODES.PASSWORD, label: 'Password', icon: FiLock },
                    { key: MODES.OTP, label: 'OTP Login', icon: FiSend },
                    { key: MODES.RESET, label: 'Forgot Password', icon: FiRefreshCw },
                  ].map((item) => {
                    const Icon = item.icon
                    const active = mode === item.key

                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => switchMode(item.key)}
                        className={`inline-flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-xs font-semibold transition sm:text-sm ${
                          active
                            ? 'bg-slate-900 text-white shadow-lg'
                            : 'text-slate-600 hover:bg-white/80 hover:text-slate-900'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </button>
                    )
                  })}
                </div>

                <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                  {mode === MODES.PASSWORD && (
                    <p>Use your registered email address or enrollment ID together with your password.</p>
                  )}
                  {mode === MODES.OTP && (
                    <p>We will send a one-time code to your registered email address, then you can sign in without a password.</p>
                  )}
                  {mode === MODES.RESET && (
                    <p>We will send an OTP to your registered email address so you can create a new password.</p>
                  )}
                </div>

                {renderAuthForm()}

                <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-semibold text-slate-900">Need help signing in?</p>
                  <p className="mt-2 text-sm text-slate-600">
                    If you cannot access your account, use OTP login or password reset from this page. If that still fails, contact the library administrator.
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
