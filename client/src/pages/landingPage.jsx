import React from 'react';

const LandingPage = () => {
  return (
    // Changed h-screen to min-h-screen to prevent content cutoff on small devices
    <div className="min-h-screen w-full bg-black text-white font-sans overflow-x-hidden relative selection:bg-green-500/30">
      
      {/* Grid Background Overlay */}
      <div className="absolute inset-0 z-0 opacity-20" 
           style={{ backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`, 
           backgroundSize: '40px 40px' }}>
      </div>

      {/* Navbar - Responsive padding (px-4 for mobile, px-8 for desktop) */}
      <nav className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-4 md:px-8 py-6 max-w-7xl mx-auto">
        <div className="text-xl font-bold tracking-tighter">BeLittled</div>
        <button className="cursor-pointer px-4 py-1.5 border border-zinc-700 rounded-md text-sm hover:bg-zinc-800 transition-colors">
          Reset
        </button>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center text-center px-6 py-20">
        
        {/* Badge */}
        <div className="mb-6 px-3 py-1 border border-zinc-800 rounded-full text-[10px] md:text-xs text-zinc-500 bg-zinc-900/50 backdrop-blur-sm">
           ✨ At your own consent →
        </div>

        {/* Title - Responsive sizing (5xl for mobile, 9xl for desktop) */}
        <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter mb-4 leading-[0.9]">
          BeLittled
        </h1>
        
        {/* Description - Adjusted max-width and text size */}
        <p className="text-zinc-500 text-base md:text-xl max-w-[280px] md:max-w-md mb-10 leading-relaxed">
          Get judged on your Spotify listening habits. Connect your account, and remember it's all in good fun... or is it?
        </p>

        {/* Spotify Button - Responsive width/padding */}
        <a 
          href="http://127.0.0.1:8000/login" 
          className="w-full max-w-[280px] sm:w-auto flex items-center justify-center gap-3 bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold py-4 px-8 md:px-10 rounded-full transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-green-500/40 no-underline"
        >
          <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm5.508 17.302c-.216.354-.664.469-1.018.253-2.822-1.723-6.374-2.112-10.557-1.158-.403.092-.81-.158-.902-.561-.092-.403.158-.81.561-.902 4.582-1.048 8.492-.596 11.663 1.342.353.216.468.663.253 1.026zm1.472-3.256c-.272.443-.847.583-1.29.311-3.23-1.985-8.155-2.56-11.974-1.402-.5.152-1.028-.133-1.18-.632-.152-.5.133-1.027.632-1.18 4.368-1.324 9.79-.675 13.5 1.605.443.272.583.847.312 1.29zm.136-3.374C15.248 8.358 8.847 8.145 5.11 9.28c-.574.174-1.18-.153-1.354-.727-.174-.574.153-1.18.727-1.354 4.288-1.302 11.355-1.056 15.82 1.595.516.307.684.972.378 1.488-.307.516-.973.684-1.489.378z"/>
          </svg>
          <span className="whitespace-nowrap">Connect to Spotify</span>
        </a>

        {/* Ambient Glow - Scaled down for mobile */}
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[400px] bg-blue-600/20 blur-[80px] md:blur-[140px] rounded-[100%] pointer-events-none"></div>
        <div className="absolute bottom-[-5%] left-1/4 -translate-x-1/2 w-[200px] md:w-[500px] h-[200px] md:h-[300px] bg-purple-600/10 blur-[60px] md:blur-[120px] rounded-[100%] pointer-events-none"></div>
      </main>
    </div>
  );
};

export default LandingPage;