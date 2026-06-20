import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 sm:px-8 lg:px-10 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-lg font-semibold text-slate-900">JMD Library</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
            A clean template for campus library management with seat reservations, attendance, and fee tracking.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
          <Link to="/" className="transition hover:text-slate-900">Home</Link>
          <Link to="/login" className="transition hover:text-slate-900">Login</Link>
          <Link to="/register" className="transition hover:text-slate-900">Register</Link>
        </div>
      </div>
      <div className="border-t border-slate-100 bg-slate-50 px-6 py-4 text-center text-sm text-slate-500 sm:px-8 lg:px-10">
        © 2026 JMD Library. Built for campus and student success.
      </div>
    </footer>
  )
}

export default Footer