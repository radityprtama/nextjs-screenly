import React from "react";
import Footer from "./footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#0e0f11] text-white">
      <div className="flex-grow pt-24 pb-16">{children}</div>
      <Footer />
    </div>
  );
}
