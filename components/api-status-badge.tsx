"use client";

import { useEffect, useState } from "react";
import { Shield, ShieldAlert } from "lucide-react";

export default function ApiStatusBadge() {
  const [status, setStatus] = useState<"checking" | "online" | "offline">("checking");

  useEffect(() => {
    fetch("/api/idlix")
      .then((res) => (res.ok ? setStatus("online") : setStatus("offline")))
      .catch(() => setStatus("offline"));
  }, []);

  if (status === "checking") {
    return (
      <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/50">
        <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
        <span>API Status</span>
      </div>
    );
  }

  return status === "online" ? (
    <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs text-emerald-400">
      <Shield className="w-3 h-3" />
      <span>API Online</span>
    </div>
  ) : (
    <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/25 text-xs text-rose-400">
      <ShieldAlert className="w-3 h-3" />
      <span>API Offline</span>
    </div>
  );
}
