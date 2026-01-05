
import React, { useState } from 'react';
import { User, UserRole } from '../types';

const AdminPanel: React.FC<{ user: User }> = ({ user }) => {
  const [activeView, setActiveView] = useState<'department' | 'teachers' | 'students' | 'scheduler'>('department');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-2 rounded-2xl border border-slate-100 flex shadow-sm w-fit">
        {[
          { id: 'department', name: 'Dept Info', icon: '🏫' },
          { id: 'teachers', name: 'Teachers', icon: '👨‍🏫' },
          { id: 'students', name: 'Students', icon: '👨‍🎓' },
          { id: 'scheduler', name: 'Scheduler', icon: '🗓' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id as any)}
            className={`px-6 py-3 rounded-xl flex items-center space-x-2 font-bold text-sm transition-all ${
              activeView === item.id ? 'bg-novaBlue text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {activeView === 'department' && (
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div className="flex items-center space-x-6 mb-10">
                <div className="w-20 h-20 bg-novaYellow rounded-[2rem] flex items-center justify-center text-novaBlue text-4xl font-black">CS</div>
                <div>
                  <h2 className="text-3xl font-black text-slate-800">{user.department}</h2>
                  <p className="text-slate-500">Official Department Dashboard</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-slate-50 rounded-3xl">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Active Faculty</p>
                  <p className="text-4xl font-black text-slate-800">24</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-3xl">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Students</p>
                  <p className="text-4xl font-black text-slate-800">1,240</p>
                </div>
                <div className="p-6 bg-novaBlue text-white rounded-3xl col-span-2">
                  <h4 className="font-bold mb-2">Department Announcement</h4>
                  <p className="text-sm opacity-80">Final year project proposals are due next Wednesday. Please ensure all faculty review their assigned candidates.</p>
                </div>
              </div>
            </div>
          )}

          {(activeView === 'teachers' || activeView === 'students') && (
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
               <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                  <h3 className="text-xl font-bold text-slate-800 capitalize">Manage {activeView}</h3>
                  <button className="bg-novaBlue text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/10">Add {activeView === 'teachers' ? 'Teacher' : 'Student'}</button>
               </div>
               <div className="p-4 space-y-4">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-slate-100">
                      <div className="flex items-center space-x-4">
                         <img src={`https://picsum.photos/seed/adm${i}/100`} className="w-12 h-12 rounded-2xl" alt="P" />
                         <div>
                            <p className="font-bold text-slate-800">{activeView === 'teachers' ? 'Prof. ' : ''}User {i}</p>
                            <p className="text-xs text-slate-500">ID: NOVA-{activeView.toUpperCase().slice(0,1)}{i}00</p>
                         </div>
                      </div>
                      <div className="flex space-x-2">
                         <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-novaBlue">⚙️</button>
                         <button className="w-10 h-10 rounded-xl bg-red-50 text-red-400 border border-red-100 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors">🗑️</button>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {activeView === 'scheduler' && (
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
               <h3 className="text-2xl font-black text-slate-800 mb-6">Course Scheduler</h3>
               <div className="space-y-4">
                  <p className="text-slate-500 text-sm">Drag and drop sessions to manage departmental schedule conflicts.</p>
                  <div className="grid grid-cols-2 gap-4">
                     <button className="p-8 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 font-bold hover:bg-white hover:border-novaBlue hover:text-novaBlue transition-all">
                       Add New Slot
                     </button>
                     <button className="p-8 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 font-bold hover:bg-white hover:border-novaBlue hover:text-novaBlue transition-all">
                       Clear Conflicts
                     </button>
                  </div>
               </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-novaBlue p-8 rounded-[2.5rem] text-white shadow-xl">
             <h3 className="font-bold mb-4">Quick Stats</h3>
             <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                   <span className="opacity-60">System Health</span>
                   <span className="font-black text-green-400">99.8%</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                   <span className="opacity-60">Avg. Attendance</span>
                   <span className="font-black">92.4%</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                   <span className="opacity-60">Pending Approvals</span>
                   <span className="font-black text-novaYellow">12</span>
                </div>
             </div>
          </div>
          
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
             <h3 className="font-bold text-slate-800 mb-4">Admin Logs</h3>
             <div className="space-y-4">
                {[1,2,3].map(i => (
                  <div key={i} className="flex space-x-3 text-xs">
                     <div className="w-2 h-2 rounded-full bg-novaBlue mt-1"></div>
                     <div>
                        <p className="font-bold text-slate-700">Teacher Account Activated</p>
                        <p className="text-slate-400">2 hours ago</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
