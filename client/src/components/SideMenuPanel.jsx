import React from 'react'
import { NavLink, Link, useNavigate } from "react-router-dom";
import { clearSession, getSessionUser } from '../lib/session';

const SideMenuPanel = () => {
  const user = getSessionUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearSession();
    navigate('/login', { replace: true });
  };

  return (
    <>
         <aside className="hidden w-72 flex-col rounded-4xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/30 lg:flex">
            <div className="mb-8 flex items-center gap-3 rounded-3xl bg-slate-100 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-slate-950 font-semibold">
                {user?.name?.slice(0, 2)?.toUpperCase() || 'ST'}
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-amber-500">
                  JMD Digital
                </p>
                <p className="text-lg font-semibold text-slate-900">
                  {user?.name || 'Student Portal'}
                </p>
              </div>
            </div>

            <nav className="space-y-2">
              {[
                { label: "Dashboard", to: "/student/dashboard" },
                { label: "Attendance", to: "/student/attendance" },
                { label: "Fees", to: "/student/fees" },
                { label: "Profile", to: "/student/profile" },
              ].map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={({ isActive }) =>
                    `block rounded-3xl px-5 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-black text-yellow-400"
                        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="mt-auto space-y-4">
              <Link
                to="#"
                className="block rounded-3xl bg-amber-500 px-5 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
              >
                Book a Desk
              </Link>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">Settings</p>
                <p className="mt-3 text-xs text-slate-500">
                  Manage your profile, notifications, and preferences.
                </p>
              </div>

              <Link
                to="/login"
                onClick={(event) => {
                  event.preventDefault();
                  handleLogout();
                }}
                className="inline-flex w-full items-center justify-center rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Logout
              </Link>
            </div>
          </aside>
    </>
  )
}

export default SideMenuPanel
