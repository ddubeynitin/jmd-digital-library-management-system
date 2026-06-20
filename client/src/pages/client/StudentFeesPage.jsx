import React from "react";
import SideMenuPanel from "../../components/SideMenuPanel";

const StudentFeesPage = () => {
  return (
    <>
      <div className="min-h-screen bg-slate-100 text-slate-900">
        <div className="mx-auto flex min-h-screen max-w-[1600px] gap-6 px-4 py-6 xl:px-10">
          <SideMenuPanel />

          <main className="flex-1">
            <div className="rounded-[40px] border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/20">
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-amber-500">Fees Overview</p>
                  <h1 className="mt-2 text-3xl font-semibold text-slate-900">Student Fee Details</h1>
                  <p className="mt-2 text-sm text-slate-500">
                    Review your current fee status, individual charge breakdowns, and payment history.
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-50 px-5 py-4 text-sm text-slate-700">
                  <p className="font-semibold text-slate-900">Current Balance</p>
                  <p className="mt-2 text-2xl font-semibold text-amber-500">$1,250.00</p>
                  <p className="mt-1 text-xs text-slate-500">Due by June 30, 2026</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Total Fees</p>
                  <p className="mt-4 text-3xl font-semibold text-slate-900">$4,500.00</p>
                  <p className="mt-2 text-sm text-slate-500">Academic year 2025-26</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Amount Paid</p>
                  <p className="mt-4 text-3xl font-semibold text-emerald-600">$3,250.00</p>
                  <p className="mt-2 text-sm text-slate-500">Last payment completed on May 12</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Next Installment</p>
                  <p className="mt-4 text-3xl font-semibold text-slate-900">$750.00</p>
                  <p className="mt-2 text-sm text-slate-500">Pay before July 10</p>
                </div>
              </div>

              <div className="mt-10 overflow-hidden rounded-[32px] border border-slate-200">
                <table className="min-w-full border-collapse text-left text-sm">
                  <thead className="bg-slate-950 text-white">
                    <tr>
                      <th className="px-6 py-4 font-medium">Fee Item</th>
                      <th className="px-6 py-4 font-medium">Amount</th>
                      <th className="px-6 py-4 font-medium">Paid</th>
                      <th className="px-6 py-4 font-medium">Due Date</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white text-slate-700">
                    <tr className="border-b border-slate-200">
                      <td className="px-6 py-4">Tuition Fee</td>
                      <td className="px-6 py-4">$2,500.00</td>
                      <td className="px-6 py-4 text-emerald-600">$2,500.00</td>
                      <td className="px-6 py-4">April 15, 2026</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                          Paid
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <td className="px-6 py-4">Library & Resources</td>
                      <td className="px-6 py-4">$450.00</td>
                      <td className="px-6 py-4">$450.00</td>
                      <td className="px-6 py-4">May 05, 2026</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                          Paid
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="px-6 py-4">Transportation</td>
                      <td className="px-6 py-4">$600.00</td>
                      <td className="px-6 py-4">$600.00</td>
                      <td className="px-6 py-4">June 10, 2026</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                          Paid
                        </span>
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-6 py-4">Hostel Fee</td>
                      <td className="px-6 py-4">$700.00</td>
                      <td className="px-6 py-4">$0.00</td>
                      <td className="px-6 py-4">June 30, 2026</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                          Pending
                        </span>
                      </td>
                    </tr>
                    <tr className="border-t border-slate-200 bg-white">
                      <td className="px-6 py-4 font-semibold">Total Due</td>
                      <td className="px-6 py-4 font-semibold">$700.00</td>
                      <td className="px-6 py-4 font-semibold">$3,550.00</td>
                      <td className="px-6 py-4" />
                      <td className="px-6 py-4" />
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-10 rounded-3xl bg-slate-50 p-6 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">Payment Notes</p>
                <ul className="mt-3 list-disc space-y-2 pl-5">
                  <li>Complete pending installments before the due date to avoid late fees.</li>
                  <li>Payments can be made through the student portal or at the finance office.</li>
                  <li>Contact accounts@jmdlibrary.edu for any discrepancy in fees.</li>
                </ul>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default StudentFeesPage;
