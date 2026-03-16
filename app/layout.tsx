import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QR Attendance System",
  description: "Modern QR based attendance tracking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-50`}
      >
        <ToastProvider>
          <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <header className="border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-sm">
              <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                    QR
                  </div>
                  <div>
                    <p className="text-sm font-semibold tracking-tight">
                      QR Attendance
                    </p>
                    <p className="text-xs text-slate-400">
                      Simple attendance for your classroom
                    </p>
                  </div>
                </div>
              </div>
            </header>
            <main className="mx-auto flex max-w-5xl px-6 py-8">{children}</main>
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}

