import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Send, MessageSquare, Clock, CheckCircle } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');
        // Simulate form submission
        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 1500);
    };

    const contactInfo = [
        { icon: Mail, label: 'Email', value: 'hello@example.com', href: 'mailto:hello@example.com' },
        { icon: Github, label: 'GitHub', value: 'github.com/username', href: 'https://github.com' },
        { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/username', href: 'https://linkedin.com' },
        { icon: MapPin, label: 'Location', value: 'Bangkok, Thailand', href: '#' }
    ];

    return (
        <div className="w-full pt-20">
            {/* Header */}
            <section className="bg-brand-black py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-gold/5 z-0"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-brand-white mb-6">Get In <span className="text-brand-gold">Touch</span></h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Have a project in mind or want to discuss collaboration?
                        I'd love to hear from you. Let's build something amazing together.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-brand-black">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Contact Form */}
                        <div className="bg-brand-gray/20 border border-white/5 rounded-2xl p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <MessageSquare size={28} className="text-brand-gold" />
                                <h2 className="text-2xl font-heading font-bold text-brand-white">Send a Message</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-2">Your Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full bg-brand-black border border-white/10 rounded px-4 py-3 text-white focus:border-brand-gold focus:outline-none transition-colors"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-brand-black border border-white/10 rounded px-4 py-3 text-white focus:border-brand-gold focus:outline-none transition-colors"
                                            placeholder="john@example.com"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full bg-brand-black border border-white/10 rounded px-4 py-3 text-white focus:border-brand-gold focus:outline-none transition-colors"
                                        placeholder="Project Inquiry"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="5"
                                        className="w-full bg-brand-black border border-white/10 rounded px-4 py-3 text-white focus:border-brand-gold focus:outline-none transition-colors resize-none"
                                        placeholder="Tell me about your project..."
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'sending' || status === 'success'}
                                    className={`w-full py-4 rounded font-bold text-lg transition-all flex items-center justify-center gap-2 ${status === 'success'
                                        ? 'bg-green-500 text-white'
                                        : 'bg-brand-gold text-brand-black hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                                        }`}
                                >
                                    {status === 'sending' ? (
                                        'Sending...'
                                    ) : status === 'success' ? (
                                        <>
                                            <CheckCircle size={20} /> Message Sent!
                                        </>
                                    ) : (
                                        <>
                                            Send Message <Send size={18} />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <div className="space-y-6 mb-8">
                                {contactInfo.map((info, index) => (
                                    <a
                                        key={index}
                                        href={info.href}
                                        target={info.href.startsWith('http') ? '_blank' : '_self'}
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 p-4 bg-brand-gray/20 border border-white/5 rounded-xl hover:border-brand-gold/30 transition-all group"
                                    >
                                        <div className="w-12 h-12 bg-brand-gold/10 rounded-lg flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors">
                                            <info.icon size={24} className="text-brand-gold" />
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-sm">{info.label}</p>
                                            <p className="text-white font-medium">{info.value}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>

                            <div className="bg-brand-gray/10 rounded-2xl p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <Clock size={24} className="text-brand-gold" />
                                    <h3 className="text-xl font-heading font-bold text-brand-white">Response Time</h3>
                                </div>
                                <p className="text-gray-400 mb-4">
                                    I typically respond to inquiries within 24-48 hours.
                                    For urgent matters, feel free to reach out via email.
                                </p>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                    Available for new projects
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
