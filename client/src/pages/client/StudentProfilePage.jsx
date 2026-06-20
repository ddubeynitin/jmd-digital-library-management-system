import React from 'react'
import SideMenuPanel from "../../components/SideMenuPanel";

const StudentProfilePage = () => {
  return (
    <>
      <div className="min-h-screen bg-slate-100 text-slate-900">
        <div className="mx-auto flex min-h-screen max-w-[1600px] gap-6 px-4 py-6 xl:px-10">
          <SideMenuPanel />

          <main className="flex-1">
            <div className="rounded-[40px] border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/20">
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-amber-500">Profile</p>
                  <h1 className="mt-2 text-3xl font-semibold text-slate-900">Student Profile</h1>
                  <p className="mt-2 text-sm text-slate-500">
                    Personal information, contact details, and enrollment status.
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-50 px-5 py-4 text-sm text-slate-700">
                  <p className="font-semibold text-slate-900">Enrollment Status</p>
                  <p className="mt-2 text-xl font-semibold text-emerald-600">Active</p>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
                <section className="space-y-4 rounded-[32px] border border-slate-200 bg-slate-50 p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-[28px] bg-slate-900 text-4xl font-semibold text-white flex items-center justify-center">
                      JD
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Student ID</p>
                      <p className="mt-1 text-2xl font-semibold text-slate-900">JMD-2026-1023</p>
                    </div>
                  </div>

                  <div className="space-y-3 rounded-[28px] bg-white p-5 shadow-sm shadow-slate-200/50">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Name</p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">Jaya D. Patel</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Program</p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">B.Sc. Library Science</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Year</p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">2nd Year</p>
                    </div>
                  </div>
                </section>

                <section className="rounded-[32px] border border-slate-200 bg-white p-8">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Email</p>
                      <p className="mt-2 text-base font-semibold text-slate-900">jaya.patel@jmdlibrary.edu</p>
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Phone</p>
                      <p className="mt-2 text-base font-semibold text-slate-900">+91 98765 43210</p>
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Guardian</p>
                      <p className="mt-2 text-base font-semibold text-slate-900">Anita Patel</p>
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Admission Date</p>
                      <p className="mt-2 text-base font-semibold text-slate-900">August 18, 2024</p>
                    </div>
                  </div>

                  <div className="mt-8 grid gap-6 sm:grid-cols-2">
                    <div className="rounded-3xl bg-slate-50 p-5">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Birthdate</p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">March 10, 2006</p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-5">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Branch</p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">Digital Library</p>
                    </div>
                  </div>

                  <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Address</p>
                    <p className="mt-3 text-sm leading-6 text-slate-700">
                      24 Sunrise Avenue, Sector 14, Vadodara, Gujarat, India
                    </p>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <button className="inline-flex items-center justify-center rounded-3xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                      Edit Profile
                    </button>
                    <button className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
                      Download Info
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default StudentProfilePage