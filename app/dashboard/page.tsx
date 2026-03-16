"use client";

import { useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ToastProvider";

type DashboardData = {
  totalStudents: number;
  present: number;
  absent: number;
  percentage: number;
};

export default function Dashboard() {

  const [data,setData] = useState<DashboardData | null>(null);
  const [studentClass,setStudentClass] = useState("");
  const [section,setSection] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const fetchDashboard = async () => {

    if (!studentClass || !section) {
      showToast("Please select both class and section.", "error");
      return;
    }

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/attendance/report?class=${studentClass}&section=${section}`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      setData(res.data);

    } catch (error) {
      showToast("Error loading dashboard data.", "error");
    } finally {
      setLoading(false);
    }

  };

  return (

    <div className="w-full rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl shadow-slate-900/40">

      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">
            Attendance dashboard
          </h1>
          <p className="text-xs text-slate-400">
            High level overview of attendance for a selected class and section.
          </p>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap items-end gap-3">

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-slate-300">
            Class
          </label>
          <select
            value={studentClass}
            onChange={(e)=>setStudentClass(e.target.value)}
            className="min-w-[150px] rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/40"
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
            className="min-w-[150px] rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/40"
          >
            <option value="">Select section</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>

        <button
          onClick={fetchDashboard}
          disabled={loading}
          className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Loading…" : "Load"}
        </button>

      </div>

      {data && (

        <div className="grid gap-4 md:grid-cols-4">

          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 shadow-inner">
            <h2 className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Total students
            </h2>
            <p className="mt-3 text-3xl font-semibold text-slate-50">
              {data.totalStudents}
            </p>
          </div>

          <div className="rounded-xl border border-emerald-600/40 bg-emerald-500/10 p-4 shadow-inner">
            <h2 className="text-xs font-medium uppercase tracking-wide text-emerald-200">
              Present today
            </h2>
            <p className="mt-3 text-3xl font-semibold text-emerald-100">
              {data.present}
            </p>
          </div>

          <div className="rounded-xl border border-rose-600/40 bg-rose-500/10 p-4 shadow-inner">
            <h2 className="text-xs font-medium uppercase tracking-wide text-rose-100">
              Absent today
            </h2>
            <p className="mt-3 text-3xl font-semibold text-rose-100">
              {data.absent}
            </p>
          </div>

          <div className="rounded-xl border border-blue-600/40 bg-blue-500/10 p-4 shadow-inner">
            <h2 className="text-xs font-medium uppercase tracking-wide text-blue-200">
              Attendance %
            </h2>
            <p className="mt-3 text-3xl font-semibold text-blue-100">
              {data.percentage}%
            </p>
          </div>

        </div>

      )}

    </div>

  );

}