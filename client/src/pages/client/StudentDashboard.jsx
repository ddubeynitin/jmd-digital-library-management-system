import { Link } from "react-router-dom";

const StudentDashboard = () => {
  const stats = [
    { label: "Current Batch", value: "8AM - 2PM", badge: "Active" },
    { label: "Attendance %", value: "94.2%", badge: "+2%" },
    { label: "Fee Status", value: "No Due", badge: "Paid" },
  ];

  const attendanceDays = [
    { day: "Mon", value: 72 },
    { day: "Tue", value: 92 },
    { day: "Wed", value: 82 },
    { day: "Thu", value: 68 },
    { day: "Fri", value: 88 },
    { day: "Sat", value: 54 },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-[1600px] gap-6 px-4 py-6 xl:px-10">
        <aside className="hidden w-72 flex-col rounded-[32px] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/30 lg:flex">
          <div className="mb-8 flex items-center gap-3 rounded-3xl bg-slate-100 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-slate-950 font-semibold">
              JD
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-amber-500">JMD Digital</p>
              <p className="text-lg font-semibold text-slate-900">Student Portal</p>
            </div>
          </div>

          <nav className="space-y-2 text-slate-300">
            {[
              { label: "Dashboard", active: true },
              { label: "Attendance" },
              { label: "Fees" },
              { label: "Profile" },
            ].map((item) => (
              <Link
                key={item.label}
                to="#"
                className={`block rounded-3xl px-5 py-3 text-sm font-medium transition ${
                  item.active
                    ? "bg-slate-950 text-amber-300 shadow-[0_10px_30px_-20px_rgba(245,158,11,0.9)]"
                    : "hover:bg-slate-800 hover:text-white"
                }`}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto space-y-4">
            <Link
              to="#"
              className="block rounded-3xl bg-amber-500 px-5 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-amber-400">
              Book a Desk
            </Link>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              <p className="font-semibold text-slate-900">Settings</p>
              <p className="mt-3 text-xs text-slate-500">Manage your profile, notifications, and preferences.</p>
            </div>

            <Link
              to="#"
              className="inline-flex w-full items-center justify-center rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
              Logout
            </Link>
          </div>
        </aside>

        <main className="flex-1">
          <div className="mb-8 flex flex-col gap-6 rounded-[32px] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/30">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Welcome, Rahul Sharma</p>
                <p className="mt-2 text-4xl font-semibold text-slate-900">Student Dashboard</p>
                <p className="mt-2 max-w-2xl text-sm text-slate-500">
                  Seat #24 · Premium Zone
                </p>
              </div>
              <div className="inline-flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-700">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500 text-slate-950">
                  📚
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Current Zone</p>
                  <p className="text-sm font-semibold text-slate-900">Premium Zone</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {stats.map((item) => (
                <div key={item.label} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/20">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-slate-500">{item.label}</p>
                      <p className="mt-3 text-2xl font-semibold text-slate-900">{item.value}</p>
                    </div>
                    <span className="rounded-2xl bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
                      {item.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
            <section className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/30">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Weekly Attendance</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">This Week</p>
                </div>
                <div className="inline-flex rounded-3xl bg-slate-50 p-2 text-sm text-slate-700">
                  <button className="rounded-3xl px-4 py-2 font-semibold text-slate-900">This Week</button>
                  <button className="rounded-3xl px-4 py-2 text-slate-500 transition hover:text-slate-900">Last Week</button>
                </div>
              </div>

              <div className="grid grid-cols-6 items-end gap-4 h-56">
                {attendanceDays.map((item) => (
                  <div key={item.day} className="flex flex-col items-center gap-3">
                    <div className="relative flex h-full w-full items-end justify-center">
                      <div className="absolute bottom-0 h-full w-full rounded-3xl bg-slate-800/80"></div>
                      <div className="relative mx-auto flex h-full w-full items-end justify-center">
                        <div
                          className="w-full rounded-3xl bg-amber-500 transition-all"
                          style={{ height: `${item.value}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm text-slate-300">{item.day}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-500">Attendance is tracking consistently well. Keep up the strong presence in your study sessions.</p>
            </section>

            <aside className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/30">
              <div className="space-y-4 rounded-[28px] bg-slate-50 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Library Updates</p>
                    <p className="mt-2 text-xl font-semibold text-slate-900">Latest Notices</p>
                  </div>
                  <span className="rounded-3xl bg-slate-100 px-3 py-2 text-xs uppercase tracking-[0.18em] text-slate-600">New</span>
                </div>

                <div className="space-y-3">
                  <div className="rounded-3xl border border-slate-200 bg-white p-4">
                    <p className="text-sm font-semibold text-slate-900">High Speed Fiber Live</p>
                    <p className="mt-2 text-sm text-slate-500">500Mbps connection now available in Zone A.</p>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-white p-4">
                    <p className="text-sm font-semibold text-slate-900">Sunday Timings</p>
                    <p className="mt-2 text-sm text-slate-500">Library will be open from 10AM to 6PM this Sunday.</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-slate-500">New Arrival</p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">UPSC GS Paper I - 2024 Edition</p>
                    </div>
                    <button className="rounded-3xl bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-600 hover:bg-slate-200">
                      View
                    </button>
                  </div>
                  <p className="mt-3 text-sm text-slate-500">Available for checkout in Reference Section.</p>
                </div>

                <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-slate-500">Membership Renewal</p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">Your premium plan expires in 12 days.</p>
                    </div>
                    <button className="rounded-3xl bg-amber-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-950 hover:bg-amber-400">
                      Renew Now
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Facility Status</p>
                <div className="mt-4 grid gap-3">
                  {[
                    { label: "AC Active", icon: "❄️" },
                    { label: "WiFi Stable", icon: "📶" },
                    { label: "Fans Off", icon: "🌀" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between rounded-3xl bg-white px-4 py-3 text-sm text-slate-700">
                      <span className="flex items-center gap-2">
                        <span>{item.icon}</span>
                        {item.label}
                      </span>
                      <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-600">OK</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
