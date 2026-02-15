import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ConnectPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('Analyzing your questionable taste...');

useEffect(() => {
  const token = searchParams.get('token');

  if (token) {
    // 1. Save the token
    localStorage.setItem('spotify_access_token', token);
    
    // 2. Show a success state, then move to Analyze
    setStatus('Connection Successful!');
    setTimeout(() => {
      navigate('/analyze'); // This moves them to your animation page
    }, 2000);
  }
}, [searchParams, navigate]);

  // handleAuth is no longer needed here because the 
  // Python backend already handled the API exchange!

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col items-center justify-center overflow-hidden relative">
      {/* Matching Grid Background */}
      <div className="absolute inset-0 z-0 opacity-10" 
           style={{ backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`, 
           backgroundSize: '40px 40px' }}>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Loading Ring */}
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute inset-0 border-4 border-green-500/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-green-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 bg-green-500/10 blur-xl rounded-full animate-pulse"></div>
        </div>

        <h2 className="text-2xl font-bold tracking-tight animate-pulse">
          {status}
        </h2>
        <p className="text-zinc-500 mt-2 text-sm">Please don't close this window</p>
      </div>

      {/* Matching Bottom Glow */}
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-green-600/10 blur-[120px] rounded-full pointer-events-none"></div>
    </div>
  );
};

export default ConnectPage;