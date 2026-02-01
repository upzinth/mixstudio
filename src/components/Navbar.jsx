import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

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

    const navLinks = [
        { name: 'หน้าหลัก', path: '/' },
        { name: 'บริการของเรา', path: '/services' },
        { name: 'ผลงาน', path: '/portfolio' },
        { name: 'เกี่ยวกับเรา', path: '/about' },
        { name: 'บทความ', path: '/blog' },
        { name: 'ติดต่อเรา', path: '/contact' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-brand-black/90 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link to="/" className="text-2xl font-heading font-bold text-brand-white">
                    Mix<span className="text-brand-gold">Studio</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:text-brand-gold ${location.pathname === link.path ? 'text-brand-gold' : 'text-brand-white'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link to="/client-area" className="px-6 py-2 bg-gradient-to-r from-brand-gold to-yellow-600 text-brand-black font-bold rounded-full hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all transform hover:scale-105">
                        ระบบสมาชิก
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-brand-white focus:outline-none">
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-brand-black/95 backdrop-blur-xl border-t border-brand-gray/30 p-6 flex flex-col space-y-4 shadow-2xl">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className={`text-lg font-medium block ${location.pathname === link.path ? 'text-brand-gold' : 'text-brand-white'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link to="/client-area" onClick={() => setIsOpen(false)} className="w-full text-center px-6 py-3 bg-brand-gold text-brand-black font-bold rounded mt-4 block">
                        Client Area
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
