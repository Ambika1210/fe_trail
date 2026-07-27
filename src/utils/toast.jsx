import { useState, useEffect } from "react";

// Lightweight event-based toast notification utility
export const toast = {
  success(message) {
    window.dispatchEvent(
      new CustomEvent("app:toast", {
        detail: { id: Date.now(), type: "success", message },
      })
    );
  },
  error(message) {
    window.dispatchEvent(
      new CustomEvent("app:toast", {
        detail: { id: Date.now(), type: "error", message },
      })
    );
  },
  info(message) {
    window.dispatchEvent(
      new CustomEvent("app:toast", {
        detail: { id: Date.now(), type: "info", message },
      })
    );
  },
  warning(message) {
    window.dispatchEvent(
      new CustomEvent("app:toast", {
        detail: { id: Date.now(), type: "warning", message },
      })
    );
  },
};

export const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleToastEvent = (e) => {
      const newToast = e.detail;
      setToasts((prev) => [...prev, newToast]);

      // Auto dismiss after 3.5 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, 3500);
    };

    window.addEventListener("app:toast", handleToastEvent);
    return () => window.removeEventListener("app:toast", handleToastEvent);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-2xl border shadow-2xl backdrop-blur-md transition-all duration-300 transform translate-x-0 ${
            t.type === "success"
              ? "bg-slate-900/90 border-emerald-500/40 text-emerald-300 shadow-emerald-900/20"
              : t.type === "error"
              ? "bg-slate-900/90 border-rose-500/40 text-rose-300 shadow-rose-900/20"
              : t.type === "warning"
              ? "bg-slate-900/90 border-amber-500/40 text-amber-300 shadow-amber-900/20"
              : "bg-slate-900/90 border-indigo-500/40 text-indigo-300 shadow-indigo-900/20"
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">
              {t.type === "success" && "✅"}
              {t.type === "error" && "⚠️"}
              {t.type === "warning" && "⚡"}
              {t.type === "info" && "ℹ️"}
            </span>
            <p className="text-xs font-medium leading-relaxed text-slate-100">{t.message}</p>
          </div>

          <button
            onClick={() => removeToast(t.id)}
            className="text-slate-400 hover:text-white text-xs font-bold p-1 rounded-lg transition"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};
