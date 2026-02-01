import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-brand-gray text-brand-white pt-16 pb-8 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link to="/" className="text-3xl font-heading font-bold text-brand-white mb-6 block">
                            Mix<span className="text-brand-gold">Studio</span>
                        </Link>
                        <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                            Elevating your sound to professional standards. Premium music production, mixing, and mastering services for artists who demand the best.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-brand-gold transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-brand-gold transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-brand-gold transition-colors"><Youtube size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-heading font-bold text-brand-gold mb-6">Quick Links</h4>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
                            <li><Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
                            <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-heading font-bold text-brand-gold mb-6">Services</h4>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li><Link to="/services" className="hover:text-white transition-colors">Music Production</Link></li>
                            <li><Link to="/services" className="hover:text-white transition-colors">Mixing & Mastering</Link></li>
                            <li><Link to="/services" className="hover:text-white transition-colors">Vocal Tuning/Key Change</Link></li>
                            <li><Link to="/services" className="hover:text-white transition-colors">Soundtrack & Foley</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-heading font-bold text-brand-gold mb-6">Contact Us</h4>
                        <div className="space-y-4 text-gray-400 text-sm">
                            <div className="flex items-start">
                                <MapPin size={18} className="mr-3 text-brand-gold mt-1" />
                                <span>123 Music Lane, Creative District,<br />Bangkok, Thailand 10110</span>
                            </div>
                            <div className="flex items-center">
                                <Phone size={18} className="mr-3 text-brand-gold" />
                                <span>+66 89 123 4567</span>
                            </div>
                            <div className="flex items-center">
                                <Mail size={18} className="mr-3 text-brand-gold" />
                                <span>contact@mixstudio.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 text-center text-gray-500 text-xs">
                    <p>&copy; {new Date().getFullYear()} MixStudio. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
