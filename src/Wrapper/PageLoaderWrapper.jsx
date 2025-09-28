import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false }); // Hide default spinner

export default function PageLoaderWrapper({ children }) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    NProgress.start();
    setLoading(true);

    // Only show spinner if load lasts >300ms
    const spinnerTimer = setTimeout(() => {
      //if (loading) setShowSpinner(true);
    }, 500);

    // Simulate route load (replace with real fetch/data logic)
    const doneTimer = setTimeout(() => {
      NProgress.done();
      setLoading(false);
      setShowSpinner(false);
    }, 500); // 2s fake delay

    return () => {
      clearTimeout(spinnerTimer);
      clearTimeout(doneTimer);
    };
  }, [location.pathname]);

  return (
    <div className="relative">
      {/* Main Content */}
      <div className={loading ? "blur-sm pointer-events-none select-none" : ""}>
        {children}
      </div>

      {/* Spinner Overlay */}
      {showSpinner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="w-16 h-16 border-4 border-white/30 border-t-green-500 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
