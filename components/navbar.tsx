"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Search, Heart, Settings, Menu, X, Play, User, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import ApiStatusBadge from "./api-status-badge";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/40 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              {/* Brand Logo */}
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                  <Play className="w-4 h-4 fill-current text-white" />
                </div>
                <span className="text-lg font-bold tracking-wider text-white">SCREENLY</span>
              </Link>

              {/* Desktop links */}
              <div className="hidden md:flex items-center space-x-6">
                <Link href="/" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Home</Link>
                <Link href="/movies" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Movies</Link>
                <Link href="/series" className="text-sm font-medium text-white/70 hover:text-white transition-colors">TV Series</Link>
                <Link href="/watchlist" className="text-sm font-medium text-white/70 hover:text-white transition-colors">My List</Link>
              </div>
            </div>

            {/* Right-aligned section */}
            <div className="flex items-center space-x-4">
              <ApiStatusBadge />
              <Link href="/search" className="p-2 rounded-full hover:bg-white/5 text-white/75 hover:text-white transition-colors">
                <Search className="w-5 h-5" />
              </Link>

              {session ? (
                <>
                  <Link href="/watchlist" className="p-2 rounded-full hover:bg-white/5 text-white/75 hover:text-white transition-colors">
                    <Heart className="w-5 h-5" />
                  </Link>
                  <Link href="/settings" className="p-2 rounded-full hover:bg-white/5 text-white/75 hover:text-white transition-colors">
                    <Settings className="w-5 h-5" />
                  </Link>

                  {/* Profile Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center space-x-2 bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/20 rounded-full px-3 py-1.5 transition-all duration-300 group"
                    >
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={session.user?.image || ""} />
                        <AvatarFallback className="bg-gradient-to-br from-red-500 to-red-700 text-white text-xs">
                          {getInitials(session.user?.name || session.user?.email || "U")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-white/80 group-hover:text-white hidden sm:block">
                        {session.user?.name?.split(" ")[0] || "User"}
                      </span>
                    </button>

                    {isProfileOpen && (
                      <div className="absolute right-0 top-12 w-64 bg-[#0e0f11] rounded-2xl border border-white/10 shadow-2xl overflow-hidden z-50">
                        <div className="p-4 bg-white/5 border-b border-white/10">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-12 h-12 border-2 border-white/15">
                              <AvatarImage src={session.user?.image || ""} />
                              <AvatarFallback className="bg-gradient-to-br from-red-500 to-red-700 text-white">
                                {getInitials(session.user?.name || session.user?.email || "U")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold text-white text-sm">{session.user?.name}</p>
                              <p className="text-white/60 text-xs">{session.user?.email}</p>
                            </div>
                          </div>
                        </div>

                        <div className="p-2">
                          <Link
                            href="/profile"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                          >
                            <User className="w-4 h-4 text-white/60 group-hover:text-white" />
                            <span className="text-sm text-white/85 group-hover:text-white">Profile</span>
                          </Link>
                          <Link
                            href="/watchlist"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                          >
                            <Heart className="w-4 h-4 text-white/60 group-hover:text-white" />
                            <span className="text-sm text-white/85 group-hover:text-white">My List</span>
                          </Link>
                          <Link
                            href="/settings"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                          >
                            <Settings className="w-4 h-4 text-white/60 group-hover:text-white" />
                            <span className="text-sm text-white/85 group-hover:text-white">Settings</span>
                          </Link>

                          <div className="my-2 h-px bg-white/5"></div>

                          <button
                            onClick={() => {
                              signOut();
                              setIsProfileOpen(false);
                            }}
                            className="flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-red-500/10 transition-colors group w-full text-left"
                          >
                            <LogOut className="w-4 h-4 text-white/60 group-hover:text-red-400" />
                            <span className="text-sm text-white/85 group-hover:text-red-400">Sign Out</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/auth/signin">
                    <button className="px-4 py-1.5 text-xs font-semibold text-white/85 hover:text-white hover:bg-white/5 rounded-full border border-transparent hover:border-white/10 transition-colors">
                      Sign In
                    </button>
                  </Link>
                  <Link href="/auth/signup">
                    <button className="px-4 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-full transition-all duration-300 shadow-md hover:shadow-red-600/20">
                      Sign Up
                    </button>
                  </Link>
                </div>
              )}

              {/* Hamburger toggler */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-full hover:bg-white/5 text-white"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu container */}
        {isOpen && (
          <div className="md:hidden border-t border-white/5 bg-black/95 p-4 space-y-3">
            <Link onClick={() => setIsOpen(false)} href="/" className="block py-2 text-white/80 hover:text-white text-sm">Home</Link>
            <Link onClick={() => setIsOpen(false)} href="/movies" className="block py-2 text-white/80 hover:text-white text-sm">Movies</Link>
            <Link onClick={() => setIsOpen(false)} href="/series" className="block py-2 text-white/80 hover:text-white text-sm">TV Series</Link>
            <Link onClick={() => setIsOpen(false)} href="/watchlist" className="block py-2 text-white/80 hover:text-white text-sm">My List</Link>
          </div>
        )}
      </nav>

      {/* Click outside to close profile dropdown */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-30" onClick={() => setIsProfileOpen(false)}></div>
      )}
    </>
  );
}
