
import React from 'react';
import { User, UserRole } from '../types';

interface PortfolioProps {
  user: User;
}

const Portfolio: React.FC<PortfolioProps> = ({ user }) => {
  const skills = [
    { name: 'Fullstack Dev', level: 95 },
    { name: 'AI Integration', level: 90 },
    { name: 'System Arch', level: 85 },
    { name: 'UI/UX Engineering', level: 92 },
  ];

  const achievements = [
    {
      title: 'Cursor Hackathon Ambo 2026',
      subtitle: 'Certificate of Appreciation & Winner',
      icon: '🏆',
      date: 'Jan 2026',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Dean\'s Honor List',
      subtitle: 'Top 1% Academic Performer',
      icon: '📜',
      date: 'Dec 2025'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-12 duration-1000 pb-20 selection:bg-[#EEDC82] selection:text-[#00509D]">
      {/* Hero Branding Section */}
      <section className="grid lg:grid-cols-12 gap-10 items-stretch">
        <div className="lg:col-span-8 bg-white rounded-[4rem] p-10 md:p-16 border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#EEDC82] opacity-5 rounded-full blur-3xl group-hover:opacity-20 transition-opacity"></div>
          
          <div className="relative z-10 space-y-8">
            <div className="inline-flex items-center space-x-3 px-5 py-2 bg-blue-50 rounded-full border border-blue-100">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00509D] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00509D]"></span>
              </span>
              <span className="text-[10px] font-black text-[#00509D] uppercase tracking-widest">Available for Innovation</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-black text-slate-800 tracking-tighter leading-[0.9]">
                {user.name.split(' ')[0]}<br/>
                <span className="text-[#00509D]">{user.name.split(' ')[1] || 'Identity'}</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-lg leading-relaxed">
                Pioneering the intersection of <span className="text-slate-800 font-bold italic">Human Learning</span> and <span className="text-[#00509D] font-bold underline decoration-[#EEDC82] decoration-4 underline-offset-8">Artificial Intelligence</span>.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-6">
              <button className="px-10 py-5 bg-[#00509D] text-white rounded-[2rem] font-black text-lg shadow-2xl shadow-blue-900/20 hover:scale-105 transition-all">
                Let's Collaborate
              </button>
              <div className="flex -space-x-3 items-center ml-2">
                {[1,2,3,4].map(i => (
                  <img key={i} src={`https://picsum.photos/seed/coll${i}/100`} className="w-12 h-12 rounded-full border-4 border-white shadow-md" alt="coll" />
                ))}
                <div className="pl-6 text-xs font-bold text-slate-400">Trusted by 12+ Peer Experts</div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col space-y-8">
          <div className="flex-1 bg-[#00509D] rounded-[4rem] p-10 text-white shadow-2xl relative overflow-hidden group">
            <img 
              src={user.photo || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop"} 
              className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
              alt="Portrait" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#00509D] via-transparent to-transparent"></div>
            <div className="relative z-10 h-full flex flex-col justify-end">
              <div className="bg-[#EEDC82] text-[#00509D] px-6 py-2 rounded-2xl w-fit font-black text-xs uppercase tracking-widest mb-4">
                {user.role}
              </div>
              <p className="text-sm font-bold opacity-80">{user.department}</p>
              <h3 className="text-2xl font-black">Official ID Profile</h3>
            </div>
          </div>
          
          <div className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-xl space-y-4">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Connect</h4>
            <div className="flex justify-between items-center group cursor-pointer">
              <span className="font-bold text-slate-700 group-hover:text-[#00509D] transition-colors">GitHub</span>
              <span className="text-xl">🐙</span>
            </div>
            <div className="flex justify-between items-center group cursor-pointer">
              <span className="font-bold text-slate-700 group-hover:text-[#00509D] transition-colors">LinkedIn</span>
              <span className="text-xl">🔗</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats & Skills Section */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 grid grid-cols-2 gap-8">
          {skills.map(skill => (
            <div key={skill.name} className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-md group hover:border-[#00509D] transition-all">
              <div className="flex justify-between items-end mb-4">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{skill.name}</span>
                <span className="text-2xl font-black text-[#00509D]">{skill.level}%</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#00509D] to-blue-400 rounded-full group-hover:animate-pulse" 
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-[#EEDC82] rounded-[4rem] p-10 flex flex-col justify-center text-[#00509D] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2 opacity-60">Success Rate</p>
          <h2 className="text-6xl font-black">98.4%</h2>
          <p className="text-sm font-bold mt-4 max-w-[200px] leading-relaxed">Consistency is the bridge between goals and accomplishment.</p>
        </div>
      </section>

      {/* Achievement Spotlight (Hackathon Focus) */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-black text-slate-800 tracking-tighter">Spotlight Achievements</h3>
          <button className="text-[#00509D] font-bold hover:underline">View Verified Records</button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10">
          {achievements.map((item, idx) => (
            <div key={idx} className="bg-white rounded-[4rem] overflow-hidden border border-slate-100 shadow-2xl flex flex-col md:flex-row group transition-all hover:scale-[1.01]">
              {item.image && (
                <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
                  <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="ach" />
                  <div className="absolute inset-0 bg-[#00509D]/20"></div>
                </div>
              )}
              <div className="flex-1 p-10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-4xl">{item.icon}</span>
                  <span className="text-[10px] font-black text-slate-400 uppercase">{item.date}</span>
                </div>
                <div>
                  <h4 className="text-2xl font-black text-slate-800 leading-tight">{item.title}</h4>
                  <p className="text-sm text-slate-500 font-medium mt-2">{item.subtitle}</p>
                </div>
                <button className="pt-4 flex items-center space-x-2 text-[#00509D] font-black text-xs group-hover:translate-x-2 transition-transform">
                  <span>View Credentials</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Signature */}
      <footer className="pt-20 text-center space-y-6">
        <div className="flex items-center justify-center space-x-4 opacity-20 grayscale">
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" className="h-6" alt="google" />
          <div className="w-px h-6 bg-slate-400"></div>
          <span className="font-black tracking-widest text-2xl">NOVA SLMS</span>
        </div>
        <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">Digital Architect Identity v1.0.26</p>
      </footer>
    </div>
  );
};

export default Portfolio;
