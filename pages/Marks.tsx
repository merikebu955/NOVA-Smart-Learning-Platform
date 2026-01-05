
import React from 'react';
import { SAMPLE_MARKS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Marks: React.FC = () => {
  const average = SAMPLE_MARKS.reduce((acc, curr) => acc + curr.score, 0) / SAMPLE_MARKS.length;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-800">Academic Performance</h3>
            <div className="flex items-center space-x-2">
               <span className="w-3 h-3 bg-novaBlue rounded-full"></span>
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Score %</span>
            </div>
          </div>
          
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SAMPLE_MARKS}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 600, fill: '#64748b'}} />
                <YAxis hide domain={[0, 100]} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="score" radius={[8, 8, 8, 8]} barSize={40}>
                  {SAMPLE_MARKS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.score > 85 ? '#00509D' : '#EEDC82'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-novaBlue p-8 rounded-3xl text-white flex flex-col justify-center items-center text-center shadow-xl space-y-4">
          <div className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">Your GPA</div>
          <div className="text-7xl font-black text-novaYellow">3.82</div>
          <div className="w-16 h-1 bg-white/20 rounded-full"></div>
          <p className="text-sm opacity-80 leading-relaxed px-4">Great work! You are in the top 5% of your department this semester.</p>
          <button className="mt-4 bg-white/10 hover:bg-white/20 transition-colors px-6 py-2 rounded-xl text-sm font-bold border border-white/10">Download Report Card</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SAMPLE_MARKS.map((mark) => (
          <div key={mark.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-xl">📚</div>
              <div className="text-2xl font-black text-novaBlue">{mark.grade}</div>
            </div>
            <h4 className="font-bold text-slate-800 text-sm mb-1">{mark.subject}</h4>
            <div className="flex items-center space-x-2">
              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${mark.score > 85 ? 'bg-green-500' : 'bg-novaYellow'}`} 
                  style={{ width: `${mark.score}%` }}
                ></div>
              </div>
              <span className="text-xs font-bold text-slate-500">{mark.score}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marks;
