
import React from 'react';
import { SAMPLE_ATTENDANCE } from '../constants';
import { User } from '../types';

const Attendance: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Sessions</p>
          <p className="text-4xl font-black text-slate-800">42</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Present</p>
          <p className="text-4xl font-black text-green-600">38</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Absent</p>
          <p className="text-4xl font-black text-red-500">4</p>
        </div>
        <div className="bg-novaYellow p-6 rounded-3xl shadow-lg text-center">
          <p className="text-xs font-bold text-novaBlue/60 uppercase tracking-widest mb-1">Overall %</p>
          <p className="text-4xl font-black text-novaBlue">{user.attendancePercent}%</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-bold text-slate-800 text-lg">Detailed Attendance History</h3>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">Export PDF</button>
            <button className="px-4 py-2 bg-novaBlue text-white rounded-xl text-xs font-bold hover:bg-blue-800 transition-colors shadow-md">Request Leave</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50/30">
                <th className="px-8 py-4">Date</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Check In</th>
                <th className="px-8 py-4">Check Out</th>
                <th className="px-8 py-4">Duration</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {SAMPLE_ATTENDANCE.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5 font-semibold text-slate-700">{new Date(record.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      record.status === 'PRESENT' ? 'bg-green-100 text-green-700' : 
                      record.status === 'ABSENT' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-sm text-slate-600 font-medium">{record.timeIn || '--'}</td>
                  <td className="px-8 py-5 text-sm text-slate-600 font-medium">{record.timeOut || '--'}</td>
                  <td className="px-8 py-5 text-sm text-slate-600 font-medium">{record.duration || '--'}</td>
                  <td className="px-8 py-5 text-right">
                    <button className="text-slate-400 hover:text-novaBlue">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-6 bg-slate-50/30 text-center border-t border-slate-50">
           <button className="text-novaBlue text-sm font-bold hover:underline">View More Records</button>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex items-center space-x-6">
        <div className="w-16 h-16 bg-novaBlue rounded-2xl flex items-center justify-center text-3xl">💡</div>
        <div>
          <h4 className="font-bold text-novaBlue">Attendance Tip</h4>
          <p className="text-sm text-blue-700/80">Maintaining over 90% attendance unlocks the "Golden Learner" badge and grants priority access to lab sessions.</p>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
