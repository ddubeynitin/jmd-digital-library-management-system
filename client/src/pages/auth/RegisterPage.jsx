import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiUser,
  FiMail,
  FiArrowRight,
  FiUsers,
  FiCheckCircle,
  FiBook,
  FiPhone,
  FiMapPin,
  FiHash,
  FiLayers,
  FiCalendar,
  FiCamera,
} from 'react-icons/fi'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    studentClass: '',
    batch: '',
    duration: '',
    seatNumber: '',
    address: '',
    city: '',
    state: '',
    profilePicture: null,
  })
  const [photoPreview, setPhotoPreview] = useState(null)
  const [generatedCredentials, setGeneratedCredentials] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const API_BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000/api'

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, profilePicture: file }))
    setPhotoPreview(file ? URL.createObjectURL(file) : null)
  }

  const generateStudentId = (name = 'STU') => {
    const prefix = name
      .trim()
      .split(' ')
      .map((part) => part[0]?.toUpperCase() || '')
      .slice(0, 3)
      .join('')
      .padEnd(3, 'X')
    const suffix = Date.now().toString().slice(-5)
    return `JMD-${prefix}-${suffix}`
  }

  const generatePassword = (length = 10) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%'
    return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('')
  }

  const validateForm = () => {
    const requiredFields = ['fullName', 'email', 'phone', 'gender', 'studentClass', 'batch', 'duration', 'seatNumber']
    return requiredFields.every((field) => formData[field]?.trim())
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setGeneratedCredentials(null)

    if (!validateForm()) {
      setErrorMessage('Please fill in all required fields before submitting.')
      return
    }

    setIsSubmitting(true)

    const enrollmentId = generateStudentId(formData.fullName)
    const tempPassword = generatePassword()

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          gender: formData.gender,
          studentClass: formData.studentClass,
          batch: formData.batch,
          duration: formData.duration,
          seatNumber: formData.seatNumber,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          studentId: enrollmentId,
          password: tempPassword,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed')
      }

      setGeneratedCredentials({ enrollmentId, tempPassword })
    } catch (error) {
      setErrorMessage(error.message || 'Unable to register at this time.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[url('images/inside-study-center.jpg')] bg-cover bg-center">
      <div className="relative flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl">
          <div className="overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-slate-200/50">
            <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative overflow-hidden bg-gradient-to-br from-orange-900 via-orange-800 to-orange-900 p-10 text-white sm:p-12 lg:p-16">
                <div className="absolute right-0 top-0 -mt-8 -mr-8 h-32 w-32 rounded-full bg-orange-700/20 blur-2xl" />
                <div className="absolute left-0 bottom-0 -mb-8 -ml-8 h-40 w-40 rounded-full bg-orange-700/20 blur-3xl" />
                <div className="relative z-10">
                  <div className="mb-12">
                    <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
                      <FiBook className="h-5 w-5" />
                      <span className="text-sm font-semibold">JMD Library</span>
                    </div>
                    <h1 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl">Student enrollment starts here</h1>
                    <p className="mt-4 text-base leading-relaxed text-white/90">
                      Fill in your registration details and we will generate your student enrollment number and login password.
                    </p>
                  </div>

                  <div className="space-y-5">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                        <FiUsers className="h-6 w-6 text-emerald-300" />
                      </div>
                      <div>
                        <p className="font-semibold">One registration</p>
                        <p className="mt-1 text-sm text-gray-300">Register once and use the same credentials for library services.</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                        <FiCheckCircle className="h-6 w-6 text-cyan-300" />
                      </div>
                      <div>
                        <p className="font-semibold">Automatic credentials</p>
                        <p className="mt-1 text-sm text-gray-300">Your enrollment ID and password are generated automatically after registration.</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                        <FiBook className="h-6 w-6 text-blue-300" />
                      </div>
                      <div>
                        <p className="font-semibold">Ready for login</p>
                        <p className="mt-1 text-sm text-gray-300">Use your generated credentials to sign in immediately.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                    <p className="text-sm text-emerald-100">Already registered?</p>
                    <Link to="/login" className="mt-2 inline-flex items-center gap-2 font-semibold text-white transition hover:gap-3">
                      Sign in to your account <FiArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="p-8 sm:p-10 lg:p-16">
                <div className="mb-10">
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Student registration form</h2>
                  <p className="mt-3 text-slate-600">
                    Enter your details and get your enrollment number and password right away.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMessage ? (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {errorMessage}
                    </div>
                  ) : null}

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <label htmlFor="fullName" className="block text-sm font-semibold text-slate-900">
                        Full name
                      </label>
                      <div className="relative mt-3">
                        <FiUser className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 py-3 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

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
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 py-3 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                          placeholder="you@school.edu"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-slate-900">
                        Phone number
                      </label>
                      <div className="relative mt-3">
                        <FiPhone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 py-3 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                          placeholder="123-456-7890"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="gender" className="block text-sm font-semibold text-slate-900">
                        Gender
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                        className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                      >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="studentClass" className="block text-sm font-semibold text-slate-900">
                        Current Study Class
                      </label>
                      <select
                        id="studentClass"
                        name="studentClass"
                        value={formData.studentClass}
                        onChange={handleChange}
                        required
                        className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                      >
                        <option value="">Select class</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="High School">High School</option>
                        <option value="11">11</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Graduation">Graduation</option>
                        <option value="Post Graduation">Post Graduation</option>
                      </select>
                    </div>

                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="profilePicture" className="block text-sm font-semibold text-slate-900">
                        Profile photo
                      </label>
                      <div className="relative mt-3">
                        <FiCamera className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                        <input
                          id="profilePicture"
                          name="profilePicture"
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 py-3 text-slate-slate-900 outline-none transition file:mr-4 file:rounded-full file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                        />
                      </div>
                      {photoPreview ? (
                        <div className="mt-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                          <p className="text-sm font-semibold text-slate-900">Preview</p>
                          <img src={photoPreview} alt="Profile preview" className="mt-3 h-28 w-28 rounded-3xl object-cover" />
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="address" className="block text-sm font-semibold text-slate-900">
                        Address
                      </label>
                      <div className="relative mt-3">
                        <FiMapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                        <input
                          id="address"
                          name="address"
                          type="text"
                          value={formData.address}
                          onChange={handleChange}
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 py-3 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                          placeholder="123 Main St"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="city" className="block text-sm font-semibold text-slate-900">
                        City
                      </label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleChange}
                        className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                        placeholder="Mumbai"
                      />
                    </div>

                    <div>
                      <label htmlFor="state" className="block text-sm font-semibold text-slate-900">
                        State
                      </label>
                      <input
                        id="state"
                        name="state"
                        type="text"
                        value={formData.state}
                        onChange={handleChange}
                        className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                        placeholder="Maharashtra"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-400"
                  >
                    {isSubmitting ? 'Registering...' : 'Register and generate credentials'}
                  </button>
                </form>

                {generatedCredentials ? (
                  <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900">Your enrollment details</h3>
                    <p className="mt-2 text-sm text-slate-600">
                      Save these credentials now. You can use them to sign in on the login page.
                    </p>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-3xl bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-slate-500">Enrollment ID</p>
                        <p className="mt-2 text-xl font-semibold text-slate-900">{generatedCredentials.enrollmentId}</p>
                      </div>
                      <div className="rounded-3xl bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-slate-500">Temporary password</p>
                        <p className="mt-2 text-xl font-semibold text-slate-900">{generatedCredentials.tempPassword}</p>
                      </div>
                    </div>

                    <div className="mt-5 rounded-2xl bg-slate-900/5 p-4 text-sm text-slate-700">
                      <p className="font-semibold">Note:</p>
                      <p className="mt-2">Use your email address plus the generated password to sign in. Store your enrollment ID securely.</p>
                    </div>
                  </div>
                ) : null}

                <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-semibold text-slate-900">Already have an account?</p>
                  <Link to="/login" className="mt-2 inline-flex items-center gap-2 font-semibold text-slate-900 transition hover:gap-3 hover:text-slate-700">
                    Sign in <FiArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage

