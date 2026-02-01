import React from 'react';

const AdBanner = ({ position, className = "" }) => {
    return (
        <div className={`w-full bg-brand-gray/10 border-y border-white/5 py-4 flex flex-col items-center justify-center overflow-hidden ${className}`}>
            <div className="text-xs text-brand-gold uppercase tracking-widest mb-2 opacity-50">Advertisement</div>
            <div className="bg-brand-black/50 border border-white/10 w-[728px] max-w-[90%] h-[90px] flex items-center justify-center text-gray-600 text-sm rounded">
                Google AdSense ({position})
            </div>
        </div>
    );
};

export default AdBanner;
