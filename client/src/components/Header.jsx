import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
        <Link to="/" className="flex items-center gap-3 text-slate-900">
          <img src="images/JMD_logo_2.png" alt="JMD Logo" className="h-12 w-12 rounded-full border border-slate-200 bg-white object-cover" />
          <div>
            <p className="text-lg font-semibold">JMD Library</p>
            <p className="text-xs text-slate-500">Digital Library Portal</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <Link to="/" className="transition hover:text-slate-900">Home</Link>
          <Link to="/student/dashboard" className="transition hover:text-slate-900">Student Dashboard</Link>
          <Link to="/admin/dashboard" className="transition hover:text-slate-900">Admin Dashboard</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 md:inline-flex"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header