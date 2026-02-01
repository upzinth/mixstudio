import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
    // Mock Blog Data
    const posts = [
        {
            id: 1,
            title: "Building Scalable APIs with FastAPI",
            excerpt: "Learn how to build high-performance, scalable REST APIs using FastAPI with proper documentation and authentication.",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
            date: "Jan 15, 2025",
            category: "Backend Development",
            readTime: "8 min read"
        },
        {
            id: 2,
            title: "Data Pipeline Best Practices with Python",
            excerpt: "A comprehensive guide to designing and implementing robust data pipelines using Python, Airflow, and AWS.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
            date: "Jan 10, 2025",
            category: "Data Engineering",
            readTime: "12 min read"
        },
        {
            id: 3,
            title: "Docker for Python Developers",
            excerpt: "Master Docker containerization for Python applications. From basic setup to production-ready deployments.",
            image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?q=80&w=2071&auto=format&fit=crop",
            date: "Jan 5, 2025",
            category: "DevOps",
            readTime: "10 min read"
        },
        {
            id: 4,
            title: "Async Python: A Deep Dive into Asyncio",
            excerpt: "Understanding asynchronous programming in Python with asyncio for building high-concurrency applications.",
            image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2069&auto=format&fit=crop",
            date: "Dec 28, 2024",
            category: "Python Tips",
            readTime: "7 min read"
        },
        {
            id: 5,
            title: "Django vs Flask: Which Framework to Choose?",
            excerpt: "Comparing Django and Flask to help you make the right choice for your next web development project.",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
            date: "Dec 20, 2024",
            category: "Web Development",
            readTime: "6 min read"
        },
        {
            id: 6,
            title: "Automating Daily Tasks with Python Scripts",
            excerpt: "Practical examples of automating repetitive tasks using Python. Save time and increase productivity.",
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop",
            date: "Dec 15, 2024",
            category: "Automation",
            readTime: "9 min read"
        }
    ];

    return (
        <div className="w-full pt-20">
            {/* Header */}
            <section className="bg-brand-black py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-gold/5 z-0"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-brand-white mb-6">Tech <span className="text-brand-gold">Blog</span></h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Insights, tutorials, and best practices from my journey as a Python developer.
                    </p>
                </div>
            </section>

            <section className="bg-brand-black pb-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <article key={post.id} className="bg-brand-gray/20 rounded-xl overflow-hidden border border-white/5 hover:border-brand-gold/30 transition-all group">
                                <div className="aspect-video overflow-hidden">
                                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                                        <span className="flex items-center"><Calendar size={14} className="mr-1" /> {post.date}</span>
                                        <span className="text-brand-gold">{post.category}</span>
                                    </div>
                                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-brand-gold transition-colors line-clamp-2">{post.title}</h2>
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-500">{post.readTime}</span>
                                        <button className="text-brand-gold text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                                            Read More <ArrowRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Newsletter Section */}
                    <div className="mt-20 bg-brand-gray/20 rounded-2xl p-8 md:p-12 text-center">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-brand-white mb-4">
                            Stay Updated
                        </h2>
                        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                            Get the latest articles, tutorials, and insights delivered straight to your inbox.
                        </p>
                        <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-grow px-6 py-3 bg-brand-black border border-white/10 rounded-full text-white focus:border-brand-gold focus:outline-none"
                            />
                            <button className="px-8 py-3 bg-brand-gold text-brand-black font-bold rounded-full hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Blog;
