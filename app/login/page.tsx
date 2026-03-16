 "use client";

 import axios from "axios";
 import { useState } from "react";
 import { useRouter } from "next/navigation";
 import { useToast } from "@/components/ToastProvider";

 export default function Login() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false);
   const router = useRouter();
   const { showToast } = useToast();

   const handleLogin = async () => {
     if (!email || !password) {
       showToast("Please enter both email and password.", "error");
       return;
     }

     try {
       setLoading(true);

       const res = await axios.post(
         "http://localhost:5000/api/auth/login",
         {
           email,
           password,
         }
       );

       localStorage.setItem("token", res.data.token);
       showToast("Login successful. Redirecting…", "success");
       router.push("/home");
     } catch (error: any) {
       const message =
         error?.response?.data?.message || "Invalid credentials. Please try again.";
       showToast(message, "error");
     } finally {
       setLoading(false);
     }
   };

   return (
     <div className="flex w-full items-center justify-center">
       <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl shadow-slate-900/40">
         <h1 className="mb-2 text-center text-2xl font-semibold tracking-tight">
           Welcome back
         </h1>
         <p className="mb-8 text-center text-sm text-slate-400">
           Sign in to manage your QR attendance dashboard.
         </p>

         <div className="flex flex-col gap-4">
           <div className="flex flex-col gap-1.5">
             <label className="text-xs font-medium text-slate-300">
               Email
             </label>
             <input
               placeholder="you@example.com"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className="rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm outline-none ring-emerald-500/40 placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2"
             />
           </div>

           <div className="flex flex-col gap-1.5">
             <label className="text-xs font-medium text-slate-300">
               Password
             </label>
             <input
               placeholder="••••••••"
               type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm outline-none ring-emerald-500/40 placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2"
             />
           </div>

           <button
             onClick={handleLogin}
             disabled={loading}
             className="mt-2 inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-medium text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
           >
             {loading ? "Signing in..." : "Sign in"}
           </button>
         </div>
       </div>
     </div>
   );
 }
