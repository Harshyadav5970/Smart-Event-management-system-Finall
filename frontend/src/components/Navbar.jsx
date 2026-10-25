import React from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Search,
  Sparkles,
  HelpCircle,
  LogOut,
  User,
  Shield,
  Layers,
  GraduationCap,
  Menu
} from 'lucide-react';

export default function Navbar({
  searchQuery,
  setSearchQuery,
  onOpenSynopsis,
  onToggleMobileSidebar
}) {
  const { user, logout, demoLogin, toast } = useAuth();

  return (
    <header className="sticky top-0 z-20 bg-white/85 backdrop-blur-md border-b border-slate-100 px-4 sm:px-6 py-3 flex items-center justify-between">
      {/* Toast Notification Banner (Floating top right) */}
      {toast && (
        <div
          className={`fixed top-4 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold backdrop-blur-lg animate-in slide-in-from-top-4 duration-200 ${
            toast.type === 'error'
              ? 'bg-rose-600 text-white shadow-rose-500/20'
              : toast.type === 'warning'
              ? 'bg-amber-500 text-white shadow-amber-500/20'
              : 'bg-slate-900 text-white shadow-slate-900/20'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Left side: Mobile Toggle & Search Input Bar */}
      <div className="flex items-center gap-2.5 flex-1 min-w-0 mr-3">
        <button
          onClick={onToggleMobileSidebar}
          className="p-1.5 -ml-1 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 md:hidden cursor-pointer shrink-0"
          title="Open Menu"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full max-w-xs sm:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Hackathon, RoboWars, venues..."
            className="w-full pl-9 pr-4 py-1.5 bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-xs rounded-xl border border-transparent focus:border-brand-500/30 focus:outline-none transition-all placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Center/Right: Profile & Status */}
      <div className="flex items-center gap-3">

        {/* Academic Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-amber-50/80 border border-amber-200/60 rounded-xl text-[11px] text-amber-900 font-semibold">
          <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
          <span>College Fest Portal 2026</span>
        </div>

        {/* Help / Project Info button */}
        <button
          onClick={onOpenSynopsis}
          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          title="Project Synopsis & Credentials"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* User Profile Chip */}
        {user ? (
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-600 to-coral-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
              {user.name ? user.name.substring(0, 2).toUpperCase() : 'HY'}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-bold text-slate-800 leading-none">
                {user.name}
              </p>
              <p className="text-[10px] text-brand-600 font-semibold mt-0.5 capitalize">
                {user.role} {user.rollNo ? `• ${user.rollNo}` : ''}
              </p>
            </div>
            <button
              onClick={logout}
              className="p-1.5 ml-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
}
