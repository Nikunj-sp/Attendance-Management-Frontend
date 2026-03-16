"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex w-full flex-col items-center justify-center py-16">
      <div className="max-w-xl text-center">
        <h1 className="mb-4 text-3xl font-semibold tracking-tight">
          QR Attendance System
        </h1>
        <p className="mb-8 text-sm text-slate-400">
          A clean, modern interface for managing classroom attendance using QR codes.
        </p>
        <button
          onClick={() => router.push("/login")}
          className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-6 py-2.5 text-sm font-medium text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
        >
          Go to login
        </button>
      </div>
    </div>
  );
}