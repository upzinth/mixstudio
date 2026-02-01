import React from 'react';
import { Code, Database, Server, Terminal, Github, Linkedin, Mail, Award, Briefcase, GraduationCap } from 'lucide-react';

const About = () => {
    const skills = [
        { category: "Backend", items: ["Python", "Django", "Flask", "FastAPI", "Node.js"] },
        { category: "Database", items: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "AWS DynamoDB"] },
        { category: "DevOps", items: ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux"] },
        { category: "Tools", items: ["Git", "GitHub", "VS Code", "Postman", "Terraform"] }
    ];

    const experience = [
        {
            role: "Senior Python Developer",
            company: "Tech Solutions Inc.",
            period: "2021 - Present",
            description: "Leading backend development, designing scalable APIs, and implementing data pipelines."
        },
        {
            role: "Software Engineer",
            company: "StartupXYZ",
            period: "2019 - 2021",
            description: "Built and maintained web applications using Django and React. Implemented automation solutions."
        },
        {
            role: "Junior Developer",
            company: "Digital Agency",
            period: "2018 - 2019",
            description: "Developed custom scripts, data processing tools, and maintained client websites."
        }
    ];

    const education = [
        {
            degree: "Bachelor of Science in Computer Science",
            school: "University of Technology",
            year: "2014 - 2018"
        }
    ];

    const certifications = [
        { name: "AWS Certified Developer", issuer: "Amazon", year: "2023" },
        { name: "Python Institute Certified Developer", issuer: "Python Institute", year: "2022" },
        { name: "Docker Certified Associate", issuer: "Docker", year: "2022" }
    ];

    return (
        <div className="w-full pt-20">
            {/* Header */}
            <section className="bg-brand-black py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-gold/5 z-0"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/3">
                            <div className="w-64 h-64 mx-auto rounded-full bg-brand-gold/20 border-4 border-brand-gold overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex justify-center gap-6 mt-6">
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
                        <div className="md:w-2/3 text-center md:text-left">
                            <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-white mb-4">
                                About <span className="text-brand-gold">Me</span>
                            </h1>
                            <p className="text-gray-400 text-lg leading-relaxed mb-6">
                                I'm a passionate Python software developer with over 5 years of experience building
                                scalable web applications, data pipelines, and automation solutions. I love turning
                                complex problems into elegant, efficient code.
                            </p>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                When I'm not coding, you'll find me exploring new technologies, contributing to
                                open-source projects, or sharing knowledge through technical writing and mentoring.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="py-20 bg-brand-gray/10">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-brand-gold font-bold tracking-widest text-sm uppercase">What I Do</span>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-white mt-3">
                            Technical <span className="text-gray-500 font-light">Skills</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
                        {skills.map((skill, index) => (
                            <div key={index} className="bg-brand-gray/20 border border-white/5 rounded-xl p-6 hover:border-brand-gold/30 transition-all">
                                <h3 className="text-lg font-bold text-brand-gold mb-4">{skill.category}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {skill.items.map((item, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-white/5 rounded-full text-sm text-gray-300">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section className="py-20 bg-brand-black">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-brand-gold font-bold tracking-widest text-sm uppercase">My Journey</span>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-white mt-3">
                            Work <span className="text-gray-500 font-light">Experience</span>
                        </h2>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        {experience.map((job, index) => (
                            <div key={index} className="flex gap-6 mb-8 last:mb-0">
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center">
                                        <Briefcase size={20} className="text-brand-gold" />
                                    </div>
                                    {index !== experience.length - 1 && (
                                        <div className="w-0.5 h-full bg-brand-gold/20 mt-2"></div>
                                    )}
                                </div>
                                <div className="flex-grow pb-8">
                                    <h3 className="text-xl font-bold text-white">{job.role}</h3>
                                    <p className="text-brand-gold text-sm mb-2">{job.company} | {job.period}</p>
                                    <p className="text-gray-400">{job.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Education & Certifications */}
            <section className="py-20 bg-brand-gray/10">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <GraduationCap size={28} className="text-brand-gold" />
                                <h2 className="text-2xl font-heading font-bold text-brand-white">Education</h2>
                            </div>
                            {education.map((edu, index) => (
                                <div key={index} className="bg-brand-gray/20 border border-white/5 rounded-xl p-6 mb-4">
                                    <h3 className="text-lg font-bold text-white">{edu.degree}</h3>
                                    <p className="text-brand-gold text-sm">{edu.school}</p>
                                    <p className="text-gray-400 text-sm mt-1">{edu.year}</p>
                                </div>
                            ))}
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <Award size={28} className="text-brand-gold" />
                                <h2 className="text-2xl font-heading font-bold text-brand-white">Certifications</h2>
                            </div>
                            {certifications.map((cert, index) => (
                                <div key={index} className="bg-brand-gray/20 border border-white/5 rounded-xl p-6 mb-4">
                                    <h3 className="text-lg font-bold text-white">{cert.name}</h3>
                                    <p className="text-brand-gold text-sm">{cert.issuer} | {cert.year}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
