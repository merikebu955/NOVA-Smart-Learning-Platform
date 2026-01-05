
import React, { useState } from 'react';
// Corrected import: SAMPLE_MARKS is not in types.ts
import { User, Classroom } from '../types';
import { SAMPLE_CLASSES } from '../constants';

const TeacherPanel: React.FC<{ user: User; onStartLive: () => void }> = ({ user, onStartLive }) => {
  const [activeView, setActiveView] = useState<'classes' | 'marks' | 'attendance'>('classes');
  const [selectedClass, setSelectedClass] = useState<Classroom | null>(null);

  const teacherClasses = SAMPLE_CLASSES.filter(c => c.department === user.department);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => setActiveView('classes')}
          className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${activeView === 'classes' ? 'bg-novaBlue text-white' : 'bg-white text-slate-500 border border-slate-100'}`}
        >
          My Classes
        </button>
        <button 
          onClick={() => setActiveView('marks')}
          className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${activeView === 'marks' ? 'bg-novaBlue text-white' : 'bg-white text-slate-500 border border-slate-100'}`}
        >
          Manage Marks
        </button>
        <button 
          onClick={() => setActiveView('attendance')}
          className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${activeView === 'attendance' ? 'bg-novaBlue text-white' : 'bg-white text-slate-500 border border-slate-100'}`}
        >
          Attendance Reports
        </button>
      </div>

      {activeView === 'classes' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teacherClasses.map(cls => (
            <div key={cls.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between group hover:border-novaBlue transition-all">
              <div>
                <div className="w-12 h-12 bg-blue-50 text-novaBlue rounded-2xl flex items-center justify-center text-xl mb-4 font-bold group-hover:bg-novaBlue group-hover:text-white transition-all">
                  {cls.name.charAt(0)}
                </div>
                <h3 className="text-xl font-bold text-slate-800">{cls.name}</h3>
                <p className="text-sm text-slate-500 mt-1">{cls.studentCount} Students Enrolled</p>
              </div>
              <div className="mt-8 space-y-3">
                <button 
                  onClick={onStartLive}
                  className="w-full bg-novaBlue text-white py-3 rounded-2xl font-bold hover:bg-blue-800 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/10"
                >
                  <span>🎥</span>
                  <span>Start Live Session</span>
                </button>
                <button className="w-full bg-white border border-slate-200 text-slate-700 py-3 rounded-2xl font-bold hover:bg-slate-50 transition-all">
                  Manage Materials
                </button>
              </div>
            </div>
          ))}
          <button className="border-2 border-dashed border-slate-200 p-6 rounded-3xl flex flex-col items-center justify-center text-slate-400 hover:text-novaBlue hover:border-novaBlue transition-all group">
            <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">➕</span>
            <span className="font-bold">Create New Class</span>
          </button>
        </div>
      )}

      {activeView === 'marks' && (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center">
            <h3 className="text-xl font-bold text-slate-800">Grade Input Portal</h3>
            <select className="bg-slate-50 px-4 py-2 rounded-xl text-sm font-bold border-none outline-none">
              <option>Select Class</option>
              {teacherClasses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <table className="w-full">
            <thead className="bg-slate-50/50">
              <tr className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                <th className="px-8 py-4 text-left">Student Name</th>
                <th className="px-8 py-4 text-left">ID</th>
                <th className="px-8 py-4 text-left">Current Score</th>
                <th className="px-8 py-4 text-left">New Score</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[1,2,3,4].map(i => (
                <tr key={i} className="hover:bg-slate-50/30">
                  <td className="px-8 py-5">
                    <div className="flex items-center space-x-3">
                      <img src={`https://picsum.photos/seed/${i}/100`} className="w-10 h-10 rounded-full" alt="Stud" />
                      <span className="font-bold text-slate-700">Student Name {i}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm text-slate-500">NOVA-STU0{i}</td>
                  <td className="px-8 py-5 text-sm font-bold text-novaBlue">85%</td>
                  <td className="px-8 py-5">
                    <input type="number" className="w-20 bg-slate-100 px-3 py-2 rounded-lg text-sm font-bold outline-none focus:ring-2 focus:ring-novaBlue/20" defaultValue={85} />
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="text-novaBlue font-bold text-sm hover:underline">Update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeView === 'attendance' && (
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm text-center text-slate-400">
           <div className="text-6xl mb-4">📈</div>
           <h3 className="text-xl font-bold text-slate-700">Attendance Analytics</h3>
           <p className="max-w-sm mx-auto mt-2">Select a class to view detailed attendance reports including smart face-detection analytics.</p>
           <div className="mt-8 flex justify-center gap-4">
              {teacherClasses.map(c => (
                <button key={c.id} className="px-6 py-3 bg-slate-50 rounded-2xl font-bold text-slate-700 hover:bg-novaYellow transition-all">{c.name}</button>
              ))}
           </div>
        </div>
      )}
    </div>
  );
};

export default TeacherPanel;
