import React, { useEffect, useRef } from 'react';
import { Code, Database, Server, Cloud, Terminal, ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const ctaRef = useRef(null);
    const servicesRef = useRef(null);
    const portfolioRef = useRef(null);

    useEffect(() => {
        // Hero Animation
        const tl = gsap.timeline();

        tl.fromTo(titleRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        )
            .fromTo(subtitleRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
                "-=0.5"
            )
            .fromTo(ctaRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
                "-=0.5"
            );

        // Services Animation
        gsap.fromTo(servicesRef.current.children,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: servicesRef.current,
                    start: "top 80%",
                }
            }
        );
        // Portfolio Animation
        gsap.fromTo(portfolioRef.current.children,
            { opacity: 0, scale: 0.9 },
            {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: portfolioRef.current,
                    start: "top 80%",
                }
            }
        );

    }, []);

    const services = [
        {
            title: 'Backend Development',
            description: 'Building robust server-side applications with Python, Django, and Flask. RESTful APIs, authentication, and database integration.',
            icon: Server
        },
        {
            title: 'Data Engineering',
            description: 'Designing and implementing data pipelines, ETL processes, and data transformation solutions using modern tools.',
            icon: Database
        },
        {
            title: 'Automation & Scripts',
            description: 'Creating custom automation solutions, scripts, and tools to streamline workflows and improve productivity.',
            icon: Terminal
        },
        {
            title: 'Cloud Solutions',
            description: 'Deploying and managing applications on AWS, GCP, and Azure. Containerization with Docker and Kubernetes.',
            icon: Cloud
        },
        {
            title: 'API Development',
            description: 'Designing and developing RESTful and GraphQL APIs with proper documentation, testing, and best practices.',
            icon: Code
        }
    ];

    const stats = [
        { number: '50+', label: 'Projects Completed' },
        { number: '30+', label: 'Happy Clients' },
        { number: '5+', label: 'Years Experience' },
        { number: '99%', label: 'Client Satisfaction' }
    ];

    const featuredProjects = [
        {
            title: 'E-Commerce Platform',
            category: 'Web Development',
            image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2064&auto=format&fit=crop',
            tech: ['Django', 'PostgreSQL', 'React']
        },
        {
            title: 'Data Analytics Dashboard',
            category: 'Data Engineering',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
            tech: ['Python', 'Pandas', 'FastAPI']
        },
        {
            title: 'ML Prediction System',
            category: 'Machine Learning',
            image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2070&auto=format&fit=crop',
            tech: ['Python', 'TensorFlow', 'AWS']
        }
    ];

    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden" ref={heroRef}>
                <div className="absolute inset-0 bg-brand-black z-0">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=2064&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-black/80 to-black/60 z-10"></div>
                </div>

                <div className="relative z-20 container mx-auto px-6 text-center">
                    <div ref={titleRef}>
                        <h1 className="text-5xl md:text-7xl font-heading font-bold text-brand-white mb-6 leading-tight">
                            Python Software <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-200">Developer & Engineer</span>
                        </h1>
                    </div>
                    <p ref={subtitleRef} className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 font-light">
                        Building scalable backend systems, data pipelines, and automation solutions.
                        Passionate about clean code and efficient architecture.
                    </p>
                    <div ref={ctaRef} className="flex flex-col md:flex-row justify-center gap-4">
                        <a href="/portfolio" className="px-8 py-3 bg-brand-gold text-brand-black font-bold rounded-full hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all transform hover:-translate-y-1 inline-flex items-center justify-center">
                            View My Work
                        </a>
                        <a href="/contact" className="px-8 py-3 border border-brand-white text-brand-white font-bold rounded-full hover:bg-white hover:text-black transition-all inline-flex items-center justify-center">
                            Get In Touch
                        </a>
                    </div>
                    <div className="flex justify-center gap-6 mt-8">
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-gold transition-colors">
                            <Github size={24} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-gold transition-colors">
                            <Linkedin size={24} />
                        </a>
                        <a href="mailto:hello@example.com" className="text-gray-400 hover:text-brand-gold transition-colors">
                            <Mail size={24} />
                        </a>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 border-b border-white/5 bg-brand-gray/20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {stats.map((stat, index) => (
                            <div key={index}>
                                <div className="text-3xl md:text-4xl font-bold text-brand-gold mb-2">{stat.number}</div>
                                <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Preview Section */}
            <section className="py-20 bg-brand-black">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-brand-gold font-bold tracking-widest text-sm uppercase">What I Do</span>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-white mt-3">
                            Professional <span className="text-gray-500 font-light">Services</span>
                        </h2>
                    </div>

                    <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <ServiceCard key={index} {...service} />
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <a href="/services" className="text-brand-white underline underline-offset-4 decoration-brand-gold hover:text-brand-gold transition-colors inline-flex items-center">
                            View All Services <ArrowRight size={16} className="ml-2" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Portfolio Preview */}
            <section className="py-20 bg-brand-gray/10 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <span className="text-brand-gold font-bold tracking-widest text-sm uppercase">Featured Work</span>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-white mt-3">
                                Recent <span className="text-gray-500 font-light">Projects</span>
                            </h2>
                        </div>
                        <a href="/portfolio" className="hidden md:flex items-center text-brand-white hover:text-brand-gold transition-colors">
                            View All Projects <ArrowRight size={16} className="ml-2" />
                        </a>
                    </div>

                    <div ref={portfolioRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {featuredProjects.map((project, index) => (
                            <div key={index} className="group relative rounded-xl overflow-hidden cursor-pointer bg-brand-gray/20 border border-white/5 hover:border-brand-gold/30 transition-all">
                                <div className="aspect-video relative overflow-hidden">
                                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <span className="w-16 h-16 rounded-full bg-brand-gold text-brand-black flex items-center justify-center font-bold text-lg">
                                            View
                                        </span>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                                    <p className="text-brand-gold text-sm mb-2">{project.category}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((tech, i) => (
                                            <span key={i} className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Stack Section */}
            <section className="py-20 bg-brand-black">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-heading font-bold text-brand-white mb-12">Technologies I Work With</h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        {['Python', 'Django', 'Flask', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS', 'Git', 'Linux'].map((tech, index) => (
                            <div key={index} className="px-6 py-3 bg-brand-gray/20 border border-white/5 rounded-lg text-gray-300 hover:border-brand-gold/30 hover:text-brand-gold transition-all">
                                {tech}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-gold/10"></div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-white mb-8">Ready to Start Your Project?</h2>
                    <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
                        Whether you need a web application, data pipeline, or automation solution,
                        let's build something amazing together.
                    </p>
                    <a href="/contact" className="px-10 py-4 bg-brand-gold text-brand-black font-bold text-lg rounded-full hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all transform hover:-translate-y-1 inline-block">
                        Let's Talk
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Home;
