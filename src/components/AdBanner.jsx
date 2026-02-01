import React from 'react';

const AdBanner = ({ slotId, format = "auto", responsive = true, style = {} }) => {
    return (
        <div className="w-full my-8 flex justify-center">
            {/* Container for AdSense */}
            <div
                className="w-full max-w-4xl bg-brand-gray/10 border border-white/5 rounded-lg overflow-hidden flex items-center justify-center relative"
                style={{ minHeight: '100px', ...style }}
            >
                <span className="text-xs text-gray-500 absolute top-1 right-2">Advertisement</span>
                {/* Placeholder for Development - Remove in Production */}
                <div className="text-gray-600 text-sm p-4 text-center">
                    <p>พื้นที่โฆษณา Google AdSense</p>
                    <p className="text-xs mt-1 opacity-50">Slot ID: {slotId || 'N/A'}</p>
                </div>

                {/* Actual AdSense Script - Uncomment in Production */}
                {/* 
        <ins className="adsbygoogle"
             style={{ display: 'block', ...style }}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" 
             data-ad-slot={slotId}
             data-ad-format={format}
             data-full-width-responsive={responsive ? "true" : "false"}></ins>
        <script>
             (adsbygoogle = window.adsbygoogle || []).push({});
        </script> 
        */}
            </div>
        </div>
    );
};

export default AdBanner;
