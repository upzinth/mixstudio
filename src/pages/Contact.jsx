import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    const [formStatus, setFormStatus] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus('sending');
        setTimeout(() => {
            setFormStatus('sent');
            e.target.reset();
        }, 1500);
    };

    return (
        <div className="w-full pt-20">
            <section className="bg-brand-black py-20 relative">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <div>
                            <h1 className="text-4xl md:text-6xl font-heading font-bold text-brand-white mb-6">Get in <span className="text-brand-gold">Touch</span></h1>
                            <p className="text-gray-400 text-lg mb-12">
                                Ready to start your project? Have a question? We'd love to hear from you.
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-brand-gray/50 rounded-lg flex items-center justify-center text-brand-gold border border-brand-gold/20 flex-shrink-0">
                                        <MapPin size={24} />
                                    </div>
                                    <div className="ml-6">
                                        <h3 className="text-xl font-bold text-white mb-2">Visit Us</h3>
                                        <p className="text-gray-400 leading-relaxed">
                                            123 Music Lane, Creative District,<br />
                                            Bangkok, Thailand 10110
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-brand-gray/50 rounded-lg flex items-center justify-center text-brand-gold border border-brand-gold/20 flex-shrink-0">
                                        <Phone size={24} />
                                    </div>
                                    <div className="ml-6">
                                        <h3 className="text-xl font-bold text-white mb-2">Call Us</h3>
                                        <p className="text-gray-400">
                                            +66 89 123 4567<br />
                                            <span className="text-sm text-gray-500">Mon-Fri, 9am - 6pm</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-brand-gray/50 rounded-lg flex items-center justify-center text-brand-gold border border-brand-gold/20 flex-shrink-0">
                                        <Mail size={24} />
                                    </div>
                                    <div className="ml-6">
                                        <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
                                        <p className="text-gray-400">
                                            contact@mixstudio.com<br />
                                            bookings@mixstudio.com
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-brand-gray/20 p-8 md:p-10 rounded-3xl border border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-6">Send us a message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Name</label>
                                        <input type="text" required className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors" placeholder="John Doe" />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Email</label>
                                        <input type="email" required className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors" placeholder="john@example.com" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Service Interested In</label>
                                    <select className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors">
                                        <option>General Inquiry</option>
                                        <option>Music Production</option>
                                        <option>Mixing & Mastering</option>
                                        <option>Vocal Tuning</option>
                                        <option>Soundtrack/Foley</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Message</label>
                                    <textarea rows="4" required className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors" placeholder="Tell us about your project..."></textarea>
                                </div>

                                <button type="submit" disabled={formStatus === 'sending' || formStatus === 'sent'} className={`w-full py-4 rounded-lg font-bold flex items-center justify-center transition-all ${formStatus === 'sent'
                                        ? 'bg-green-600 text-white'
                                        : 'bg-brand-gold text-brand-black hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                                    }`}>
                                    {formStatus === 'sending' ? (
                                        'Sending...'
                                    ) : formStatus === 'sent' ? (
                                        'Message Sent!'
                                    ) : (
                                        <>Send Message <Send size={18} className="ml-2" /></>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map (Placeholder) */}
            <section className="h-96 w-full bg-gray-800 relative grayscale hover:grayscale-0 transition-all duration-700">
                <div className="w-full h-full flex items-center justify-center bg-brand-gray/80">
                    <span className="text-gray-400">Map Embed Placeholder</span>
                </div>
            </section>
        </div>
    );
};

export default Contact;
