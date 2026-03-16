 "use client";

 import React, { createContext, useCallback, useContext, useState } from "react";

 type ToastVariant = "success" | "error" | "info";

 type Toast = {
   id: number;
   message: string;
   variant: ToastVariant;
 };

 type ToastContextValue = {
   showToast: (message: string, variant?: ToastVariant) => void;
 };

 const ToastContext = createContext<ToastContextValue | undefined>(undefined);

 export function ToastProvider({ children }: { children: React.ReactNode }) {
   const [toasts, setToasts] = useState<Toast[]>([]);

   const showToast = useCallback((message: string, variant: ToastVariant = "info") => {
     setToasts((prev) => {
       const next: Toast = {
         id: Date.now() + Math.random(),
         message,
         variant,
       };
       return [...prev, next];
     });

     // Auto dismiss after 3 seconds
     setTimeout(() => {
       setToasts((prev) => prev.slice(1));
     }, 3000);
   }, []);

   return (
     <ToastContext.Provider value={{ showToast }}>
       {children}
       <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-end px-4">
         <div className="flex flex-col gap-3">
           {toasts.map((toast) => {
             const base =
               "pointer-events-auto w-72 rounded-xl border px-4 py-3 text-sm shadow-lg backdrop-blur-sm transition-all";
             const variantClasses =
               toast.variant === "success"
                 ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-50"
                 : toast.variant === "error"
                 ? "border-rose-500/40 bg-rose-500/10 text-rose-50"
                 : "border-slate-500/40 bg-slate-800/80 text-slate-50";

             return (
               <div key={toast.id} className={`${base} ${variantClasses}`}>
                 <p className="font-medium">
                   {toast.variant === "success"
                     ? "Success"
                     : toast.variant === "error"
                     ? "Error"
                     : "Notice"}
                 </p>
                 <p className="mt-1 text-xs opacity-90">{toast.message}</p>
               </div>
             );
           })}
         </div>
       </div>
     </ToastContext.Provider>
   );
 }

 export function useToast() {
   const ctx = useContext(ToastContext);
   if (!ctx) {
     throw new Error("useToast must be used within ToastProvider");
   }
   return ctx;
 }

