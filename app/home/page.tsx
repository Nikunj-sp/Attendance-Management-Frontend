"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {

  const router = useRouter();

  return (

    <div className="flex w-full flex-col gap-8 md:flex-row">

      <div className="flex-1">
        <h1 className="mb-3 text-3xl font-semibold tracking-tight">
          QR Attendance System
        </h1>
        <p className="mb-6 max-w-md text-sm text-slate-400">
          Manage your classroom attendance with quick QR scans, smart reports, and an
          at-a-glance dashboard.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">

          <button
            onClick={()=>router.push("/scanner")}
            className="flex flex-col items-start rounded-2xl border border-emerald-600/40 bg-emerald-500/10 px-4 py-4 text-left text-sm text-emerald-50 shadow-lg shadow-emerald-500/20 transition hover:border-emerald-400 hover:bg-emerald-500/15"
          >
            <span className="text-xs font-semibold uppercase tracking-wide">
              Scan attendance
            </span>
            <span className="mt-1 text-xs text-emerald-100/80">
              Use the camera to mark student presence instantly.
            </span>
          </button>

          <button
            onClick={()=>router.push("/add-student")}
            className="flex flex-col items-start rounded-2xl border border-slate-700 bg-slate-900/70 px-4 py-4 text-left text-sm text-slate-50 shadow-md shadow-slate-900/40 transition hover:border-emerald-500 hover:text-emerald-200"
          >
            <span className="text-xs font-semibold uppercase tracking-wide">
              Add student
            </span>
            <span className="mt-1 text-xs text-slate-400">
              Register new students and generate their QR codes.
            </span>
          </button>

          <button
            onClick={()=>router.push("/students")}
            className="flex flex-col items-start rounded-2xl border border-slate-700 bg-slate-900/70 px-4 py-4 text-left text-sm text-slate-50 shadow-md shadow-slate-900/40 transition hover:border-emerald-500 hover:text-emerald-200"
          >
            <span className="text-xs font-semibold uppercase tracking-wide">
              Student list
            </span>
            <span className="mt-1 text-xs text-slate-400">
              View all students and download QR codes.
            </span>
          </button>

          <button
            onClick={()=>router.push("/dashboard")}
            className="flex flex-col items-start rounded-2xl border border-slate-700 bg-slate-900/70 px-4 py-4 text-left text-sm text-slate-50 shadow-md shadow-slate-900/40 transition hover:border-emerald-500 hover:text-emerald-200"
          >
            <span className="text-xs font-semibold uppercase tracking-wide">
              Dashboard
            </span>
            <span className="mt-1 text-xs text-slate-400">
              Monitor present and absent students at a glance.
            </span>
          </button>

        </div>
      </div>

      <div className="flex-1">
        <div className="h-full rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-900/40">
          <h2 className="mb-2 text-sm font-semibold tracking-tight text-slate-100">
            Quick actions
          </h2>
          <p className="mb-4 text-xs text-slate-400">
            Common tasks for your daily attendance routine.
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={()=>router.push("/report")}
              className="inline-flex items-center justify-between rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-xs text-slate-100 transition hover:border-emerald-500 hover:text-emerald-200"
            >
              <span>View attendance report</span>
            </button>

            <button
              onClick={()=>{
                localStorage.removeItem("token");
                router.push("/login");
              }}
              className="inline-flex items-center justify-between rounded-xl border border-rose-700/70 bg-rose-500/10 px-4 py-3 text-xs font-medium text-rose-100 transition hover:border-rose-400"
            >
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

    </div>

  );

}