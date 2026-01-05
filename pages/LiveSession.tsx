
import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types';

const LiveSession: React.FC<{ user: User }> = ({ user }) => {
  const [isActive, setIsActive] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [awayTimer, setAwayTimer] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    let interval: any;
    if (isActive) {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
        
        // Simulate face detection logic
        // In a real app, you'd use a face detection model here.
        const detected = Math.random() > 0.05; // 95% chance to "see" face
        setFaceDetected(detected);

        if (!detected) {
          setAwayTimer(prev => prev + 1);
        } else {
          setAwayTimer(0);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (awayTimer >= 300) { // 5 minutes away
      stopSession();
      alert("Session ended due to inactivity (5 minutes away).");
    }
  }, [awayTimer]);

  const startSession = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
      setIsActive(true);
    } catch (err) {
      alert("Camera access denied or unavailable.");
    }
  };

  const stopSession = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setIsActive(false);
    setSessionTime(0);
    setAwayTimer(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-4">
          {/* Main Video Area */}
          <div className="relative aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl group border-4 border-slate-200">
            {!isActive ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-slate-900">
                <div className="text-6xl mb-4">🎥</div>
                <h3 className="text-2xl font-bold mb-2">Join Advanced Mathematics</h3>
                <p className="text-slate-400 mb-6">Class started 10 minutes ago</p>
                <button 
                  onClick={startSession}
                  className="bg-novaYellow text-novaBlue px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
                >
                  Join Session
                </button>
              </div>
            ) : (
              <>
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                <div className="absolute top-6 left-6 flex items-center space-x-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl text-white border border-white/20">
                  <div className={`w-3 h-3 rounded-full animate-pulse ${faceDetected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-xs font-bold uppercase tracking-widest">{faceDetected ? 'Face Detected' : 'No Face Detected'}</span>
                </div>
                <div className="absolute top-6 right-6 bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-bold flex items-center space-x-2">
                  <span className="animate-pulse">●</span>
                  <span>LIVE • {formatTime(sessionTime)}</span>
                </div>
                
                {/* Overlay controls */}
                <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center space-x-8 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl hover:bg-white/40 transition-colors">🎤</button>
                   <button onClick={stopSession} className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-2xl hover:bg-red-700 transition-colors shadow-xl">📞</button>
                   <button className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl hover:bg-white/40 transition-colors">✋</button>
                </div>
              </>
            )}
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src="https://picsum.photos/seed/prof1/100" className="w-12 h-12 rounded-2xl" alt="Prof" />
              <div>
                <h4 className="font-bold text-slate-800">Advanced Mathematics - Linear Algebra</h4>
                <p className="text-sm text-slate-500">By Dr. Sarah Wilson</p>
              </div>
            </div>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <img key={i} src={`https://picsum.photos/seed/user${i}/100`} className="w-8 h-8 rounded-full border-2 border-white" />
              ))}
              <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500">+24</div>
            </div>
          </div>
        </div>

        {/* Info Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 border-b border-slate-50 pb-2">Session Info</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Status</span>
                <span className={`font-bold ${isActive ? 'text-green-600' : 'text-slate-400'}`}>{isActive ? 'Active' : 'Offline'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Smart Attendance</span>
                <span className="text-slate-800 font-bold">Enabled</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Inactivity Limit</span>
                <span className="text-slate-800 font-bold">5 mins</span>
              </div>
              {isActive && !faceDetected && (
                <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-medium border border-red-100 animate-bounce">
                  ⚠️ Away for {awayTimer}s. Session will end if you're away for 5 mins.
                </div>
              )}
            </div>
          </div>

          <div className="bg-novaBlue p-6 rounded-3xl text-white space-y-4 shadow-xl">
             <h3 className="font-bold">Session Rules</h3>
             <ul className="text-xs space-y-2 opacity-80">
               <li>• Keep camera on for attendance.</li>
               <li>• Mute microphone when not speaking.</li>
               <li>• Use 'Raise Hand' for questions.</li>
               <li>• AI will track your participation level.</li>
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveSession;
