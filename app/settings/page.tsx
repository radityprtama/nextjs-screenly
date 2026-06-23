import React from "react";
import ApiStatusBadge from "@/components/api-status-badge";

export const dynamic = "force-dynamic";

export default function SettingsPage() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_IDLIX_API_BASE_URL || "http://localhost:3001/api";

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">System Settings</h1>
        <p className="text-white/50 text-sm mt-1">Verify API connectivity and configurations.</p>
      </div>

      <div className="space-y-6">
        {/* Status block */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
          <h2 className="text-lg font-bold tracking-tight text-white">API Connection Info</h2>
          
          <div className="grid grid-cols-3 gap-2 py-2 text-sm border-b border-white/5 pb-4">
            <span className="text-white/40">Target API Server</span>
            <span className="col-span-2 font-mono text-white/95">{apiBaseUrl}</span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-sm text-white/70">Upstream Health Status</span>
            <ApiStatusBadge />
          </div>
        </div>

        {/* Legal/Disclaimer block */}
        <div className="p-6 rounded-2xl bg-red-950/20 border border-red-900/30 space-y-4">
          <h2 className="text-lg font-bold tracking-tight text-red-400">Legal Disclaimer & Compliance</h2>
          <p className="text-xs text-white/70 leading-relaxed">
            Screenly is a catalog and discovery interface. It does not host, store, or distribute video files. 
            Only use this app with APIs and content sources you are legally allowed to access.
          </p>
          <p className="text-xs text-white/70 leading-relaxed">
            Playback feature extraction endpoints are blocked/disabled to ensure alignment with standard 
            security and copyright compliance guidelines.
          </p>
        </div>
      </div>
    </div>
  );
}
