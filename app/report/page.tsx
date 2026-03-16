"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ToastProvider";

export default function ReportPage() {

    type ReportData = {
        totalStudents: number;
        present: number;
        absent: number;
        report: {
            name: string;
            rollNumber: string;
            status: string;
        }[];
        };

  const [data, setData] = useState<ReportData | null>(null);
  const [studentClass, setStudentClass] = useState("");
  const [section, setSection] = useState("");
  const [date, setDate] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const today = new Date();
    const iso = today.toISOString().slice(0, 10);
    setDate(iso);
  }, []);

  const fetchReport = async () => {
    if (!studentClass || !section || !date) {
      showToast("Please select class, section and date.", "error");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/attendance/report?class=${studentClass}&section=${section}&date=${date}`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      setData(res.data);
    } catch (error:any) {
      const message =
        error?.response?.data?.message || "Unable to load attendance report.";
      showToast(message, "error");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="w-full rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl shadow-slate-900/40">

      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">
            Attendance report
          </h1>
          <p className="text-xs text-slate-400">
            View detailed attendance for a specific class, section and date.
          </p>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-end gap-3">

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-slate-300">
            Class
          </label>
          <select
            value={studentClass}
            onChange={(e)=>setStudentClass(e.target.value)}
            className="min-w-[140px] rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/40"
          >
            <option value="">Select class</option>
            <option value="5">Class 5</option>
            <option value="6">Class 6</option>
            <option value="7">Class 7</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-slate-300">
            Section
          </label>
          <select
            value={section}
            onChange={(e)=>setSection(e.target.value)}
            className="min-w-[140px] rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/40"
          >
            <option value="">Select section</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-slate-300">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e)=>setDate(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/40"
          />
        </div>

        <button
          onClick={fetchReport}
          disabled={loading}
          className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Loading…" : "Load report"}
        </button>

      </div>

      {data && (
        <>
          <div className="mb-4 grid gap-4 text-xs text-slate-300 sm:grid-cols-3">
            <p>
              <span className="text-slate-400">Total students:</span>{" "}
              <span className="font-semibold text-slate-50">
                {data.totalStudents}
              </span>
            </p>
            <p>
              <span className="text-slate-400">Present:</span>{" "}
              <span className="font-semibold text-emerald-300">
                {data.present}
              </span>
            </p>
            <p>
              <span className="text-slate-400">Absent:</span>{" "}
              <span className="font-semibold text-rose-300">
                {data.absent}
              </span>
            </p>
          </div>

          <div className="mt-4 overflow-hidden rounded-xl border border-slate-800">
            <table className="w-full text-sm">

              <thead className="bg-slate-900/80">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-slate-400">
                    Name
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-slate-400">
                    Roll
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-slate-400">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800/80 bg-slate-900/40">
                {data.report.map((s,i)=>(
                  <tr key={i}>
                    <td className="px-3 py-2 text-sm text-slate-50">
                      {s.name}
                    </td>
                    <td className="px-3 py-2 text-sm text-slate-200">
                      {s.rollNumber}
                    </td>
                    <td className="px-3 py-2 text-sm">
                      <span className={s.status === "Present"
                        ? "rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-300"
                        : "rounded-full bg-rose-500/10 px-2 py-0.5 text-xs font-medium text-rose-300"
                      }>
                        {s.status}
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
          No report loaded yet. Choose class, section and date, then click &quot;Load report&quot;.
        </p>
      )}

    </div>
  );
}