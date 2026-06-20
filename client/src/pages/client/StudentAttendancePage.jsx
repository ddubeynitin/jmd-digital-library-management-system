import { useState } from "react";
import Scanner from "../../components/Scanner";
import { Link } from "react-router-dom";
import SideMenuPanel from "../../components/SideMenuPanel";

const StudentAttendancePage = () => {
  const [scannedValue, setScannedValue] = useState("");

  return (
    <>
      <div className="min-h-screen bg-slate-100 text-slate-900">
        <div className="mx-auto flex min-h-screen max-w-[1600px] gap-6 px-4 py-6 xl:px-10">
          <SideMenuPanel/>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Self Attendance
            </h2>
            <div className="space-y-6">
              <Scanner onScan={setScannedValue} />
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm text-slate-600">Last scanned QR code</p>
                <p className="mt-2 text-base font-semibold text-slate-900">
                  {scannedValue || "No scan yet. Click Start Scan to begin."}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Attendance by Admin
            </h2>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-8 flex flex-col items-center justify-center min-h-80">
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <img
                  src="https://via.placeholder.com/280/ffffff/ffffff?text=QR+CODE"
                  alt="QR Code"
                  className="w-64 h-64 object-cover rounded-md"
                />
              </div>
              <p className="text-gray-700 text-lg font-semibold mb-2 text-center">
                Your Unique QR Code
              </p>
              <p className="text-gray-600 text-center mb-4">
                Admin can scan this code for marking attendance
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 justify-center">
              <button className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition duration-300 shadow-md">
                Download QR Code
              </button>
              <button className="px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition duration-300 shadow-md">
                Refresh QR Code
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentAttendancePage;
