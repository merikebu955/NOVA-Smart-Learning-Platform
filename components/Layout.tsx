
import React from 'react';
import { User, UserRole } from '../types';

interface LayoutProps {
  user: User;
  onLogout: () => void;
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ user, onLogout, children, activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: '🏠' },
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'chatbot', name: 'AI Tutor', icon: '🤖' },
    { id: 'creative', name: 'Creative Studio', icon: '🎨' },
    { id: 'groupchat', name: 'Group Chat', icon: '💬' },
    { id: 'schedule', name: 'Schedule', icon: '📅' },
    { id: 'live', name: 'Live Sessions', icon: '🎥' },
    { id: 'attendance', name: 'Attendance', icon: '📊' },
    { id: 'marks', name: 'Marks', icon: '⭐' },
  ];

  if (user.role === UserRole.ADMIN) {
    tabs.push({ id: 'admin', name: 'Admin Panel', icon: '⚙️' });
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-novaBlue text-white flex flex-col shadow-xl z-20">
        <div className="p-6 flex items-center space-x-3 bg-novaBlue border-b border-blue-800">
          <div className="w-10 h-10 bg-novaYellow rounded-lg flex items-center justify-center text-novaBlue font-bold text-xl">N</div>
          <span className="text-2xl font-bold tracking-wider">NOVA</span>
        </div>
        
        <nav className="flex-1 mt-4 overflow-y-auto px-4">
          <div className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === tab.id 
                    ? 'bg-novaYellow text-novaBlue font-semibold shadow-md translate-x-1' 
                    : 'hover:bg-blue-800 text-blue-100'
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-blue-800">
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-200 hover:bg-red-900/30 transition-colors"
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shadow-sm z-10">
          <h1 className="text-xl font-bold text-slate-800 capitalize">{activeTab.replace(/([A-Z])/g, ' $1')}</h1>
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-800">{user.name}</p>
              <p className="text-xs text-slate-500 uppercase tracking-tighter">{user.role}</p>
            </div>
            <img 
              src={user.photo || `https://picsum.photos/seed/${user.id}/100`} 
              alt="Avatar" 
              className="w-10 h-10 rounded-full border-2 border-novaYellow shadow-sm"
            />
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-8">
          {children}
        </section>
      </main>
    </div>
  );
};

export default Layout;
