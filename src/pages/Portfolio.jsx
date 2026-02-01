import React, { useState } from 'react';
import { Github, ExternalLink, Code } from 'lucide-react';

const Portfolio = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', 'Web Development', 'Data Engineering', 'Automation', 'Machine Learning'];

    // Mock Projects Data
    const projects = [
        {
            id: 1,
            title: 'E-Commerce Platform',
            description: 'Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.',
            category: 'Web Development',
            image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2064&auto=format&fit=crop',
            tech: ['Django', 'PostgreSQL', 'React', 'Stripe'],
            github: 'https://github.com',
            demo: 'https://demo.example.com'
        },
        {
            id: 2,
            title: 'Real-time Analytics Dashboard',
            description: 'Data visualization dashboard with real-time updates, custom reports, and export functionality.',
            category: 'Data Engineering',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
            tech: ['Python', 'FastAPI', 'Pandas', 'Redis'],
            github: 'https://github.com',
            demo: 'https://demo.example.com'
        },
        {
            id: 3,
            title: 'Task Automation Suite',
            description: 'Comprehensive automation tool for business workflows, including report generation and data sync.',
            category: 'Automation',
            image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2070&auto=format&fit=crop',
            tech: ['Python', 'Selenium', 'Docker', 'AWS Lambda'],
            github: 'https://github.com',
            demo: 'https://demo.example.com'
        },
        {
            id: 4,
            title: 'ML Price Prediction Model',
            description: 'Machine learning model for price prediction using historical data and feature engineering.',
            category: 'Machine Learning',
            image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=2070&auto=format&fit=crop',
            tech: ['Python', 'TensorFlow', 'Scikit-learn', 'Flask'],
            github: 'https://github.com',
            demo: 'https://demo.example.com'
        },
        {
            id: 5,
            title: 'REST API Framework',
            description: 'Custom REST API framework with authentication, rate limiting, and comprehensive documentation.',
            category: 'Web Development',
            image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
            tech: ['Python', 'FastAPI', 'PostgreSQL', 'Docker'],
            github: 'https://github.com',
            demo: 'https://demo.example.com'
        },
        {
            id: 6,
            title: 'Data Pipeline ETL',
            description: 'Scalable ETL pipeline for data warehousing with monitoring and error handling.',
            category: 'Data Engineering',
            image: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=2071&auto=format&fit=crop',
            tech: ['Python', 'Apache Airflow', 'AWS Glue', 'Snowflake'],
            github: 'https://github.com',
            demo: 'https://demo.example.com'
        },
    ];

    const filteredProjects = activeCategory === 'All'
        ? projects
        : projects.filter(project => project.category === activeCategory);

    return (
        <div className="w-full pt-20">
            {/* Header */}
            <section className="bg-brand-black py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-gold/5 z-0"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-brand-white mb-6">My <span className="text-brand-gold">Portfolio</span></h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        A collection of projects showcasing my expertise in Python development,
                        data engineering, and automation solutions.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mt-12">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${activeCategory === cat
                                    ? 'bg-brand-gold text-brand-black'
                                    : 'bg-transparent border border-white/20 text-white hover:border-brand-gold hover:text-brand-gold'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="pb-20 bg-brand-black min-h-screen">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project) => (
                            <div key={project.id} className="group bg-brand-gray rounded-xl overflow-hidden shadow-lg border border-white/5 hover:border-brand-gold/30 transition-all">
                                <div className="aspect-video relative overflow-hidden">
                                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center text-brand-black hover:scale-110 transition-transform">
                                            <Github size={20} />
                                        </a>
                                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center text-brand-black hover:scale-110 transition-transform">
                                            <ExternalLink size={20} />
                                        </a>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="text-xs font-bold text-brand-gold uppercase mb-2">{project.category}</div>
                                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                                    <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tech.map((tech, index) => (
                                            <span key={index} className="px-2 py-1 bg-white/5 rounded text-xs text-gray-300 flex items-center gap-1">
                                                <Code size={10} /> {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Portfolio;
