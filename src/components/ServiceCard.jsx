import React from 'react';
import { ArrowRight } from 'lucide-react';

const ServiceCard = ({ title, description, icon: Icon }) => {
    return (
        <div className="group relative p-8 bg-brand-gray/30 border border-white/5 rounded-2xl overflow-hidden hover:border-brand-gold/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/0 to-brand-gold/0 group-hover:from-brand-gold/5 group-hover:to-transparent transition-all duration-500"></div>

            <div className="relative z-10">
                <div className="w-14 h-14 bg-brand-black rounded-lg flex items-center justify-center mb-6 border border-white/10 group-hover:border-brand-gold group-hover:text-brand-gold text-white transition-all duration-300">
                    {Icon && <Icon size={28} />}
                </div>

                <h3 className="text-xl font-heading font-bold text-white mb-4 group-hover:text-brand-gold transition-colors">{title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed line-clamp-3 text-sm">
                    {description}
                </p>

                <span className="inline-flex items-center text-sm font-bold text-brand-white group-hover:text-brand-gold transition-colors">
                    Learn More <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </span>
            </div>
        </div>
    );
};

export default ServiceCard;
