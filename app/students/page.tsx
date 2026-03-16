"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";
import { useToast } from "@/components/ToastProvider";

type Student = {
  _id: string;
  name: string;
  rollNumber: string;
  class: string;
  section: string;
};

export default function StudentsPage() {

    type Student = {
  _id: string;
  name: string;
  rollNumber: string;
  class: string;
  section: string;
};

  const [students, setStudents] = useState<Student[]>([]);
  const [studentClass, setStudentClass] = useState("");
  const [section, setSection] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const fetchStudents = async () => {

    if (!studentClass || !section) {
      showToast("Please select both class and section.", "error");
      return;
    }

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/students?class=${studentClass}&section=${section}`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      setStudents(res.data);

    } catch (error) {

      showToast("Error fetching students. Please try again.", "error");

    } finally {
      setLoading(false);
    }

  };

  return (

    <div className="w-full rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl shadow-slate-900/40">

      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">
            Students
          </h1>
          <p className="text-xs text-slate-400">
            View students and generate QR codes for attendance.
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
          onClick={fetchStudents}
          disabled={loading}
          className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Loading…" : "Load students"}
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-800">
        <table className="w-full text-sm">

          <thead className="bg-slate-900/80">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-slate-400">
                Name
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-slate-400">
                Roll no.
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-slate-400">
                Class
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-slate-400">
                Section
              </th>
              <th className="px-3 py-2 text-right text-xs font-medium uppercase tracking-wide text-slate-400">
                QR
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800/80 bg-slate-900/40">

            {students.map((s)=>(
            <tr key={s._id}>
                <td className="px-3 py-2">
                  <p className="text-sm font-medium text-slate-50">
                    {s.name}
                  </p>
                  <p className="text-xs text-slate-400">
                    ID: {s._id.slice(0, 8)}…
                  </p>
                </td>
                <td className="px-3 py-2 text-sm text-slate-200">
                  {s.rollNumber}
                </td>
                <td className="px-3 py-2 text-sm text-slate-200">
                  {s.class}
                </td>
                <td className="px-3 py-2 text-sm text-slate-200">
                  {s.section}
                </td>

                <td className="px-3 py-2 text-right">
                  <button
                    onClick={()=>setSelectedStudent(s)}
                    className="inline-flex items-center justify-center rounded-lg bg-slate-800 px-3 py-1 text-xs font-medium text-slate-100 ring-emerald-500/40 transition hover:bg-slate-700 hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2"
                  >
                    Generate QR
                  </button>
                </td>

            </tr>
            ))}

          </tbody>

        </table>
      </div>
      {selectedStudent && (

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/80 p-6">

            <h2 className="mb-2 text-sm font-semibold tracking-tight text-slate-100">
            Student QR code
            </h2>
            <p className="mb-4 text-xs text-slate-400">
              {selectedStudent.name} • Class {selectedStudent.class} {selectedStudent.section}
            </p>

            <div id="qr-code" className="flex flex-col items-center">
            <QRCodeSVG
                value={selectedStudent._id}
                size={200}
                includeMargin={true}
            />
            </div>

            <button
            onClick={() => {

                const svg = document.querySelector("#qr-code svg");
                if (!svg) return;
                const svgData = new XMLSerializer().serializeToString(svg);

                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                const img = new Image();

                const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
                const url = URL.createObjectURL(svgBlob);

                img.onload = () => {

                canvas.width = 200;
                canvas.height = 200;

                ctx?.drawImage(img, 0, 0);

                const png = canvas.toDataURL("image/png");

                const link = document.createElement("a");
                link.href = png;
                link.download = `${selectedStudent.name}-QR.png`;
                link.click();

                URL.revokeObjectURL(url);

                };

                img.src = url;

            }}
            className="mt-4 inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
            >
            Download QR
            </button>
        </div>
      )}

    </div>

  );

}