
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

interface EditSettings {
  brightness: number;
  contrast: number;
  saturation: number;
  grayscale: number;
  sepia: number;
  rotation: number;
}

const INITIAL_EDIT_SETTINGS: EditSettings = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  grayscale: 0,
  sepia: 0,
  rotation: 0,
};

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [editedImageUrl, setEditedImageUrl] = useState<string | null>(null);
  const [styleReference, setStyleReference] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editSettings, setEditSettings] = useState<EditSettings>(INITIAL_EDIT_SETTINGS);
  const [error, setError] = useState<string | null>(null);
  const [hasKey, setHasKey] = useState<boolean>(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const styleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    checkKeyStatus();
  }, []);

  useEffect(() => {
    if (isEditing && (generatedImageUrl || editedImageUrl)) {
      applyFilters();
    }
  }, [editSettings, isEditing]);

  const checkKeyStatus = async () => {
    try {
      const selected = await window.aistudio.hasSelectedApiKey();
      setHasKey(selected);
    } catch (e) {
      setHasKey(false);
    }
  };

  const handleOpenKeySelector = async () => {
    await window.aistudio.openSelectKey();
    setHasKey(true);
  };

  const handleStyleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStyleReference(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async (mode: 'new' | 'style' = 'new') => {
    if (!prompt.trim() && mode === 'new') return;
    
    setIsGenerating(true);
    setError(null);
    if (mode === 'new') {
      setGeneratedImageUrl(null);
      setEditedImageUrl(null);
    }
    setIsEditing(false);
    setEditSettings(INITIAL_EDIT_SETTINGS);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const parts: any[] = [];
      
      if (mode === 'style' && generatedImageUrl && styleReference) {
        // Base image to transform
        parts.push({
          inlineData: {
            data: generatedImageUrl.split(',')[1],
            mimeType: 'image/png'
          }
        });
        // Style reference image
        parts.push({
          inlineData: {
            data: styleReference.split(',')[1],
            mimeType: 'image/png'
          }
        });
        parts.push({ text: `Redraw the first image by applying the artistic style, textures, lighting, and color palette of the second image. Maintain the original subject and basic composition.` });
      } else if (styleReference && prompt.trim()) {
        // Generate new image with style reference
        parts.push({
          inlineData: {
            data: styleReference.split(',')[1],
            mimeType: 'image/png'
          }
        });
        parts.push({ text: `Generate an image based on this prompt: "${prompt}". Apply the artistic style and aesthetic of the attached reference image.` });
      } else {
        // Basic prompt generation
        parts.push({ text: prompt });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: { parts },
        config: {
          imageConfig: {
            aspectRatio: "1:1",
            imageSize: size
          }
        },
      });

      let base64Data: string | null = null;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            base64Data = part.inlineData.data;
            break;
          }
        }
      }

      if (base64Data) {
        setGeneratedImageUrl(`data:image/png;base64,${base64Data}`);
      } else {
        setError("The model completed but didn't return visual data. Try a more descriptive prompt or a different style image.");
      }
    } catch (err: any) {
      console.error("Creative Studio Error:", err);
      if (err.message?.includes("Requested entity was not found")) {
        setError("Session expired or API Key invalid. Please re-authorize.");
        setHasKey(false);
      } else {
        setError("Style transfer failed. Ensure your reference images are clear and try again.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const applyFilters = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = generatedImageUrl!;
    img.onload = () => {
      if (editSettings.rotation % 180 !== 0) {
        canvas.width = img.height;
        canvas.height = img.width;
      } else {
        canvas.width = img.width;
        canvas.height = img.height;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.filter = `brightness(${editSettings.brightness}%) contrast(${editSettings.contrast}%) saturate(${editSettings.saturation}%) grayscale(${editSettings.grayscale}%) sepia(${editSettings.sepia}%)`;

      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((editSettings.rotation * Math.PI) / 180);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      
      setEditedImageUrl(canvas.toDataURL('image/png'));
    };
  };

  const handleRotate = () => {
    setEditSettings(prev => ({ ...prev, rotation: (prev.rotation + 90) % 360 }));
  };

  const handleQuickRotate = () => {
    if (!generatedImageUrl) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = generatedImageUrl;
    img.onload = () => {
      canvas.width = img.height;
      canvas.height = img.width;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((90 * Math.PI) / 180);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      const rotated = canvas.toDataURL('image/png');
      setGeneratedImageUrl(rotated);
      if (editedImageUrl) setEditedImageUrl(rotated);
    };
  };

  const handleCropToSquare = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = editedImageUrl || generatedImageUrl!;
    img.onload = () => {
      const side = Math.min(img.width, img.height);
      canvas.width = side;
      canvas.height = side;
      ctx.clearRect(0, 0, side, side);
      ctx.drawImage(img, (img.width - side) / 2, (img.height - side) / 2, side, side, 0, 0, side, side);
      setEditedImageUrl(canvas.toDataURL('image/png'));
      setIsEditing(false);
      setGeneratedImageUrl(canvas.toDataURL('image/png'));
      setEditSettings(INITIAL_EDIT_SETTINGS);
    };
  };

  const saveEditedImage = () => {
    if (editedImageUrl) {
      setGeneratedImageUrl(editedImageUrl);
      setIsEditing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20 selection:bg-[#EEDC82] selection:text-[#00509D]">
      <div className="bg-white p-6 md:p-12 rounded-[4rem] border border-slate-100 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-16 text-[#00509D] opacity-5 font-black text-9xl pointer-events-none select-none">STUDIO</div>
        
        <div className="relative z-10 flex flex-col xl:flex-row gap-12">
          {/* Controls Side */}
          <div className="xl:w-5/12 space-y-8">
            <div>
              <div className="inline-block px-4 py-1 bg-yellow-50 text-yellow-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border border-yellow-100">
                {isEditing ? 'Editing Mode Active' : 'Pro Tier Model Active'}
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tighter mb-4">
                {isEditing ? 'Image Editor' : 'Creative Engine'}
              </h2>
              <p className="text-slate-500 font-medium text-base leading-relaxed">
                {isEditing 
                  ? 'Fine-tune your visual asset with professional-grade filters and transformation tools.' 
                  : 'Transform concepts into high-fidelity visual assets or transfer artistic styles between images.'}
              </p>
            </div>

            {!hasKey ? (
              <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 text-center space-y-6">
                <div className="w-20 h-20 bg-[#EEDC82] rounded-[2rem] flex items-center justify-center text-3xl mx-auto shadow-xl">🔑</div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-[#00509D]">Authorize Studio</h3>
                  <p className="text-sm text-slate-500 max-w-xs mx-auto">
                    A paid Google Cloud project key is required for high-resolution generation.
                  </p>
                </div>
                <button 
                  onClick={handleOpenKeySelector}
                  className="bg-[#00509D] text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-blue-900/20 hover:scale-105 transition-all"
                >
                  Authorize Identity
                </button>
              </div>
            ) : isEditing ? (
              <div className="space-y-6 animate-in slide-in-from-left-4 duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: 'Brightness', key: 'brightness', min: 0, max: 200 },
                    { label: 'Contrast', key: 'contrast', min: 0, max: 200 },
                    { label: 'Saturation', key: 'saturation', min: 0, max: 200 },
                    { label: 'Grayscale', key: 'grayscale', min: 0, max: 100 },
                    { label: 'Sepia', key: 'sepia', min: 0, max: 100 },
                  ].map((filter) => (
                    <div key={filter.key} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{filter.label}</label>
                        <span className="text-[10px] font-bold text-[#00509D]">{editSettings[filter.key as keyof EditSettings]}%</span>
                      </div>
                      <input 
                        type="range" 
                        min={filter.min} 
                        max={filter.max} 
                        value={editSettings[filter.key as keyof EditSettings]}
                        onChange={(e) => setEditSettings(prev => ({ ...prev, [filter.key]: parseInt(e.target.value) }))}
                        className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#00509D]"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button onClick={handleRotate} className="flex-1 py-3 bg-slate-100 text-[#00509D] rounded-2xl font-black text-xs hover:bg-[#EEDC82]/20 transition-all flex items-center justify-center gap-2">🔄 Rotate 90°</button>
                  <button onClick={handleCropToSquare} className="flex-1 py-3 bg-slate-100 text-[#00509D] rounded-2xl font-black text-xs hover:bg-[#EEDC82]/20 transition-all flex items-center justify-center gap-2">✂️ Square Crop</button>
                </div>

                <div className="flex gap-4 pt-4">
                  <button onClick={saveEditedImage} className="flex-1 py-4 bg-[#00509D] text-white rounded-2xl font-black shadow-xl shadow-blue-900/20 hover:scale-105 transition-all">Apply Changes</button>
                  <button onClick={() => { setIsEditing(false); setEditedImageUrl(null); }} className="px-6 py-4 bg-red-50 text-red-600 rounded-2xl font-black hover:bg-red-100 transition-all">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="space-y-8 animate-in slide-in-from-left-4 duration-300">
                <div className="space-y-4">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Visual Concept</label>
                  <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your vision or leave empty to transform current image style..."
                    className="w-full h-32 px-8 py-6 rounded-[2rem] bg-slate-50 border border-slate-100 focus:border-[#00509D] focus:ring-8 focus:ring-blue-500/5 outline-none transition-all resize-none text-slate-800 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Quality</label>
                    <div className="flex p-1.5 bg-slate-100 rounded-2xl w-full justify-between">
                      {(['1K', '2K', '4K'] as const).map((r) => (
                        <button key={r} onClick={() => setSize(r)} className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${size === r ? 'bg-[#00509D] text-white shadow-lg' : 'text-slate-500 hover:text-[#00509D]'}`}>
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Style Ref</label>
                    <div className="relative group">
                      <div 
                        onClick={() => styleInputRef.current?.click()}
                        className={`h-[46px] rounded-2xl border-2 border-dashed flex items-center justify-center cursor-pointer transition-all ${styleReference ? 'border-[#00509D] bg-blue-50/50' : 'border-slate-200 bg-slate-50 hover:border-[#00509D]'}`}
                      >
                        {styleReference ? (
                          <div className="flex items-center gap-2">
                            <img src={styleReference} className="w-8 h-8 rounded-lg object-cover" alt="style" />
                            <span className="text-[10px] font-black text-[#00509D] uppercase">Style Active</span>
                          </div>
                        ) : (
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">+ Add Style</span>
                        )}
                      </div>
                      {styleReference && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); setStyleReference(null); }}
                          className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >✕</button>
                      )}
                      <input ref={styleInputRef} type="file" accept="image/*" onChange={handleStyleUpload} className="hidden" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => handleGenerate('new')}
                    disabled={isGenerating || !prompt.trim()}
                    className="w-full py-5 bg-[#00509D] text-white rounded-2xl font-black text-lg shadow-2xl shadow-blue-900/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-4"
                  >
                    {isGenerating && !generatedImageUrl ? (
                      <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <><span>✨</span><span>{styleReference ? 'Generate with Style' : 'Generate Asset'}</span></>
                    )}
                  </button>

                  {generatedImageUrl && styleReference && (
                    <button 
                      onClick={() => handleGenerate('style')}
                      disabled={isGenerating}
                      className="w-full py-4 bg-[#EEDC82] text-[#00509D] rounded-2xl font-black shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 animate-in fade-in slide-in-from-bottom-2"
                    >
                      {isGenerating ? (
                        <div className="w-5 h-5 border-4 border-[#00509D]/30 border-t-[#00509D] rounded-full animate-spin"></div>
                      ) : (
                        <><span>🎭</span><span>Apply Style Transfer</span></>
                      )}
                    </button>
                  )}
                </div>
                
                {error && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 flex items-center gap-3">
                    <span className="text-lg">⚠️</span>
                    <p className="text-xs font-bold">{error}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Preview Side */}
          <div className="xl:w-7/12 min-h-[500px]">
             <div className="h-full bg-slate-50 rounded-[4rem] border-4 border-dashed border-slate-200 flex flex-col items-center justify-center p-6 md:p-10 overflow-hidden relative shadow-inner group">
               {isGenerating ? (
                 <div className="text-center space-y-6">
                   <div className="relative">
                      <div className="w-20 h-20 bg-[#EEDC82] rounded-[2rem] flex items-center justify-center text-4xl mx-auto shadow-xl animate-bounce">🎨</div>
                      <div className="absolute inset-0 bg-[#EEDC82]/20 blur-2xl rounded-full animate-pulse"></div>
                   </div>
                   <p className="text-[#00509D] font-black">AI is dreaming up your {size} vision...</p>
                 </div>
               ) : (generatedImageUrl || editedImageUrl) ? (
                 <div className="relative w-full h-full flex flex-col animate-in zoom-in-95 duration-500">
                    <img 
                      src={isEditing ? editedImageUrl! : generatedImageUrl!} 
                      className="w-full h-full object-contain rounded-[3rem] shadow-2xl transition-transform duration-700" 
                      alt="Output" 
                    />
                    
                    {!isEditing && (
                      <div className="absolute top-6 right-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                        <button onClick={() => setIsEditing(true)} title="Edit Image" className="bg-white/90 backdrop-blur p-4 rounded-2xl text-[#00509D] font-black shadow-xl hover:bg-[#EEDC82] transition-colors">✏️</button>
                        <button onClick={handleQuickRotate} title="Rotate 90° Clockwise" className="bg-white/90 backdrop-blur p-4 rounded-2xl text-[#00509D] font-black shadow-xl hover:bg-[#EEDC82] transition-colors">🔄</button>
                        <a href={generatedImageUrl!} download={`nova-${Date.now()}.png`} title="Download" className="bg-white/90 backdrop-blur p-4 rounded-2xl text-[#00509D] font-black shadow-xl hover:bg-[#EEDC82] transition-colors">💾</a>
                      </div>
                    )}
                 </div>
               ) : (
                 <div className="text-center space-y-4 opacity-30 group-hover:opacity-100 transition-opacity">
                    <div className="text-8xl">🖼️</div>
                    <p className="font-black text-slate-400 uppercase tracking-widest text-sm text-center px-8">Your creative output will materialize here</p>
                 </div>
               )}
             </div>
          </div>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      <div className="bg-[#00509D] p-10 rounded-[4rem] text-white flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="w-16 h-16 bg-[#EEDC82] rounded-[2rem] flex items-center justify-center text-3xl shrink-0 shadow-2xl">🪄</div>
        <div className="space-y-1 flex-1">
          <h4 className="text-xl font-black">AI Style Transfer</h4>
          <p className="text-blue-100 font-medium leading-relaxed opacity-80 text-sm">
            Upload a reference image (like an oil painting or a sketch) to inject its specific "soul"—its textures, lighting, and palette—into your generations. You can even redraw existing images in new styles.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
