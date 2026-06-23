import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#0b0c0e] border-t border-white/5 py-10 mt-auto text-white/40 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold tracking-wider text-white">SCREENLY</span>
          <span className="text-xs">&copy; {new Date().getFullYear()} Screenly. All rights reserved.</span>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
