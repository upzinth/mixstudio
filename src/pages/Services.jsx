import React from 'react';
import { Check, Server, Database, Terminal, Cloud, Code, Clock, ArrowRight } from 'lucide-react';

const Services = () => {
    const services = [
        {
            title: "Backend Development",
            description: "Building robust, scalable server-side applications using Python frameworks like Django, Flask, and FastAPI. RESTful API design, authentication systems, and microservices architecture.",
            price: "Starting at $2,000 / project",
            features: [
                "Django & Django REST Framework",
                "Flask & FastAPI development",
                "RESTful & GraphQL API design",
                "Authentication & Authorization",
                "Microservices architecture",
                "Performance optimization"
            ],
            turnaround: "2-6 weeks",
            icon: Server
        },
        {
            title: "Data Engineering",
            description: "Designing and implementing data pipelines, ETL processes, and data warehousing solutions. Turning raw data into actionable insights.",
            price: "Starting at $3,000 / project",
            features: [
                "ETL pipeline development",
                "Data warehouse design",
                "Real-time data processing",
                "Data quality & validation",
                "Apache Airflow workflows",
                "Big data solutions"
            ],
            turnaround: "4-8 weeks",
            icon: Database
        },
        {
            title: "Automation & Scripts",
            description: "Creating custom automation solutions to streamline your workflows, reduce manual tasks, and improve operational efficiency.",
            price: "Starting at $500 / project",
            features: [
                "Business process automation",
                "Web scraping & data extraction",
                "Report generation scripts",
                "File processing & conversion",
                "API integrations",
                "Scheduled task automation"
            ],
            turnaround: "1-3 weeks",
            icon: Terminal
        },
        {
            title: "Cloud Solutions & DevOps",
            description: "Deploying and managing applications on cloud platforms with proper CI/CD pipelines, containerization, and infrastructure as code.",
            price: "Starting at $2,500 / project",
            features: [
                "AWS, GCP, Azure deployment",
                "Docker containerization",
                "Kubernetes orchestration",
                "CI/CD pipeline setup",
                "Infrastructure as Code (Terraform)",
                "Monitoring & logging"
            ],
            turnaround: "3-6 weeks",
            icon: Cloud
        },
        {
            title: "API Development & Integration",
            description: "Designing, building, and integrating APIs for seamless communication between systems, applications, and third-party services.",
            price: "Starting at $1,500 / project",
            features: [
                "API design & documentation",
                "Third-party API integration",
                "Payment gateway integration",
                "Webhook implementation",
                "API security & rate limiting",
                "SDK development"
            ],
            turnaround: "2-4 weeks",
            icon: Code
        },
        {
            title: "Machine Learning Solutions",
            description: "Developing ML models and AI solutions for prediction, classification, recommendation, and data analysis tasks.",
            price: "Starting at $4,000 / project",
            features: [
                "ML model development",
                "Deep learning solutions",
                "NLP & computer vision",
                "Model deployment & serving",
                "MLOps & model monitoring",
                "Feature engineering"
            ],
            turnaround: "6-12 weeks",
            icon: Terminal
        }
    ];

    return (
        <div className="w-full pt-20">
            {/* Header */}
            <section className="bg-brand-black py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-gold/5 z-0"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-brand-white mb-6">My <span className="text-brand-gold">Services</span></h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Professional Python development services tailored to your needs.
                        From backend development to machine learning solutions.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-brand-black">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="bg-brand-gray/20 border border-white/5 rounded-2xl p-8 hover:border-brand-gold/30 transition-all group">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-brand-gold/10 rounded-lg flex items-center justify-center">
                                        <service.icon size={24} className="text-brand-gold" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-brand-gold transition-colors">{service.title}</h3>
                                </div>
                                <p className="text-gray-400 mb-6 min-h-[60px]">{service.description}</p>

                                <div className="text-2xl font-bold text-brand-gold mb-6 font-heading">{service.price}</div>

                                <div className="bg-brand-black/50 rounded-xl p-6 mb-6">
                                    <ul className="space-y-3">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start text-gray-300 text-sm">
                                                <Check size={16} className="text-brand-gold mr-3 flex-shrink-0 mt-0.5" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-4">
                                        <div className="flex items-center text-gray-500 text-sm">
                                            <Clock size={16} className="mr-2" />
                                            {service.turnaround}
                                        </div>
                                        <a href="/contact" className="text-brand-white font-bold text-sm tracking-wide group-hover:underline decoration-brand-gold underline-offset-4 inline-flex items-center">
                                            Get Started <ArrowRight size={14} className="ml-1" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-brand-gray/10 text-center">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-heading font-bold text-brand-white mb-4">
                        Have a Custom Project?
                    </h2>
                    <p className="text-gray-400 mb-8">
                        Every project is unique. Let's discuss your specific requirements and find the perfect solution together.
                    </p>
                    <a href="/contact" className="px-8 py-3 bg-brand-gold text-brand-black font-bold rounded-full hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all inline-block">
                        Let's Discuss Your Project
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Services;
