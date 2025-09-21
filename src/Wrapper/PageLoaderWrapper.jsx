
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: true }); // optional settings

export default function PageLoaderWrapper({ children }) {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();
    // simulate loading end (or wait for real data fetching)
    const timer = setTimeout(() => {
      NProgress.done();
    }, 300); // small delay for smoothness

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return children;
}
