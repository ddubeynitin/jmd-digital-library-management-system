import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FiBookOpen, FiUsers, FiShield, FiCalendar } from 'react-icons/fi'

const features = [
  {
    title: 'Seat reservation made simple',
    description: 'View seat availability and reserved locations at a glance with a clean admin layout.',
    icon: FiBookOpen,
  },
  {
    title: 'Student-first dashboard',
    description: 'Students can track attendance, fees, and their profile with fast access.',
    icon: FiUsers,
  },
  {
    title: 'Secure campus workflows',
    description: 'Keep student records organized with a structured library management template.',
    icon: FiShield,
  },
  {
    title: 'Attendance and fee tracking',
    description: 'Centralize core library services in a modern interface that supports campus operations.',
    icon: FiCalendar,
  },
]

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="relative overflow-hidden">
        <div className="absolute left-1/2 top-0 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-amber-200/30 blur-3xl md:h-72 md:w-72" />
        <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="max-w-2xl">
              <span className="inline-flex rounded-full bg-amber-100 px-4 py-1 text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
                Library management
              </span>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                A modern campus library dashboard for students and admins.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Build trust with a polished digital library experience. Reserve seats, monitor attendance, manage fees, and keep student profiles organized from one beautiful template.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  Sign In
                </Link>
              </div>
              <div className="mt-12 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                  <p className="text-3xl font-semibold text-slate-900">17+</p>
                  <p className="mt-2 text-sm text-slate-500">Library seats designed for intuitive layout</p>
                </div>
                <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                  <p className="text-3xl font-semibold text-slate-900">4</p>
                  <p className="mt-2 text-sm text-slate-500">Core modules: attendance, fees, profile, admin seating</p>
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <div className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-2xl">
                <div className="bg-slate-950 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Library view</p>
                      <p className="mt-3 text-2xl font-semibold">Study hall</p>
                    </div>
                    <div className="rounded-2xl bg-white/10 px-3 py-2 text-xs uppercase text-slate-300">Inside View</div>
                  </div>
                </div>
                <img
                  src="/images/library_img.jpg"
                  alt="Library seat reservation dashboard showing reserved seats in yellow and available seats in white."
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-16 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">
                Why JMD Library?
              </span>
              <h2 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Clean workflows for admins and students.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                This landing page is designed to show the key capabilities of your library management system with bright visual hierarchy, clear calls to action, and accessible information architecture.
              </p>
              <div className="mt-10 space-y-4">
                <div className="flex gap-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                    <FiBookOpen className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Visual seat planning</p>
                    <p className="text-sm text-slate-600">Show reserved seats in yellow and give admins instant visibility.</p>
                  </div>
                </div>
                <div className="flex gap-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
                    <FiUsers className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Student experience</p>
                    <p className="text-sm text-slate-600">Students can quickly access attendance, fees, and profile information from one place.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <div key={feature.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-slate-900">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Home;
