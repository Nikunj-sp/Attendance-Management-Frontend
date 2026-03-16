"use client";

import { useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ToastProvider";

type MonthlyData = {
  totalStudents: number;
  totalSchoolDays: number;
  studentStats: {
    studentId: string;
    name: string;
    rollNumber: string;
    daysPresent: number;
    daysAbsent: number;
    percentage: number;
  }[];
};

export default function MonthlyPage() {
  const [data, setData] = useState<MonthlyData | null>(null);
  const [studentClass, setStudentClass] = useState("");
  const [section, setSection] = useState("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  // Set default month and year on component mount
  const currentDate = new Date();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
  const currentYear = String(currentDate.getFullYear());

  const fetchMonthlyReport = async () => {
    if (!studentClass || !section || !month || !year) {
      showToast("Please select class, section, month and year.", "error");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/attendance/monthly?class=${studentClass}&section=${section}&month=${month}&year=${year}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(res.data);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Unable to load monthly report.";
      showToast(message, "error");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const years = ["2024", "2025", "2026", "2027"];

  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl shadow-slate-900/40">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">
            Monthly Attendance Report
          </h1>
          <p className="text-xs text-slate-400">
            View monthly attendance percentage for all students in a class.
          </p>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-end gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-slate-300">Class</label>
          <select
            value={studentClass}
            onChange={(e) => setStudentClass(e.target.value)}
            className="min-w-[140px] rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/40"
          >
            <option value="">Select class</option>
            <option value="5">Class 5</option>
            <option value="6">Class 6</option>
            <option value="7">Class 7</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-slate-300">Section</label>
          <select
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="min-w-[140px] rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/40"
          >
            <option value="">Select section</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-slate-300">Month</label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="min-w-[140px] rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/40"
          >
            <option value="">Select month</option>
            {months.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-slate-300">Year</label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="min-w-[140px] rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/40"
          >
            <option value="">Select year</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={fetchMonthlyReport}
          disabled={loading}
          className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Loading…" : "Load report"}
        </button>
      </div>

      {data && (
        <>
          <div className="mb-4 grid gap-4 text-xs text-slate-300 sm:grid-cols-2">
            <p>
              <span className="text-slate-400">Total students:</span>{" "}
              <span className="font-semibold text-slate-50">
                {data.totalStudents}
              </span>
            </p>
            <p>
              <span className="text-slate-400">School days in month:</span>{" "}
              <span className="font-semibold text-slate-50">
                {data.totalSchoolDays}
              </span>
            </p>
          </div>

          <div className="mt-4 overflow-hidden rounded-xl border border-slate-800">
            <table className="w-full text-sm">
              <thead className="bg-slate-900/80">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-slate-400">
                    Roll No.
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-slate-400">
                    Name
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium uppercase tracking-wide text-slate-400">
                    Days Present
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium uppercase tracking-wide text-slate-400">
                    Days Absent
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium uppercase tracking-wide text-slate-400">
                    Percentage
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800/80 bg-slate-900/40">
                {data.studentStats.map((s, i) => (
                  <tr key={i}>
                    <td className="px-3 py-2 text-sm text-slate-200">
                      {s.rollNumber}
                    </td>
                    <td className="px-3 py-2 text-sm font-medium text-slate-50">
                      {s.name}
                    </td>
                    <td className="px-3 py-2 text-center text-sm text-emerald-300">
                      {s.daysPresent}
                    </td>
                    <td className="px-3 py-2 text-center text-sm text-rose-300">
                      {s.daysAbsent}
                    </td>
                    <td className="px-3 py-2 text-center text-sm">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          s.percentage >= 75
                            ? "bg-emerald-500/10 text-emerald-300"
                            : s.percentage >= 50
                            ? "bg-yellow-500/10 text-yellow-300"
                            : "bg-rose-500/10 text-rose-300"
                        }`}
                      >
                        {s.percentage}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {!data && !loading && (
        <p className="mt-4 text-xs text-slate-500">
          No report loaded yet. Choose class, section, month and year, then
          click &quot;Load report&quot;.
        </p>
      )}
    </div>
  );
}
