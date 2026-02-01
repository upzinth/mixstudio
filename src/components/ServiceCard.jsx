import React from 'react';

const ServiceCard = ({ title, description, icon: Icon }) => {
    return (
        <div className="bg-brand-gray/20 border border-white/5 rounded-xl p-6 hover:border-brand-gold/30 transition-all group cursor-pointer">
            <div className="w-12 h-12 bg-brand-gold/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-gold/20 transition-colors">
                {Icon && <Icon size={24} className="text-brand-gold group-hover:scale-110 transition-transform" />}
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-gold transition-colors">
                {title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
                {description}
            </p>
        </div>
    );
};

export default ServiceCard;
