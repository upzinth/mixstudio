import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Code } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/services', label: 'Services' },
        { path: '/portfolio', label: 'Portfolio' },
        { path: '/contact', label: 'Contact' }
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-brand-black/95 backdrop-blur-sm py-4 shadow-lg' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-brand-gold rounded-lg flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all">
                            <Code size={24} className="text-brand-black" />
                        </div>
                        <span className="text-xl font-heading font-bold text-brand-white">
                            Python<span className="text-brand-gold">Dev</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-sm font-bold uppercase tracking-wider transition-all relative ${isActive(link.path)
                                    ? 'text-brand-gold'
                                    : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {link.label}
                                {isActive(link.path) && (
                                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-brand-gold"></span>
                                )}
                            </Link>
                        ))}
                        <Link
                            to="/contact"
                            className="px-6 py-2 bg-brand-gold text-brand-black font-bold rounded-full hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all text-sm"
                        >
                            Hire Me
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-white hover:text-brand-gold transition-colors"
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                    <div className="flex flex-col gap-4 pb-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-lg font-medium transition-colors ${isActive(link.path)
                                    ? 'text-brand-gold'
                                    : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            to="/contact"
                            className="inline-block px-6 py-3 bg-brand-gold text-brand-black font-bold rounded-full text-center mt-2"
                        >
                            Hire Me
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
