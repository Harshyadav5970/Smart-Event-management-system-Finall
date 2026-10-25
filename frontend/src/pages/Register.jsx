// Harsh Yadav - TYCS Roll 129
// EventHub: Smart College Event & Fest Management System
// College Fest Portal 2026
// Registration Page with Student, Organizer & Administrator (HOD/Faculty) Signup

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  GraduationCap,
  Lock,
  Mail,
  User,
  Phone,
  ArrowLeft,
  AlertCircle,
  ShieldCheck,
  KeyRound,
  CheckCircle2,
  Building,
  Briefcase
} from 'lucide-react';

export default function Register({ onSwitchToLogin, initialRole = 'student' }) {
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: initialRole || 'student', // 'student' | 'organizer' | 'admin'
    rollNo: initialRole === 'admin' ? 'FAC-ADM-129' : '129',
    department: 'Computer Science',
    year: initialRole === 'admin' ? 'HOD / Faculty In-Charge' : 'TYCS-B',
    phone: '',
    adminSecretKey: initialRole === 'admin' ? 'ADMIN2026' : ''
  });

  useEffect(() => {
    if (initialRole) {
      handleRoleSwitch(initialRole);
    }
  }, [initialRole]);

  const handleRoleSwitch = (newRole) => {
    setErrorMsg('');
    if (newRole === 'admin') {
      setFormData((prev) => ({
        ...prev,
        role: 'admin',
        rollNo: prev.rollNo && prev.rollNo !== '129' ? prev.rollNo : 'FAC-ADM-129',
        year: prev.year && prev.year !== 'TYCS-B' ? prev.year : 'HOD - Computer Science',
        adminSecretKey: 'ADMIN2026'
      }));
    } else if (newRole === 'organizer') {
      setFormData((prev) => ({
        ...prev,
        role: 'organizer',
        rollNo: prev.rollNo && prev.rollNo !== 'FAC-ADM-129' ? prev.rollNo : 'CLUB-ORG-01',
        year: 'Student Council Head',
        adminSecretKey: ''
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        role: 'student',
        rollNo: prev.rollNo === 'FAC-ADM-129' || prev.rollNo === 'CLUB-ORG-01' ? '129' : prev.rollNo || '129',
        year: prev.year === 'HOD - Computer Science' || prev.year === 'Student Council Head' ? 'TYCS-B' : prev.year || 'TYCS-B',
        adminSecretKey: ''
      }));
    }
  };

  const fillQuickDemoData = (role) => {
    if (role === 'admin') {
      setFormData({
        name: 'Prof. Harsh Yadav (Admin)',
        email: 'admin.fest@college.edu',
        password: 'password123',
        role: 'admin',
        rollNo: 'FAC-HOD-129',
        department: 'Computer Science',
        year: 'HOD & Fest In-Charge',
        phone: '+91 98765 43210',
        adminSecretKey: 'ADMIN2026'
      });
    } else {
      setFormData({
        name: 'Harsh Yadav',
        email: 'harsh.student@college.edu',
        password: 'password123',
        role: 'student',
        rollNo: '129',
        department: 'Computer Science',
        year: 'TYCS-B',
        phone: '+91 98765 43210',
        adminSecretKey: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (formData.role === 'admin' && !formData.adminSecretKey.trim()) {
      setErrorMsg('Please provide the Admin Security Passcode (Demo: ADMIN2026).');
      return;
    }

    setLoading(true);
    const result = await register(formData);
    if (result && result.success) {
      onSwitchToLogin(formData.role === 'admin' ? 'admin' : 'student');
    } else {
      setErrorMsg(result?.message || 'Registration failed. Please check inputs and try again.');
    }
    setLoading(false);
  };

  const isAdmin = formData.role === 'admin';

  return (
    <div className="min-h-screen bg-[#F8F9FD] flex items-center justify-center p-4 py-8 relative overflow-y-auto">
      <div className="mesh-gradient-bg">
        <div className="mesh-shape-1"></div>
        <div className="mesh-shape-2"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-5">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight flex items-center justify-center">
            <span>Event</span>
            <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Hub
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-brand-500 ml-1.5 mb-1 inline-block"></span>
          </h2>
          <p className="text-xs text-slate-500 mt-1.5 font-medium">
            Create an Account • College Fest Portal 2026
          </p>
        </div>

        {/* Role Type Selector Pills */}
        <div className="bg-slate-200/80 p-1.5 rounded-2xl flex items-center gap-1 mb-4 shadow-inner">
          <button
            type="button"
            onClick={() => handleRoleSwitch('student')}
            className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              formData.role === 'student'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-brand-600" />
            <span>Student</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleSwitch('organizer')}
            className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              formData.role === 'organizer'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
            <span>Organizer</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleSwitch('admin')}
            className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              formData.role === 'admin'
                ? 'bg-purple-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-purple-200" />
            <span>Admin</span>
          </button>
        </div>

        <div
          className={`p-6 rounded-3xl bg-white border shadow-soft transition-all duration-300 ${
            isAdmin ? 'border-purple-200/90 shadow-purple-500/5' : 'border-slate-200/80'
          }`}
        >
          {/* Header Badge */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                {isAdmin ? (
                  <>
                    <ShieldCheck className="w-4 h-4 text-purple-600" />
                    <span>Faculty Administrator Registration</span>
                  </>
                ) : (
                  <>
                    <GraduationCap className="w-4 h-4 text-brand-600" />
                    <span>{formData.role === 'organizer' ? 'Club Organizer' : 'Student'} Registration</span>
                  </>
                )}
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {isAdmin
                  ? 'Authorised faculty, HODs and event supervisors'
                  : 'Register to participate and book college fest passes'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => fillQuickDemoData(formData.role)}
              className="text-[10px] font-bold px-2 py-1 rounded-lg bg-slate-100 hover:bg-brand-50 text-slate-700 hover:text-brand-700 border border-slate-200 transition-colors cursor-pointer"
            >
              ⚡ Fill Demo
            </button>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p>{errorMsg}</p>
                {errorMsg.toLowerCase().includes('already exists') && (
                  <button
                    type="button"
                    onClick={() => onSwitchToLogin(isAdmin ? 'admin' : 'student')}
                    className="mt-1.5 text-brand-600 hover:text-brand-700 underline font-bold cursor-pointer block"
                  >
                    Click here to Sign In now &rarr;
                  </button>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            {/* Full Name */}
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                {isAdmin ? 'Faculty Full Name & Honorific' : 'Full Name'}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder={isAdmin ? 'e.g. Prof. Rajesh Sharma' : 'e.g. Harsh Yadav'}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 font-medium bg-slate-50/50 focus:bg-white"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                {isAdmin ? 'Official College / Faculty Email' : 'College Email'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder={isAdmin ? 'e.g. admin.fest@college.edu' : 'e.g. harsh@college.edu'}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 font-medium bg-slate-50/50 focus:bg-white"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="font-bold text-slate-700 block mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="Minimum 6 characters"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 font-medium bg-slate-50/50 focus:bg-white"
                />
              </div>
            </div>

            {/* Admin Security Key (Only shown for Admin role) */}
            {isAdmin && (
              <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200/90 space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-purple-900 flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-purple-700" />
                    <span>Admin Security Passcode</span>
                  </label>
                  <span className="text-[10px] font-bold text-purple-700 bg-purple-200/60 px-1.5 py-0.5 rounded">
                    Viva: ADMIN2026
                  </span>
                </div>
                <input
                  type="text"
                  required
                  placeholder="Enter ADMIN2026"
                  value={formData.adminSecretKey}
                  onChange={(e) => setFormData({ ...formData, adminSecretKey: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-purple-300 focus:outline-none focus:border-purple-600 font-mono font-bold text-purple-900 bg-white"
                />
                <p className="text-[10px] text-purple-600">
                  Secures admin registration from public misuse. Use demo passcode <strong className="font-mono">ADMIN2026</strong>.
                </p>
              </div>
            )}

            {/* ID & Designation / Roll No & Year */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {isAdmin ? 'Faculty / Admin ID' : 'Roll No / ID'}
                </label>
                <input
                  type="text"
                  placeholder={isAdmin ? 'e.g. FAC-ADM-129' : 'e.g. 129'}
                  value={formData.rollNo}
                  onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 font-medium bg-slate-50/50 focus:bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {isAdmin ? 'Designation / Post' : 'Class / Year'}
                </label>
                <input
                  type="text"
                  placeholder={isAdmin ? 'e.g. HOD / Dean' : 'e.g. TYCS-B'}
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 font-medium bg-slate-50/50 focus:bg-white"
                />
              </div>
            </div>

            {/* Department & Phone */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Department</label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 font-medium bg-white"
                >
                  <option value="Computer Science">Computer Science</option>
                  <option value="Information Tech">Information Tech</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Administration Office">Administration Office</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Contact Phone</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 font-medium bg-slate-50/50 focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 text-white rounded-xl font-bold shadow-sm transition-all hover:shadow cursor-pointer mt-2 flex items-center justify-center gap-2 ${
                isAdmin
                  ? 'bg-purple-700 hover:bg-purple-800'
                  : 'bg-slate-900 hover:bg-brand-600'
              }`}
            >
              {loading ? (
                <span>Registering Account...</span>
              ) : isAdmin ? (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Register as Administrator</span>
                </>
              ) : (
                <>
                  <GraduationCap className="w-4 h-4" />
                  <span>Complete Registration</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-4 pt-3 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={() => onSwitchToLogin(isAdmin ? 'admin' : 'student')}
              className="text-brand-600 hover:text-brand-700 font-bold text-xs flex items-center justify-center gap-1 mx-auto cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>
                Already have an {isAdmin ? 'Admin' : 'account'}? Sign in to {isAdmin ? 'Admin' : 'Student'} Portal
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
