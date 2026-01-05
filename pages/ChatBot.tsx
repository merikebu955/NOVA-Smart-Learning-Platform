
import React, { useState, useRef, useEffect } from 'react';
import { User } from '../types';
import { askAiTutor } from '../services/geminiService';

const ChatBot: React.FC<{ user: User }> = ({ user }) => {
  const [messages, setMessages] = useState([
    { id: '1', text: `Hello ${user.name}! I'm your NOVA AI helper. Ask me anything about your modules, assignments, or study topics!`, isAi: true, timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = { id: Date.now().toString(), text: input, isAi: false, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const aiResponseText = await askAiTutor(input);
    const aiMsg = { id: (Date.now() + 1).toString(), text: aiResponseText, isAi: true, timestamp: new Date() };
    
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-in zoom-in-95 duration-500">
      {/* Header */}
      <div className="bg-novaBlue p-6 text-white flex items-center space-x-4">
        <div className="w-12 h-12 bg-novaYellow rounded-2xl flex items-center justify-center text-novaBlue text-2xl">🤖</div>
        <div>
          <h3 className="text-xl font-bold leading-tight">NOVA Smart Tutor</h3>
          <p className="text-blue-100 text-xs font-medium opacity-80 uppercase tracking-widest">Powered by Gemini AI</p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isAi ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
              msg.isAi 
                ? 'bg-white rounded-tl-none border border-slate-100 text-slate-800' 
                : 'bg-novaBlue rounded-tr-none text-white'
            }`}>
              <div className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</div>
              <div className={`text-[10px] mt-2 opacity-50 ${msg.isAi ? 'text-slate-400' : 'text-blue-100'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100 flex items-center space-x-4">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your tutor anything..."
          className="flex-1 bg-slate-50 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-novaBlue/20 border border-slate-100 transition-all text-slate-800"
        />
        <button 
          disabled={isLoading}
          className="bg-novaBlue text-white p-4 rounded-2xl hover:bg-blue-800 transition-colors shadow-lg shadow-blue-500/20 disabled:opacity-50"
        >
          <svg className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/></svg>
        </button>
      </form>
    </div>
  );
};

export default ChatBot;
