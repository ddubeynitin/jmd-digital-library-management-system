import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FiUser,
  FiMail,
  FiArrowRight,
  FiUsers,
  FiCheckCircle,
  FiBook,
  FiPhone,
  FiMapPin,
  FiCamera,
  FiAlertCircle,
} from "react-icons/fi";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    studentClass: "",
    branchId: "main",
    duration: "",
    seatNumber: "",
    address: "",
    city: "",
    state: "",
    profilePicture: null,
  });
  const [slots, setSlots] = useState([]);
  const [seats, setSeats] = useState([]);
  const [selectedSlotIds, setSelectedSlotIds] = useState([]);
  const [slotLoading, setSlotLoading] = useState(false);
  const [seatLoading, setSeatLoading] = useState(false);
  const [slotError, setSlotError] = useState("");
  const [seatError, setSeatError] = useState("");
  const [photoPreview, setPhotoPreview] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "branchId" || name === "duration" ? { seatNumber: "" } : {}),
    }));
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, profilePicture: file }));
    setPhotoPreview(file ? URL.createObjectURL(file) : null);
  };

  const fileToDataUrl = (file) =>
    new Promise((resolve, reject) => {
      if (!file) {
        resolve(null);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Unable to read image file'));
      reader.readAsDataURL(file);
    });

  const validateForm = () => {
    const requiredFields = [
      "fullName",
      "email",
      "phone",
      "gender",
      "studentClass",
      "branchId",
      "duration",
    ];
    return requiredFields.every((field) => String(formData[field] || "").trim());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setRegistrationSuccess(false);

    if (!validateForm()) {
      setErrorMessage("Please fill in all required fields before submitting.");
      return;
    }

    if (!formData.seatNumber) {
      setErrorMessage("Please select an available seat before submitting.");
      return;
    }

    if (formData.duration === "6 Hour Membership" && selectedSlotIds.length !== 1) {
      setErrorMessage("Please choose one slot for 6 hour membership.");
      return;
    }

    setIsSubmitting(true);

    try {
      const profilePicture = await fileToDataUrl(formData.profilePicture);
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
        studentClass: formData.studentClass,
        branchId: formData.branchId,
        duration: formData.duration,
        seatNumber: formData.seatNumber,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        profilePicture,
      });

      if (response.status === 201 || response.status === 200) {
        setRegistrationSuccess(true);
      }
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message || error.message || "Unable to register at this time.",
      );
      setRegistrationSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchSlots = async () => {
      setSlotError("");
      setSlotLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/slots`, {
          params: { branchId: formData.branchId },
        });
        setSlots(response.data.data || []);
      } catch (error) {
        setSlotError(
          error?.response?.data?.message || error.message || "Unable to load slot data.",
        );
        setSlots([]);
      } finally {
        setSlotLoading(false);
      }
    };

    fetchSlots();
  }, [formData.branchId]);

  useEffect(() => {
    const fetchSeats = async () => {
      if (!formData.branchId) {
        setSeats([]);
        return;
      }

      setSeatError("");
      setSeatLoading(true);

      try {
        const response = await axios.get(`${API_BASE_URL}/seats`, {
          params: { branchId: formData.branchId },
        });
        setSeats(response.data.data || []);
      } catch (error) {
        setSeatError(
          error?.response?.data?.message || error.message || "Unable to load seat data.",
        );
        setSeats([]);
      } finally {
        setSeatLoading(false);
      }
    };

    fetchSeats();
  }, [formData.branchId]);

  useEffect(() => {
    if (formData.duration === "12 Hour Membership") {
      setSelectedSlotIds(slots.slice(0, 2).map((slot) => slot._id));
    } else if (formData.duration === "6 Hour Membership") {
      setSelectedSlotIds(slots.length > 0 ? [slots[0]._id] : []);
    } else {
      setSelectedSlotIds([]);
    }
  }, [formData.duration, slots]);

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
                    <h1 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl">
                      Student enrollment starts here
                    </h1>
                    <p className="mt-4 text-base leading-relaxed text-white/90">
                      Choose your membership, select a slot, and reserve an available seat.
                    </p>
                  </div>

                  <div className="space-y-5">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                        <FiUsers className="h-6 w-6 text-emerald-300" />
                      </div>
                      <div>
                        <p className="font-semibold">One registration</p>
                        <p className="mt-1 text-sm text-gray-300">
                          Register once and use the same credentials for library services.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                        <FiCheckCircle className="h-6 w-6 text-cyan-300" />
                      </div>
                      <div>
                        <p className="font-semibold">Credentials after booking</p>
                        <p className="mt-1 text-sm text-gray-300">
                          Your enrollment ID and password are generated after registration.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                    <p className="text-sm text-emerald-100">Already registered?</p>
                    <Link
                      to="/login"
                      className="mt-2 inline-flex items-center gap-2 font-semibold text-white transition hover:gap-3"
                    >
                      Sign in to your account <FiArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="p-8 sm:p-10 lg:p-16">
                <div className="mb-10">
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    Student registration form
                  </h2>
                  <p className="mt-3 text-slate-600">
                    Enter your details to complete registration, choose membership, and reserve a seat.
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

                    <div>
                      <label htmlFor="duration" className="block text-sm font-semibold text-slate-900">
                        Membership
                      </label>
                      <select
                        id="duration"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        required
                        className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                      >
                        <option value="">Select membership</option>
                        <option value="6 Hour Membership">6 Hour Membership</option>
                        <option value="12 Hour Membership">12 Hour Membership</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="branchId" className="block text-sm font-semibold text-slate-900">
                        Branch
                      </label>
                      <select
                        id="branchId"
                        name="branchId"
                        value={formData.branchId}
                        onChange={handleChange}
                        className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                      >
                        <option value="main">Main Branch</option>
                      </select>
                    </div>

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
                    </div>
                  </div>

                  {photoPreview ? (
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-sm font-semibold text-slate-900">Preview</p>
                      <img
                        src={photoPreview}
                        alt="Profile preview"
                        className="mt-3 h-28 w-28 rounded-3xl object-cover"
                      />
                    </div>
                  ) : null}

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

                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">Choose your slot</h3>
                        <p className="mt-1 text-sm text-slate-500">
                          {formData.duration === "12 Hour Membership"
                            ? "12 hour membership reserves both slots automatically."
                            : "6 hour membership lets the student pick one slot."}
                        </p>
                      </div>

                      {slotLoading ? (
                        <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                          Loading slots...
                        </span>
                      ) : null}
                    </div>

                    {slotError ? (
                      <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {slotError}
                      </div>
                    ) : null}

                    {!formData.duration ? (
                      <p className="text-sm text-slate-500">Please choose membership first.</p>
                    ) : slots.length === 0 && !slotLoading ? (
                      <p className="text-sm text-slate-500">No active slots are configured yet.</p>
                    ) : (
                      <div className="grid gap-3 sm:grid-cols-2">
                        {slots.map((slot) => {
                          const isSelected = selectedSlotIds.includes(slot._id);
                          const locked = formData.duration === "12 Hour Membership";
                          return (
                            <button
                              type="button"
                              key={slot._id}
                              disabled={locked}
                              onClick={() => {
                                if (formData.duration === "6 Hour Membership") {
                                  setSelectedSlotIds([slot._id]);
                                }
                              }}
                              className={`rounded-3xl border p-4 text-left transition ${
                                isSelected
                                  ? "border-slate-900 bg-slate-900 text-white"
                                  : "border-slate-200 bg-white text-slate-900 hover:bg-slate-100"
                              } ${locked ? "cursor-not-allowed opacity-80" : ""}`}
                            >
                              <p className="text-lg font-semibold">{slot.slotName}</p>
                              <p className="mt-1 text-sm opacity-80">
                                {slot.startTime} - {slot.endTime}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">Choose your seat</h3>
                        <p className="mt-1 text-sm text-slate-500">
                          Select an available seat for the chosen branch and membership.
                        </p>
                      </div>

                      {seatLoading ? (
                        <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                          Loading seats...
                        </span>
                      ) : null}
                    </div>

                    <div className="mb-4 grid grid-cols-3 gap-2">
                      <div className="flex items-center justify-center gap-2 rounded-full bg-gray-100 p-2 text-sm">
                        <span className="h-3 w-3 rounded-full bg-emerald-500" />
                        Available
                      </div>
                      <div className="flex items-center justify-center gap-2 rounded-full bg-gray-100 p-2 text-sm">
                        <span className="h-3 w-3 rounded-full bg-red-500" />
                        Reserved
                      </div>
                      <div className="flex items-center justify-center gap-2 rounded-full bg-gray-100 p-2 text-sm">
                        <span className="h-3 w-3 rounded-full bg-slate-400" />
                        Inactive
                      </div>
                    </div>

                    {seatError ? (
                      <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {seatError}
                      </div>
                    ) : null}

                    <div className="grid gap-4">
                      {seats.length === 0 && !seatLoading ? (
                        <p className="text-sm text-slate-500">
                          No seats are configured for this branch yet.
                        </p>
                      ) : (
                        <div className="grid gap-3 sm:grid-cols-4">
                          {seats.map((seat) => {
                            const seatId = `${seat.branchId}-${seat.seatNumber}`;
                            const isSelected = formData.seatNumber === String(seat.seatNumber);
                            const reserved = seat.status === "reserved";
                            const inactive = seat.status === "inactive" || seat.active === false;

                            return (
                              <button
                                type="button"
                                key={seatId}
                                onClick={() =>
                                  !reserved &&
                                  !inactive &&
                                  setFormData((prev) => ({
                                    ...prev,
                                    seatNumber: String(seat.seatNumber),
                                  }))
                                }
                                disabled={reserved || inactive}
                                className={`rounded-3xl border p-5 text-left transition ${
                                  inactive
                                    ? "bg-slate-200 text-slate-500"
                                    : reserved
                                      ? "bg-red-100 text-red-700"
                                      : isSelected
                                        ? "bg-blue-500 text-white"
                                        : "bg-emerald-100 text-emerald-700"
                                }`}
                              >
                                <div className="flex flex-col items-center justify-between gap-3">
                                  <p className="text-lg font-semibold">{seat.seatNumber}</p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-400"
                  >
                    {isSubmitting ? "Registering..." : "Register and reserve seat"}
                  </button>
                </form>

                {registrationSuccess ? (
                  <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900">
                      Registration submitted
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">
                      Your registration has been completed. Your booking, seat and credentials are ready for login.
                    </p>
                  </div>
                ) : null}

                <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-semibold text-slate-900">
                    Already have an account?
                  </p>
                  <Link
                    to="/login"
                    className="mt-2 inline-flex items-center gap-2 font-semibold text-slate-900 transition hover:gap-3 hover:text-slate-700"
                  >
                    Sign in <FiArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
