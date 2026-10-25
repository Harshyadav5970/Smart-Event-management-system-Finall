// Harsh Yadav - TYCS Roll 129
// EventHub: Smart College Event & Fest Management System
// College Fest Portal 2026
// Main Application Component with Dual Dashboard Modes & Modals

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import StudentDashboard from './pages/StudentDashboard';
import OrganizerDashboard from './pages/OrganizerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import QRScannerModal from './components/QRScannerModal';
import CreateEventModal from './components/CreateEventModal';
import ProjectSynopsisModal from './components/ProjectSynopsisModal';

import { Sparkles } from 'lucide-react';

function AppContent() {
  const { user, loading, toast } = useAuth();
  const [authView, setAuthView] = useState('login'); // 'login' | 'register'
  const [authPortal, setAuthPortal] = useState('student'); // 'student' | 'admin'
  const [activeTab, setActiveTab] = useState('browse'); // 'browse' | 'tickets' | 'analytics' | 'announcements'
  const [searchQuery, setSearchQuery] = useState('');

  // Global modals state
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [isSynopsisOpen, setIsSynopsisOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // When an administrator logs in, automatically open the Admin Panel (analytics tab)
  useEffect(() => {
    if (user?.role === 'admin' && activeTab === 'browse') {
      setActiveTab('analytics');
    }
  }, [user?.role]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FD] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-9 h-9 rounded-full border-3 border-brand-200 border-t-brand-600 animate-spin"></div>
          <p className="text-xs font-bold text-slate-600">Loading EventHub...</p>
        </div>
      </div>
    );
  }

  // Not logged in: Show Login / Register
  if (!user) {
    return (
      <>
        {toast && (
          <div
            className={`fixed top-4 right-4 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl shadow-xl text-xs font-bold text-white transition-all transform animate-bounce ${
              toast.type === 'error'
                ? 'bg-rose-600 shadow-rose-600/30'
                : toast.type === 'warning'
                ? 'bg-amber-500 shadow-amber-500/30'
                : toast.type === 'info'
                ? 'bg-slate-800 shadow-slate-800/30'
                : 'bg-emerald-600 shadow-emerald-600/30'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{toast.message}</span>
          </div>
        )}
        {authView === 'register' ? (
          <Register
            initialRole={authPortal}
            onSwitchToLogin={(role) => {
              if (role) setAuthPortal(role);
              setAuthView('login');
            }}
          />
        ) : (
          <Login
            initialPortal={authPortal}
            onSwitchToRegister={(role) => {
              if (role) setAuthPortal(role);
              setAuthView('register');
            }}
          />
        )}
      </>
    );
  }

  return (
    <div className="h-screen w-full flex overflow-hidden bg-[#F8F9FD] text-slate-900">
      {/* Left Sidebar (Desktop Pinned + Mobile Slide-Out) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        onOpenCreateEvent={() => setIsCreateEventOpen(true)}
        onOpenScanner={() => setIsScannerOpen(true)}
        onOpenSynopsis={() => setIsSynopsisOpen(true)}
      />

      {/* Mobile Backdrop Overlay */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-30 md:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Main Content Area (Scrolls smoothly with pinned sticky navbar) */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto min-w-0">
        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenSynopsis={() => setIsSynopsisOpen(true)}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen((prev) => !prev)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {/* Render Active View based on Role & Active Tab */}
          {activeTab === 'analytics' && user.role === 'admin' ? (
            <AdminDashboard
              onOpenScanner={() => setIsScannerOpen(true)}
              onOpenCreateEvent={() => setIsCreateEventOpen(true)}
            />
          ) : activeTab === 'analytics' && user.role === 'organizer' ? (
            <OrganizerDashboard
              onOpenScanner={() => setIsScannerOpen(true)}
              onOpenCreateEvent={() => setIsCreateEventOpen(true)}
            />
          ) : (
            <StudentDashboard
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              searchQuery={searchQuery}
              onOpenScanner={() => setIsScannerOpen(true)}
              onOpenCreateEvent={() => setIsCreateEventOpen(true)}
              onOpenSynopsis={() => setIsSynopsisOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Global Modals */}
      <QRScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanSuccess={() => {}}
      />

      <CreateEventModal
        isOpen={isCreateEventOpen}
        onClose={() => setIsCreateEventOpen(false)}
        onEventCreated={() => {
          setActiveTab('browse');
        }}
      />

      <ProjectSynopsisModal
        isOpen={isSynopsisOpen}
        onClose={() => setIsSynopsisOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
