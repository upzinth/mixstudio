import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Preloader = ({ onComplete }) => {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const progressRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                if (onComplete) onComplete();
            }
        });

        tl.to(progressRef.current, {
            scaleX: 1,
            duration: 1.5,
            ease: "power2.inOut"
        })
            .to(textRef.current, {
                opacity: 0,
                y: -20,
                duration: 0.5,
                ease: "power2.in"
            })
            .to(containerRef.current, {
                y: "-100%",
                duration: 0.8,
                ease: "expo.inOut"
            });

    }, [onComplete]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-[100] bg-brand-black flex flex-col items-center justify-center">
            <div ref={textRef} className="text-center">
                <h1 className="text-4xl md:text-6xl font-heading font-bold text-brand-white mb-4">
                    Mix<span className="text-brand-gold">Studio</span>
                </h1>
                <p className="text-brand-gold tracking-widest text-sm uppercase">Loading Experience</p>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-gray/20">
                <div ref={progressRef} className="h-full bg-brand-gold origin-left scale-x-0 w-full"></div>
            </div>
        </div>
    );
};

export default Preloader;
