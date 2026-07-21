import { useToastStore } from '@/store/useToastStore';
import { CheckCircle2, Info, AlertTriangle, XCircle, X } from 'lucide-react';

export default function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 max-w-md w-full pointer-events-none px-4">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';
        const isError = toast.type === 'error';
        const isInfo = !toast.type || toast.type === 'info';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-lg shadow-lg border text-xs sm:text-sm font-medium transition-all duration-300 animate-slide-in-right ${
              isSuccess
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : isWarning
                ? 'bg-amber-50 border-amber-300 text-amber-900'
                : isError
                ? 'bg-rose-50 border-rose-300 text-rose-900'
                : 'bg-blue-50 border-blue-300 text-blue-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
              {isWarning && <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />}
              {isError && <XCircle className="w-5 h-5 text-rose-600 shrink-0" />}
              {isInfo && <Info className="w-5 h-5 text-blue-600 shrink-0" />}
              <span>{toast.message}</span>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-700 p-1 rounded-md transition-colors shrink-0 cursor-pointer"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
