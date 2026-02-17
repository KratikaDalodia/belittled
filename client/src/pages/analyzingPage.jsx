import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const AnalyzingPage = () => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const hasFetched = useRef(false);

  // Use the production URL from Vercel settings, or fallback to local for dev
  const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

  const roastSteps = [
    "Scanning emotional whiplash...",
    "Counting skipped tracks (coward)...",
    "Consulting the algorithm of shame...",
    "Analyzing your repetitive listening habits...",
    "Finding the exact moment you lost your taste...",
    "Preparing the final burn..."
  ];

  useEffect(() => {
    if (hasFetched.current) return; 
    hasFetched.current = true;
    
    const fetchSpotifyData = async () => {
      const token = localStorage.getItem('spotify_access_token');
      if (!token) {
        navigate('/');
        return;
      }

      try {
        // Updated to use dynamic API_BASE
        const response = await fetch(`${API_BASE}/get-stats?token=${token}`);
        const data = await response.json();

        if (data.artists && data.tracks && data.roast) {
          localStorage.setItem('user_top_artists', JSON.stringify(data.artists));
          localStorage.setItem('user_top_tracks', JSON.stringify(data.tracks));
          localStorage.setItem('ai_roast', data.roast);

          setProgress(100);
          setTimeout(() => navigate('/result'), 800); 
        }
      } catch (err) {
        console.error("Connection Error:", err);
        setTimeout(() => navigate('/'), 3000); 
      }
    };

    fetchSpotifyData();

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 70) return prev + 1;
        if (prev < 90) return prev + 0.5;
        return prev;
      });
    }, 100);

    const stepInterval = setInterval(() => {
      setStep((prev) => (prev < roastSteps.length - 1 ? prev + 1 : prev));
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, [navigate, API_BASE]);

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center overflow-hidden relative selection:bg-green-500/30">
      {/* Background Grid - Scaled for mobile */}
      <div className="absolute inset-0 z-0 opacity-10" 
           style={{ backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`, 
           backgroundSize: '30px 30px' }}>
      </div>
      
      <div className="relative z-10 w-full max-w-sm md:max-w-md px-6">
        {/* Header - Responsive font sizes */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-2 italic uppercase">Analyzing Shame</h2>
          <p className="text-zinc-500 text-[10px] md:text-sm uppercase tracking-widest">Neural Network is Disappointed</p>
        </div>

        {/* Analysis Stepper - Centered with flex-grow to handle different heights */}
        <div className="space-y-4 mb-10 h-20 flex flex-col justify-center text-center">
          {roastSteps.map((text, index) => (
            <div 
              key={index}
              className={`transition-all duration-500 flex items-center justify-center gap-3 ${
                index === step ? "opacity-100 scale-100 text-green-400" : "hidden"
              }`}
            >
              <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" />
              <span className="text-base md:text-lg font-medium font-mono lowercase leading-tight">{text}</span>
            </div>
          ))}
        </div>

        {/* Progress Bar Container */}
        <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden border border-zinc-800">
          <div 
            className="h-full bg-green-500 transition-all duration-500 ease-out shadow-[0_0_15px_rgba(34,197,94,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="mt-4 flex justify-between text-[9px] md:text-[10px] font-mono text-zinc-600 uppercase tracking-tighter">
          <span>Processing Data</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Ambient Glow - Adjusted for mobile performance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-full h-[300px] md:h-full bg-green-900/5 blur-[80px] md:blur-[120px] pointer-events-none" />
    </div>
  );
};

export default AnalyzingPage;