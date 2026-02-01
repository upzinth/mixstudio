import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import AdBanner from '../components/AdBanner';

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-brand-black">
            <Navbar />
            <div className="pt-20">
                <AdBanner position="Leaderboard - Top" />
            </div>
            <main className="flex-grow">
                <Outlet />
            </main>
            <AdBanner position="Footer - Bottom" />
            <Footer />
        </div>
    );
};

export default MainLayout;
