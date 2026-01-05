
import React, { useState } from 'react';
import Welcome from './pages/Welcome';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ChatBot from './pages/ChatBot';
import LiveSession from './pages/LiveSession';
import Attendance from './pages/Attendance';
import Marks from './pages/Marks';
import TeacherPanel from './pages/TeacherPanel';
import AdminPanel from './pages/AdminPanel';
import Portfolio from './pages/Portfolio';
import ImageGenerator from './pages/ImageGenerator';
import { User, UserRole } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('dashboard');
  };

  if (!user) {
    return <Welcome onLogin={handleLogin} />;
  }

  const renderContent = () => {
    // Shared content or Role-specific tabs
    switch (activeTab) {
      case 'dashboard':
        if (user.role === UserRole.TEACHER) return <TeacherPanel user={user} onStartLive={() => setActiveTab('live')} />;
        if (user.role === UserRole.ADMIN) return <AdminPanel user={user} />;
        return <Dashboard user={user} />;
      case 'chatbot':
        return <ChatBot user={user} />;
      case 'creative':
        return <ImageGenerator />;
      case 'live':
        return <LiveSession user={user} />;
      case 'attendance':
        return <Attendance user={user} />;
      case 'marks':
        return <Marks />;
      case 'profile':
        return <Portfolio user={user} />;
      case 'groupchat':
        return (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-6">
            <div className="w-32 h-32 bg-slate-100 rounded-[2.5rem] flex items-center justify-center text-6xl shadow-inner">💬</div>
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-black text-slate-800">Class Community</h3>
              <p className="max-w-md mx-auto text-slate-500">Engage in academic discussions moderated by Gemini AI. Connect with {user.role === UserRole.STUDENT ? 'classmates' : 'your students'} instantly.</p>
            </div>
            <button className="bg-novaBlue text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-blue-500/20 hover:scale-105 transition-all">Open Class Chat</button>
          </div>
        );
      case 'schedule':
        return (
           <div className="space-y-8">
             <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-3xl font-black text-slate-800">Time Table</h3>
                  <p className="text-slate-500">Manage your academic routine</p>
                </div>
                {user.role === UserRole.ADMIN && (
                  <button className="bg-novaBlue text-white px-6 py-2 rounded-xl text-sm font-bold">Reschedule Classes</button>
                )}
             </div>
             <div className="grid grid-cols-7 gap-4 min-h-[500px]">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                  <div key={day} className="bg-white p-5 rounded-[2.5rem] border border-slate-100 flex flex-col space-y-4 hover:shadow-lg transition-all group">
                    <h4 className="text-center font-black text-novaBlue border-b border-slate-50 pb-3 group-hover:text-novaYellow transition-colors">{day}</h4>
                    <div className="flex-1 space-y-3">
                      {day === 'Mon' && (
                        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 text-[10px] space-y-1">
                          <p className="font-bold text-novaBlue">Adv. Maths</p>
                          <p className="text-blue-400">09:00 AM</p>
                          <p className="text-[8px] opacity-60">Dr. Wilson</p>
                        </div>
                      )}
                      {day === 'Wed' && (
                        <div className="bg-novaYellow/10 p-4 rounded-2xl border border-novaYellow/50 text-[10px] space-y-1">
                          <p className="font-bold text-novaBlue">AI Ethics</p>
                          <p className="text-novaBlue/60">10:00 AM</p>
                          <p className="text-[8px] opacity-60">Dr. Doe</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
             </div>
           </div>
        );
      case 'admin':
        return <AdminPanel user={user} />;
      default:
        return <div className="p-12 text-center text-slate-400">Section Under Maintenance</div>;
    }
  };

  return (
    <Layout user={user} onLogout={handleLogout} activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
