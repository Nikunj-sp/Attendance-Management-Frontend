"use client";

import { useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ToastProvider";

export default function AddStudent() {

  const [name,setName] = useState("");
  const [rollNumber,setRollNumber] = useState("");
  const [studentClass,setStudentClass] = useState("");
  const [section,setSection] = useState("");
  const [parentPhone,setParentPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async () => {

    if (!name || !rollNumber || !studentClass || !section || !parentPhone) {
      showToast("Please fill in all the fields before submitting.", "error");
      return;
    }

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/students",
        {
          name,
          rollNumber,
          class: studentClass,
          section,
          parentPhone
        },
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      showToast("Student added successfully.", "success");

      setName("");
      setRollNumber("");
      setStudentClass("");
      setSection("");
      setParentPhone("");

    } catch (error:any) {

      const message =
        error?.response?.data?.message || "Error adding student. Please try again.";
      showToast(message, "error");

    } finally {
      setLoading(false);
    }

  };

  return (

    <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl shadow-slate-900/40">

      <h1 className="mb-1 text-2xl font-semibold tracking-tight">
        Add student
      </h1>
      <p className="mb-6 text-sm text-slate-400">
        Register a new student to generate QR codes and track attendance.
      </p>

      <div className="flex flex-col gap-4">

        <input
          placeholder="Student name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm outline-none ring-emerald-500/40 placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2"
        />

        <input
          placeholder="Roll number"
          value={rollNumber}
          onChange={(e)=>setRollNumber(e.target.value)}
          className="rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm outline-none ring-emerald-500/40 placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2"
        />

        <select
            value={studentClass}
            onChange={(e)=>setStudentClass(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/40">
            <option value="">Select Class</option>
            <option value="5">Class 5</option>
            <option value="6">Class 6</option>
            <option value="7">Class 7</option>
            <option value="8">Class 8</option>
        </select>

        <select
            value={section}
            onChange={(e)=>setSection(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/40">
            <option value="">Select Section</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
        </select>

        <input
          placeholder="Parent phone"
          value={parentPhone}
          onChange={(e)=>setParentPhone(e.target.value)}
          className="rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm outline-none ring-emerald-500/40 placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-2 inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-medium text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Adding student..." : "Add student"}
        </button>

      </div>

    </div>

  );

}