
import React, { useState } from 'react';
import { User, UserRole } from '../types';

interface WelcomeProps {
  onLogin: (user: User) => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    department: '',
    role: UserRole.STUDENT,
    photo: ''
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        setFormData({ ...formData, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mockUser: User = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      name: formData.name || (isLogin ? formData.username : 'User'),
      email: formData.email || 'user@nova.edu',
      username: formData.username,
      department: formData.department || 'Computer Science',
      role: formData.role,
      photo: formData.photo || undefined,
      attendancePercent: formData.role === UserRole.STUDENT ? 88 : undefined,
    };
    onLogin(mockUser);
  };

  return (
    <div className="min-h-screen bg-[#00509D] flex flex-col md:flex-row font-sans selection:bg-[#EEDC82] selection:text-[#00509D]">
      {/* Branding Side */}
      <div className="md:w-1/2 flex flex-col justify-center p-8 md:p-20 text-white relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-white opacity-5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-[#EEDC82] opacity-10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 space-y-8">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-[#EEDC82] rounded-3xl flex items-center justify-center text-[#00509D] font-black text-4xl shadow-2xl rotate-3 hover:rotate-0 transition-transform cursor-pointer">N</div>
            <div>
              <h1 className="text-7xl font-black tracking-tighter leading-none">NOVA</h1>
              <p className="text-[#EEDC82] text-xl font-bold tracking-[0.2em] mt-1 uppercase">Smart SLMS</p>
            </div>
          </div>
          
          <div className="max-w-md">
            <h2 className="text-3xl font-bold mb-6 text-blue-50">Empowering the next generation of digital learners.</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10">
                <span className="text-2xl">🧠</span>
                <p className="text-sm font-medium">Adaptive AI Learning Paths</p>
              </div>
              <div className="flex items-center space-x-4 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10">
                <span className="text-2xl">👁️</span>
                <p className="text-sm font-medium">Smart Biometric Attendance</p>
              </div>
              <div className="flex items-center space-x-4 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10">
                <span className="text-2xl">🎨</span>
                <p className="text-sm font-medium">Creative Studio & Generative Tools</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Side */}
      <div className="md:w-1/2 bg-white md:rounded-l-[5rem] flex items-center justify-center p-8 md:p-12 shadow-2xl z-20">
        <div className="w-full max-w-lg animate-in fade-in slide-in-from-right-12 duration-700">
          <div className="mb-10 text-center md:text-left">
            <h3 className="text-4xl font-black text-slate-800">{isLogin ? 'Sign In' : 'Create Account'}</h3>
            <p className="text-slate-500 mt-2 font-medium">Welcome to the future of education.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="flex flex-col items-center justify-center space-y-4 mb-8">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-[2.5rem] bg-slate-50 border-4 border-dashed border-slate-200 flex items-center justify-center overflow-hidden transition-all group-hover:border-[#00509D]">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center">
                        <span className="text-3xl block mb-1">📸</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Upload Photo</span>
                      </div>
                    )}
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handlePhotoUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-[#EEDC82] p-2 rounded-xl shadow-lg text-[#00509D] group-hover:scale-110 transition-transform">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/></svg>
                  </div>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div className="col-span-2 md:col-span-1">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">Username</label>
                <input 
                  type="text" 
                  required 
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#00509D] focus:ring-4 focus:ring-blue-500/5 outline-none transition-all font-semibold text-slate-700"
                  placeholder="e.g. nova_user"
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">Password</label>
                <input 
                  type="password" 
                  required 
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#00509D] focus:ring-4 focus:ring-blue-500/5 outline-none transition-all font-semibold text-slate-700"
                  placeholder="••••••••"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            {!isLogin && (
              <>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      required 
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#00509D] focus:ring-4 focus:ring-blue-500/5 outline-none transition-all font-semibold text-slate-700"
                      placeholder="Sami Diriba"
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">Email</label>
                    <input 
                      type="email" 
                      required 
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#00509D] focus:ring-4 focus:ring-blue-500/5 outline-none transition-all font-semibold text-slate-700"
                      placeholder="sami@nova.edu"
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">Department</label>
                  <select 
                    required
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#00509D] focus:ring-4 focus:ring-blue-500/5 outline-none transition-all font-semibold text-slate-700 appearance-none cursor-pointer"
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                  >
                    <option value="">Choose Department</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Information Systems">Information Systems</option>
                  </select>
                </div>

                <div className="p-1.5 bg-slate-100 rounded-3xl flex space-x-1.5">
                  {[UserRole.STUDENT, UserRole.TEACHER, UserRole.ADMIN].map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setFormData({...formData, role})}
                      className={`flex-1 py-3 rounded-[1.25rem] text-[10px] font-black uppercase tracking-widest transition-all ${
                        formData.role === role 
                          ? 'bg-[#00509D] text-white shadow-xl translate-y-[-2px]' 
                          : 'text-slate-500 hover:text-[#00509D] hover:bg-white'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </>
            )}

            <button 
              type="submit" 
              className="w-full bg-[#00509D] text-white font-black py-5 rounded-[2rem] shadow-2xl shadow-blue-900/40 hover:scale-[1.02] active:scale-[0.98] transition-all text-lg flex items-center justify-center space-x-3 group"
            >
              <span>{isLogin ? 'Access Portal' : 'Create Identity'}</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-slate-400 font-bold text-sm">
              {isLogin ? "Don't have an identity?" : "Already part of Nova?"}
              <button 
                onClick={() => setIsLogin(!isLogin)} 
                className="ml-2 text-[#00509D] font-black hover:underline underline-offset-4"
              >
                {isLogin ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
