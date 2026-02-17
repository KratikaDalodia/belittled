import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ResultPage = () => {
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roast, setRoast] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedArtists = localStorage.getItem('user_top_artists');
    const savedTracks = localStorage.getItem('user_top_tracks');
    const savedRoast = localStorage.getItem('ai_roast');
    
    if (savedRoast) setRoast(savedRoast);
    if (savedArtists && savedTracks) {
      try {
        setArtists(JSON.parse(savedArtists).slice(0, 5)); 
        setTracks(JSON.parse(savedTracks).slice(0, 5));
      } catch (err) {
        console.error("Failed to parse stored data:", err);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center">
        <div className="text-green-500 font-mono text-lg md:text-xl animate-pulse uppercase tracking-widest px-6 text-center">
          Finalizing the Roast...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 font-mono relative overflow-x-hidden">
      {/* Background Grid - Scaled down for mobile */}
      <div className="absolute inset-0 z-0 opacity-10" 
           style={{ backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`, 
           backgroundSize: '30px 30px' }}>
      </div>

      {/* Main Container - Reduced max-width for better roast text flow */}
      <div className="relative z-10 max-w-xl mx-auto border border-green-500/30 p-5 md:p-8 bg-zinc-900/50 backdrop-blur-md shadow-2xl">
        <header className="mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-2 text-green-500 italic uppercase tracking-tighter">Your Verdict</h1>
          <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
            <p className="text-zinc-500 text-[9px] md:text-xs uppercase tracking-widest">Official Shame Report</p>
            <p className="text-zinc-500 text-[9px] md:text-xs font-mono hidden sm:block">ID: {Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
          </div>
        </header>

        {/* Artists Section */}
        <section className="mb-10">
          <h2 className="text-[10px] md:text-xs font-black mb-6 text-zinc-500 uppercase tracking-[0.2em] border-l-4 border-green-500 pl-3">
            Top Offenders (Artists)
          </h2>
          <div className="space-y-4">
            {artists.map((artist, i) => (
              <div key={artist.id} className="flex justify-between items-center group border-b border-zinc-800/50 pb-2">
                <span className="text-green-500 font-bold text-xs w-6">0{i + 1}</span>
                <span className="flex-1 text-sm md:text-base group-hover:text-green-400 transition-colors uppercase font-bold tracking-tight truncate mr-2">
                  {artist.name}
                </span>
                <span className="text-[8px] md:text-[10px] text-zinc-600 bg-zinc-800 px-2 py-1 rounded whitespace-nowrap">
                  {artist.genres?.[0] || 'Unknown'}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Tracks Section */}
        <section className="mb-10">
          <h2 className="text-[10px] md:text-xs font-black mb-6 text-zinc-500 uppercase tracking-[0.2em] border-l-4 border-red-900 pl-3">
            Repetitive Garbage (Tracks)
          </h2>
          <div className="space-y-4">
            {tracks.map((track, i) => (
              <div key={track.id} className="flex justify-between items-center group border-b border-zinc-800/50 pb-2">
                <span className="text-zinc-600 text-xs w-6">0{i + 1}</span>
                <div className="flex-1 truncate">
                  <p className="text-sm md:text-base group-hover:text-green-400 transition-colors leading-none mb-1 truncate">
                    {track.name}
                  </p>
                  <p className="text-[9px] md:text-[10px] text-zinc-600 uppercase truncate">
                    {track.artists?.[0]?.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* THE ROAST BOX - Fixed "Stretched" Look */}
        <div className="relative mt-12 group">
          <div className="absolute inset-0 bg-green-500 blur-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>

          <div className="absolute -top-3 left-4 z-20 bg-black border border-green-500 px-2 py-0.5">
            <p className="text-[8px] font-bold text-green-500 uppercase tracking-[0.2em]">
              Critical Failure
            </p>
          </div>

          {/* Adjusted padding and max-width for better text wrapping */}
          <div className="relative bg-green-500 text-black p-6 md:p-8 transform -rotate-1 shadow-[8px_8px_0px_#000] border-2 border-black">
            <div className="relative z-10">
              {/* Added leading-tight and max-w-prose to prevent long horizontal stretches */}
              <p className="font-black text-xl md:text-2xl uppercase leading-[1.2] tracking-tight max-w-prose">
                {roast || "Generating pure concentrated venom..."}
              </p>
              
              <div className="mt-8 pt-4 border-t border-black/20 flex justify-between items-end">
                <div className="pr-4">
                  <p className="text-[8px] font-bold uppercase opacity-60">Verdict rendered by</p>
                  <p className="text-[10px] font-black uppercase">BeLittled AI Engine</p>
                </div>
                <div className="flex gap-0.5 h-5 items-end opacity-40 flex-shrink-0">
                  <div className="w-1 h-full bg-black"></div>
                  <div className="w-0.5 h-3 bg-black"></div>
                  <div className="w-1.5 h-full bg-black"></div>
                  <div className="w-0.5 h-4 bg-black"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={() => navigate('/')}
          className="mt-12 py-4 border border-zinc-800 hover:border-green-500/50 text-[10px] text-zinc-500 hover:text-green-500 uppercase tracking-widest transition-all w-full text-center bg-zinc-900/30"
        >
          ← Run away in shame
        </button>
      </div>
      
      {/* Bottom Glow - Scaled for mobile */}
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[150px] md:h-[300px] bg-green-600/5 blur-[80px] md:blur-[120px] rounded-full pointer-events-none"></div>
    </div>
  );
};

export default ResultPage;