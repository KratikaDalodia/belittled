import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AnalyzingPage = () => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const hasFetched = React.useRef(false);
  const roastSteps = [
    "Scanning emotional whiplash...",
    "Counting skipped tracks (coward)...",
    "Consulting the algorithm of shame...",
    "Analyzing your repetitive listening habits...",
    "Finding the exact moment you lost your taste...",
    "Preparing the final burn..."
  ];

  useEffect(() => {
    // 1. DATA FETCHING LOGIC
    if (hasFetched.current) return; 
    hasFetched.current = true;
    
    const fetchSpotifyData = async () => {
      const token = localStorage.getItem('spotify_access_token');
      if (!token) {
        console.error("No token found");
        navigate('/');
        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:8000/get-stats?token=${token}`);
        const data = await response.json();

        if (data.artists && data.tracks && data.roast) {
          // Save the results
          localStorage.setItem('user_top_artists', JSON.stringify(data.artists));
          localStorage.setItem('user_top_tracks', JSON.stringify(data.tracks));
          localStorage.setItem('ai_roast', data.roast);

          // SUCCESS: Finish progress and move to results
          setProgress(100);
          setTimeout(() => navigate('/result'), 800); 
        }
      } catch (err) {
        console.error("CORS or Network Error:", err);
        // Fallback so user isn't stuck forever
        setTimeout(() => navigate('/'), 3000); 
      }
    };

    fetchSpotifyData();

    // 2. Visual Progress Logic (Fake progress that slows down at 90%)
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 70) return prev + 1; // Fast at first
        if (prev < 90) return prev + 0.5; // Slow down while AI thinks
        return prev; // Stay at 90 until fetch completes
      });
    }, 100);

    // 3. Stepper Logic (Cycles through text)
    const stepInterval = setInterval(() => {
      setStep((prev) => (prev < roastSteps.length - 1 ? prev + 1 : prev));
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, [navigate]);

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col items-center justify-center overflow-hidden relative">
      {/* ... (Your existing JSX for Grid and Header) ... */}
      
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black tracking-tighter mb-2 italic uppercase">Analyzing Shame</h2>
          <p className="text-zinc-500 text-sm uppercase tracking-widest">Neural Network is Disappointed</p>
        </div>

        {/* Analysis Stepper */}
        <div className="space-y-4 mb-10 h-24 flex flex-col justify-center text-center">
          {roastSteps.map((text, index) => (
            <div 
              key={index}
              className={`transition-all duration-500 flex items-center justify-center gap-3 ${
                index === step ? "opacity-100 scale-100 text-green-400" : "hidden"
              }`}
            >
              <div className="w-2 h-2 bg-current rounded-full animate-pulse" />
              <span className="text-lg font-medium font-mono lowercase">{text}</span>
            </div>
          ))}
        </div>

        {/* Progress Bar Container */}
        <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden border border-zinc-800">
          <div 
            className="h-full bg-green-500 transition-all duration-500 ease-out shadow-[0_0_15px_rgba(34,197,94,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="mt-4 flex justify-between text-[10px] font-mono text-zinc-600 uppercase tracking-tighter">
          <span>Processing Data</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-green-900/5 blur-[120px] pointer-events-none" />
    </div>
  );
};

export default AnalyzingPage;