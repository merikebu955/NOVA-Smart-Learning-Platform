
import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { SAMPLE_SCHEDULE } from '../constants';

const Dashboard: React.FC<{ user: User }> = ({ user }) => {
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [nextSession, setNextSession] = useState(SAMPLE_SCHEDULE[0]);

  // Helper to simulate time remaining for the demo
  // In a real app, this would parse the actual start time from the schedule item
  useEffect(() => {
    // We'll target the first session as "Next Up" and mock a 45-minute countdown for demo purposes
    let totalSeconds = 45 * 60 + 12; 

    const timer = setInterval(() => {
      if (totalSeconds <= 0) {
        setTimeLeft('LIVE NOW');
        return;
      }
      totalSeconds--;
      const hours = Math.floor(totalSeconds / 3600);
      const mins = Math.floor((totalSeconds % 3600) / 60);
      const secs = totalSeconds % 60;
      
      const parts = [];
      if (hours > 0) parts.push(`${hours}h`);
      parts.push(`${mins}m`);
      parts.push(`${secs}s`);
      setTimeLeft(parts.join(' '));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Live Alert Banner - Only shows if a session is starting soon */}
      <div className="bg-novaYellow/10 border-2 border-novaYellow rounded-3xl p-4 flex items-center justify-between animate-pulse">
        <div className="flex items-center space-x-4 px-4">
          <div className="w-10 h-10 bg-novaYellow rounded-full flex items-center justify-center text-novaBlue">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-novaBlue opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-novaBlue"></span>
            </span>
          </div>
          <div>
            <h4 className="font-bold text-novaBlue">Starting Soon: {nextSession.subject}</h4>
            <p className="text-xs text-novaBlue/70">Ensure your camera is ready for smart attendance.</p>
          </div>
        </div>
        <div className="bg-novaBlue text-novaYellow px-6 py-2 rounded-2xl font-black text-sm shadow-lg">
          {timeLeft}
        </div>
      </div>

      <div className="bg-gradient-to-r from-novaBlue to-blue-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-4xl font-black mb-2">Hello, {user.name}! 👋</h2>
          <p className="text-blue-100 text-lg opacity-90">Welcome to your learning dashboard. You have 2 classes today.</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex-1 min-w-[140px]">
              <p className="text-xs uppercase font-bold tracking-widest opacity-70">Attendance</p>
              <p className="text-3xl font-black">{user.attendancePercent || 0}%</p>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex-1 min-w-[140px]">
              <p className="text-xs uppercase font-bold tracking-widest opacity-70">Active Classes</p>
              <p className="text-3xl font-black">4</p>
            </div>
            <div className="bg-novaYellow rounded-2xl p-4 text-novaBlue flex-1 min-w-[200px] shadow-lg relative group">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs uppercase font-bold tracking-widest opacity-70">Next Up</p>
                  <p className="text-lg font-black truncate">{nextSession.subject}</p>
                </div>
                <div className="bg-novaBlue/10 p-2 rounded-lg text-xs font-black">
                  {timeLeft === 'LIVE NOW' ? 'LIVE' : timeLeft}
                </div>
              </div>
              <div className="mt-2 text-[10px] font-bold opacity-60">Starts at {nextSession.time.split(' - ')[0]}</div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 p-8 text-white/10 font-black text-9xl pointer-events-none select-none">NOVA</div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Schedule Preview */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-800">Today's Schedule</h3>
            <button className="text-novaBlue font-semibold text-sm hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            {SAMPLE_SCHEDULE.slice(0, 3).map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow group">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${
                    item.type === 'CLASS' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'
                  }`}>
                    {item.type === 'CLASS' ? '📚' : '📝'}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 group-hover:text-novaBlue transition-colors">{item.subject}</h4>
                    <p className="text-xs text-slate-500">{item.time} • {item.teacher}</p>
                  </div>
                </div>
                <div className="text-right">
                   <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                     item.type === 'CLASS' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                   }`}>
                     {item.type}
                   </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Announcements / Group Chat Preview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-800">Announcements</h3>
            <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold">2</span>
          </div>
          <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
            <div className="p-4 space-y-4">
              <div className="flex space-x-3">
                <img src="https://picsum.photos/seed/prof1/100" className="w-8 h-8 rounded-full" alt="Prof" />
                <div className="bg-slate-50 p-3 rounded-2xl rounded-tl-none flex-1">
                  <p className="text-xs font-bold text-slate-800">Dr. Wilson</p>
                  <p className="text-xs text-slate-600">The lecture notes for chapter 4 have been uploaded. Check the materials tab.</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <img src="https://picsum.photos/seed/prof2/100" className="w-8 h-8 rounded-full" alt="Prof" />
                <div className="bg-slate-50 p-3 rounded-2xl rounded-tl-none flex-1">
                  <p className="text-xs font-bold text-slate-800">Admin</p>
                  <p className="text-xs text-slate-600">Maintenance scheduled for Saturday night.</p>
                </div>
              </div>
            </div>
            <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
              <button className="text-novaBlue text-xs font-bold">Join Class Discussion →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
