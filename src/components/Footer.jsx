import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Github, Linkedin, Mail, Twitter } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        quickLinks: [
            { path: '/', label: 'Home' },
            { path: '/about', label: 'About' },
            { path: '/services', label: 'Services' },
            { path: '/portfolio', label: 'Portfolio' },
            { path: '/contact', label: 'Contact' }
        ],
        services: [
            { path: '/services', label: 'Backend Development' },
            { path: '/services', label: 'Data Engineering' },
            { path: '/services', label: 'Automation' },
            { path: '/services', label: 'Cloud Solutions' },
            { path: '/services', label: 'API Development' }
        ]
    };

    return (
        <footer className="bg-brand-black border-t border-white/5 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-brand-gold rounded-lg flex items-center justify-center">
                                <Code size={24} className="text-brand-black" />
                            </div>
                            <span className="text-xl font-heading font-bold text-brand-white">
                                Python<span className="text-brand-gold">Dev</span>
                            </span>
                        </Link>
                        <p className="text-gray-400 text-sm mb-6">
                            Passionate Python developer creating scalable solutions,
                            from backend systems to data pipelines.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:bg-brand-gold hover:text-brand-black transition-all">
                                <Github size={18} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:bg-brand-gold hover:text-brand-black transition-all">
                                <Linkedin size={18} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:bg-brand-gold hover:text-brand-black transition-all">
                                <Twitter size={18} />
                            </a>
                            <a href="mailto:hello@example.com" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:bg-brand-gold hover:text-brand-black transition-all">
                                <Mail size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold text-brand-white mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            {footerLinks.quickLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-400 hover:text-brand-gold transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-bold text-brand-white mb-6">Services</h3>
                        <ul className="space-y-3">
                            {footerLinks.services.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-400 hover:text-brand-gold transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold text-brand-white mb-6">Get in Touch</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li className="flex items-center gap-2">
                                <Mail size={16} className="text-brand-gold" />
                                <a href="mailto:hello@example.com" className="hover:text-brand-gold transition-colors">
                                    hello@example.com
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-brand-gold">📍</span>
                                <span>Bangkok, Thailand</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © {currentYear} PythonDev. All rights reserved.
                    </p>
                    <p className="text-gray-500 text-sm">
                        Built with <span className="text-brand-gold">Python</span> & <span className="text-brand-gold">React</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
