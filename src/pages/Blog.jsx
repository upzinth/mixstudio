import React from 'react';
import { Calendar, User } from 'lucide-react';

const Blog = () => {
    const posts = [
        {
            id: 1,
            title: 'Top 10 Mixing Tips for 2024',
            excerpt: 'Learn the secrets professional engineers use to get that crisp, radio-ready sound.',
            date: 'Jan 15, 2024',
            author: 'Admin',
            image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop',
            category: 'Tips & Tricks'
        },
        {
            id: 2,
            title: 'How to Prepare Your Tracks for Mastering',
            excerpt: 'Avoid common mistakes that can ruin your master before it even starts.',
            date: 'Feb 02, 2024',
            author: 'Senior Engineer',
            image: 'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=2070&auto=format&fit=crop',
            category: 'Guide'
        },
        {
            id: 3,
            title: 'The Art of Vocal Tuning',
            excerpt: 'Why manual tuning always beats automatic plugins for professional results.',
            date: 'Feb 10, 2024',
            author: 'Vocal Producer',
            image: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=1000&auto=format&fit=crop',
            category: 'Insight'
        }
    ];

    return (
        <div className="w-full pt-20">
            <section className="bg-brand-black py-20">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-brand-white mb-6">Our <span className="text-brand-gold">Blog</span></h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Insights, news, and techniques from the world of professional audio production.
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
                                    <div className="flex items-center text-xs text-brand-gold mb-3 space-x-4">
                                        <span className="flex items-center"><Calendar size={14} className="mr-1" /> {post.date}</span>
                                        <span className="flex items-center"><User size={14} className="mr-1" /> {post.author}</span>
                                    </div>
                                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-brand-gold transition-colors">{post.title}</h2>
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                                    <button className="text-brand-white text-sm font-bold hover:text-brand-gold transition-colors">Read More &rarr;</button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Blog;
