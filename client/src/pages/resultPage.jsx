import React, { useState, useEffect } from 'react';

const ResultPage = () => {
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roast, setRoast] = useState("");
  useEffect(() => {
    // 1. Pull the data we saved during the Analyze phase
    const savedArtists = localStorage.getItem('user_top_artists');
    const savedTracks = localStorage.getItem('user_top_tracks');
    const savedRoast = localStorage.getItem('ai_roast');
    if (savedRoast) setRoast(savedRoast);
    if (savedArtists && savedTracks) {
      try {
        const parsedArtists = JSON.parse(savedArtists);
        const parsedTracks = JSON.parse(savedTracks);

        // Just take the top 5 for the display
        setArtists(parsedArtists.slice(0, 5)); 
        setTracks(parsedTracks.slice(0, 5));
      } catch (err) {
        console.error("Failed to parse stored data:", err);
      }
    }
    
    // 2. Stop the loading spinner
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center">
        <div className="text-green-500 font-mono text-xl animate-pulse uppercase tracking-widest">
          Finalizing the Roast...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 font-mono relative overflow-hidden">
      {/* Background Grid - Matching your Analyze Page */}
      <div className="absolute inset-0 z-0 opacity-10" 
           style={{ backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`, 
           backgroundSize: '40px 40px' }}>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto border border-green-500/30 p-6 bg-zinc-900/50 backdrop-blur-md shadow-2xl">
        <header className="mb-12">
          <h1 className="text-5xl font-black mb-2 text-green-500 italic uppercase tracking-tighter">Your Verdict</h1>
          <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
            <p className="text-zinc-500 text-xs uppercase tracking-widest">Official Shame Report</p>
            <p className="text-zinc-500 text-xs font-mono">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
          </div>
        </header>

        {/* The Artists Section */}
        <section className="mb-10">
          <h2 className="text-sm font-black mb-6 text-zinc-500 uppercase tracking-[0.3em] border-l-4 border-green-500 pl-3">
            Top Offenders (Artists)
          </h2>
          <div className="space-y-4">
            {artists.length > 0 ? artists.map((artist, i) => (
              <div key={artist.id} className="flex justify-between items-center group border-b border-zinc-800/50 pb-2">
                <span className="text-green-500 font-bold w-8">0{i + 1}</span>
                <span className="flex-1 group-hover:text-green-400 transition-colors uppercase font-bold tracking-tight">
                  {artist.name}
                </span>
                {/* Optional Chaining to prevent crash */}
                <span className="text-[10px] text-zinc-600 bg-zinc-800 px-2 py-1 rounded">
                  {artist.genres?.[0] || 'Unknown Genre'}
                </span>
              </div>
            )) : <p className="text-zinc-700 italic">No evidence found...</p>}
          </div>
        </section>

        {/* The Tracks Section */}
        <section className="mb-14">
          <h2 className="text-sm font-black mb-6 text-zinc-500 uppercase tracking-[0.3em] border-l-4 border-red-900 pl-3">
            Repetitive Garbage (Tracks)
          </h2>
          <div className="space-y-4">
            {tracks.length > 0 ? tracks.map((track, i) => (
              <div key={track.id} className="flex justify-between items-center group border-b border-zinc-800/50 pb-2">
                <span className="text-zinc-600 w-8">0{i + 1}</span>
                <div className="flex-1">
                  <p className="group-hover:text-green-400 transition-colors leading-none mb-1">
                    {track.name}
                  </p>
                  <p className="text-[10px] text-zinc-600 uppercase">
                    {track.artists?.[0]?.name || 'Unknown Artist'}
                  </p>
                </div>
              </div>
            )) : <p className="text-zinc-700 italic">Your ears are clean. For now.</p>}
          </div>
        </section>

        {/* THE ROAST BOX */}
        <div className="relative mt-8 group">
          {/* The "Glow" behind the box */}
          <div className="absolute inset-0 bg-green-500 blur-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>

          {/* Top Decoration - "Caution" Tape feel */}
          <div className="absolute -top-3 left-4 z-20 bg-black border border-green-500 px-2 py-0.5">
            <p className="text-[8px] font-bold text-green-500 uppercase tracking-[0.2em] animate-pulse">
              Critical Failure
            </p>
          </div>

          {/* Main Roast Container */}
          <div className="relative bg-green-500 text-black p-8 transform -rotate-1 shadow-[12px_12px_0px_#000,13px_13px_0px_#22c55e] border-2 border-black overflow-hidden">
            
            {/* Subtle Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>

            {/* The Text */}
            <div className="relative z-10">
              <span className="text-4xl absolute -top-4 -left-4 opacity-20 font-serif">“</span>
              <p className="font-black text-xl md:text-2xl uppercase leading-[1.1] tracking-tight animate-flicker">
                {roast || "Generating pure concentrated venom..."}
              </p>
              <div className="mt-6 pt-4 border-t border-black/20 flex justify-between items-end">
                <div>
                  <p className="text-[9px] font-bold uppercase opacity-60">Verdict rendered by</p>
                  <p className="text-[11px] font-black uppercase">BeLittled AI Engine v2.0</p>
                </div>
                {/* Decorative Barcode */}
                <div className="flex gap-0.5 h-6 items-end opacity-40">
                  <div className="w-1 h-full bg-black"></div>
                  <div className="w-0.5 h-4 bg-black"></div>
                  <div className="w-1.5 h-full bg-black"></div>
                  <div className="w-0.5 h-5 bg-black"></div>
                  <div className="w-1 h-3 bg-black"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={() => window.location.href = '/'}
          className="mt-12 text-[10px] text-zinc-500 hover:text-white uppercase tracking-widest transition-colors w-full text-center"
        >
          ← Run away in shame
        </button>
      </div>
      
      {/* Bottom Glow */}
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-green-600/5 blur-[120px] rounded-full pointer-events-none"></div>
    </div>
  );
};

export default ResultPage;