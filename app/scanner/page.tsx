"use client";

import { useState } from "react";
import axios from "axios";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function ScannerPage() {

  const [scannerStarted,setScannerStarted] = useState(false);

  const startScanner = () => {

    if(scannerStarted) return;

    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 },
      false
    );

    scanner.render(
      async (decodedText) => {

        try {

          const token = localStorage.getItem("token");

          await axios.post(
            "http://localhost:5000/api/attendance/scan",
            { studentId: decodedText },
            {
              headers:{
                Authorization:`Bearer ${token}`
              }
            }
          );

          alert("Attendance Marked ✅");

          scanner.clear(); // stop scanner

        } catch(error:any) {

          alert(error.response?.data?.message || "Scan Error");

        }

      },
      () => {}
    );

    setScannerStarted(true);

  };

  return (

    <div className="flex flex-col items-center p-10">

      <h1 className="text-2xl font-bold mb-6">
        QR Attendance Scanner
      </h1>

      {!scannerStarted && (

        <button
          onClick={startScanner}
          className="bg-green-500 text-white px-6 py-3 rounded"
        >
          Start Scanner
        </button>
      )}
      <div
        id="reader"
        className="w-[300px] mt-6"
      ></div>

    </div>

  );

}