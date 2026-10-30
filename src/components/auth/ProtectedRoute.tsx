import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ShieldCheck } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactElement;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-xl animate-pulse">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <div className="absolute -inset-2 rounded-2xl border border-blue-500/20 animate-ping pointer-events-none" />
        </div>
        <p className="mt-6 text-sm font-bold text-slate-300 tracking-wide font-heading">
          Authenticating Enterprise Session...
        </p>
        <span className="text-[10px] text-slate-500 uppercase tracking-widest mt-1 font-semibold">
          GOVENICS Security Gateway
        </span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
