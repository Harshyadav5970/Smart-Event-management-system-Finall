// Harsh Yadav - TYCS Roll 129
// EventHub: Smart College Event & Fest Management System
// College Fest Portal 2026
// Dedicated Student & Admin Login Portal with Role Verification

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  GraduationCap,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export default function Login({ onSwitchToRegister, initialPortal = 'student' }) {
  const { login, demoLogin } = useAuth();
  const [portal, setPortal] = useState(initialPortal); // 'student' | 'admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Update portal if initialPortal prop changes
  useEffect(() => {
    if (initialPortal) {
      setPortal(initialPortal);
    }
  }, [initialPortal]);

  // Clear fields and error when switching portal tab
  const handlePortalChange = (selectedPortal) => {
    setPortal(selectedPortal);
    setErrorMsg('');
    if (selectedPortal === 'admin') {
      setEmail('admin@college.edu');
      setPassword('password123');
    } else {
      setEmail('student@college.edu');
      setPassword('password123');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const portalRole = portal === 'admin' ? 'admin' : null;
    const result = await login(email, password, portalRole);
    if (!result || !result.success) {
      setErrorMsg(
        result?.message ||
          (portal === 'admin'
            ? 'Admin login failed. Please verify admin credentials or register an admin account.'
            : 'Login failed. Please check your credentials or register below.')
      );
    }
    setLoading(false);
  };

  const fillQuickCredentials = (role) => {
    if (role === 'admin') {
      setEmail('admin@college.edu');
      setPassword('password123');
      setPortal('admin');
    } else {
      setEmail('student@college.edu');
      setPassword('password123');
      setPortal('student');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] flex items-center justify-center p-4 py-8 relative overflow-y-auto">
      {/* Background organic gradients */}
      <div className="mesh-gradient-bg">
        <div className="mesh-shape-1"></div>
        <div className="mesh-shape-2"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Branding header */}
        <div className="text-center mb-5">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight flex items-center justify-center">
            <span>Event</span>
            <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Hub
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-brand-500 ml-1.5 mb-1 inline-block"></span>
          </h2>
          <p className="text-xs text-slate-500 mt-1.5 font-medium">
            Smart College Event & Fest Management System • 2026
          </p>
        </div>

        {/* 1-Click Viva Examiner Demo Drawer */}
        <div className="mb-4 p-3.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              1-Click Viva Quick Test
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200">
              Exam Mode
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => demoLogin('student')}
              className="p-2 rounded-xl bg-slate-50 hover:bg-brand-50 border border-slate-200 hover:border-brand-300 text-left transition-all group cursor-pointer"
            >
              <p className="text-xs font-bold text-slate-800 group-hover:text-brand-700 flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-brand-600" />
                <span>Student</span>
              </p>
              <p className="text-[10px] text-slate-500 truncate">student@college.edu</p>
            </button>

            <button
              type="button"
              onClick={() => demoLogin('admin')}
              className="p-2 rounded-xl bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-300 text-left transition-all group cursor-pointer"
            >
              <p className="text-xs font-bold text-slate-800 group-hover:text-purple-700 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                <span>Admin</span>
              </p>
              <p className="text-[10px] text-slate-500 truncate">admin@college.edu</p>
            </button>
          </div>
        </div>

        {/* Portal Selection Tabs (Student vs Admin) */}
        <div className="bg-slate-200/80 p-1.5 rounded-2xl flex items-center gap-1.5 mb-4 shadow-inner">
          <button
            type="button"
            onClick={() => handlePortalChange('student')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              portal === 'student'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-brand-600" />
            <span>Student Portal</span>
          </button>

          <button
            type="button"
            onClick={() => handlePortalChange('admin')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              portal === 'admin'
                ? 'bg-purple-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-purple-200" />
            <span>Admin Portal</span>
          </button>
        </div>

        {/* Login Card */}
        <div
          className={`p-6 rounded-3xl bg-white border shadow-soft transition-all duration-300 ${
            portal === 'admin' ? 'border-purple-200/90 shadow-purple-500/5' : 'border-slate-200/80'
          }`}
        >
          {/* Active Portal Header Badge */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                {portal === 'admin' ? (
                  <>
                    <ShieldCheck className="w-4 h-4 text-purple-600" />
                    <span>Faculty Administrator Login</span>
                  </>
                ) : (
                  <>
                    <GraduationCap className="w-4 h-4 text-brand-600" />
                    <span>Student / Attendee Login</span>
                  </>
                )}
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {portal === 'admin'
                  ? 'Access fest approvals, live analytics & gate control'
                  : 'Access fest events, registered passes & tickets'}
              </p>
            </div>
            <span
              className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                portal === 'admin'
                  ? 'bg-purple-100 text-purple-800 border border-purple-200'
                  : 'bg-brand-100 text-brand-800 border border-brand-200'
              }`}
            >
              {portal === 'admin' ? 'Admin Role' : 'Student Role'}
            </span>
          </div>

          {/* Error Notice */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p>{errorMsg}</p>
                {errorMsg.toLowerCase().includes('register') && (
                  <button
                    type="button"
                    onClick={() => onSwitchToRegister(portal)}
                    className="mt-1.5 text-brand-600 hover:text-brand-700 underline font-bold cursor-pointer block"
                  >
                    Click here to create your {portal === 'admin' ? 'Admin' : 'Student'} account &rarr;
                  </button>
                )}
                {errorMsg.toLowerCase().includes('switch to the student portal') && (
                  <button
                    type="button"
                    onClick={() => handlePortalChange('student')}
                    className="mt-1.5 text-purple-700 hover:text-purple-800 underline font-bold cursor-pointer block"
                  >
                    Switch to Student Portal now &rarr;
                  </button>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-bold text-slate-700 block">
                  {portal === 'admin' ? 'Admin / Faculty College Email' : 'Student College Email'}
                </label>
                <button
                  type="button"
                  onClick={() => fillQuickCredentials(portal)}
                  className="text-[10px] font-bold text-brand-600 hover:underline cursor-pointer"
                >
                  ⚡ Fill Demo
                </button>
              </div>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={portal === 'admin' ? 'admin@college.edu' : 'student@college.edu'}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 font-medium bg-slate-50/50 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 font-medium bg-slate-50/50 focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 text-white rounded-xl font-bold shadow-sm transition-all hover:shadow cursor-pointer mt-2 flex items-center justify-center gap-2 ${
                portal === 'admin'
                  ? 'bg-purple-700 hover:bg-purple-800'
                  : 'bg-slate-900 hover:bg-brand-600'
              }`}
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : portal === 'admin' ? (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Sign In to Admin Portal</span>
                </>
              ) : (
                <>
                  <GraduationCap className="w-4 h-4" />
                  <span>Sign In to Student Portal</span>
                </>
              )}
            </button>
          </form>

          {/* Alternate switch links */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col items-center gap-2 text-center">
            {portal === 'admin' ? (
              <>
                <button
                  type="button"
                  onClick={() => onSwitchToRegister('admin')}
                  className="text-purple-700 hover:text-purple-800 font-bold text-xs cursor-pointer flex items-center gap-1"
                >
                  <span>Register new Faculty / Admin account</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handlePortalChange('student')}
                  className="text-slate-500 hover:text-slate-700 text-[11px] cursor-pointer"
                >
                  ← Switch back to Student Portal
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => onSwitchToRegister('student')}
                  className="text-brand-600 hover:text-brand-700 font-bold text-xs cursor-pointer flex items-center gap-1"
                >
                  <span>New student or attendee? Register here</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handlePortalChange('admin')}
                  className="text-purple-700 hover:text-purple-900 font-bold text-[11px] cursor-pointer flex items-center gap-1"
                >
                  <ShieldCheck className="w-3 h-3 text-purple-600" />
                  <span>Faculty or HOD? Switch to Admin Login</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
