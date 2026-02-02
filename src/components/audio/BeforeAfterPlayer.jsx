import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const BeforeAfterPlayer = ({ beforeSrc, afterSrc, title, artist }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [mode, setMode] = useState('after'); // 'before' or 'after'

    const beforeRef = useRef(null);
    const afterRef = useRef(null);
    const progressRef = useRef(null);

    // Sync playback
    useEffect(() => {
        if (!beforeRef.current || !afterRef.current) return;

        const sync = () => {
            if (activeRef.current.paused !== isPlaying) {
                if (isPlaying) activeRef.current.play();
                else activeRef.current.pause();
            }
        };

        // This is a simplified sync. For production, requestAnimationFrame is smoother.
        // We fundamentally only play one at a time to save bandwidth/resources,
        // OR we play both and mute one. Here we play both and mute one for instant switch.

        beforeRef.current.volume = isMuted ? 0 : (mode === 'before' ? 1 : 0);
        afterRef.current.volume = isMuted ? 0 : (mode === 'after' ? 1 : 0);

        if (isPlaying) {
            beforeRef.current.play().catch(() => { });
            afterRef.current.play().catch(() => { });
        } else {
            beforeRef.current.pause();
            afterRef.current.pause();
        }

    }, [isPlaying, mode, isMuted]);

    // Keep times synced manually when scrubbing
    const handleTimeUpdate = (e) => {
        const time = e.target.currentTime;
        if (Math.abs(beforeRef.current.currentTime - time) > 0.1) beforeRef.current.currentTime = time;
        if (Math.abs(afterRef.current.currentTime - time) > 0.1) afterRef.current.currentTime = time;

        // Update progress bar
        if (progressRef.current) {
            const percent = (time / e.target.duration) * 100;
            progressRef.current.style.width = `${percent}%`;
        }
    };

    const togglePlay = () => setIsPlaying(!isPlaying);

    return (
        <div className="bg-brand-gray/30 border border-white/10 rounded-xl p-6 hover:border-brand-gold/30 transition-colors">
            <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
            <p className="text-gray-400 text-sm mb-4">{artist}</p>

            <div className="flex bg-black/50 rounded-lg p-1 mb-4 relative overflow-hidden">
                <button
                    onClick={() => setMode('before')}
                    className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${mode === 'before' ? 'bg-red-500/80 text-white' : 'text-gray-500 hover:text-white'}`}
                >
                    Before (Mix)
                </button>
                <button
                    onClick={() => setMode('after')}
                    className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${mode === 'after' ? 'bg-brand-gold text-black' : 'text-gray-500 hover:text-white'}`}
                >
                    After (Master)
                </button>
            </div>

            {/* Hidden Audio Elements */}
            <audio ref={beforeRef} src={beforeSrc} loop preload="metadata" />
            <audio
                ref={afterRef}
                src={afterSrc}
                loop
                preload="metadata"
                onTimeUpdate={handleTimeUpdate}
            />

            {/* Controls */}
            <div className="flex items-center gap-4">
                <button
                    onClick={togglePlay}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-black hover:scale-105 transition-transform"
                >
                    {isPlaying ? <Pause fill="currentColor" /> : <Play fill="currentColor" className="ml-1" />}
                </button>

                <div className="flex-1 h-2 bg-white/10 rounded-full cursor-pointer relative">
                    <div ref={progressRef} className="absolute left-0 top-0 bottom-0 bg-brand-gold rounded-full w-0 transition-all duration-100"></div>
                </div>

                <button onClick={() => setIsMuted(!isMuted)} className="text-gray-400 hover:text-white">
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
            </div>
        </div>
    );
};

export default BeforeAfterPlayer;
