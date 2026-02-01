import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import ClientDashboard from './pages/ClientDashboard';
import Preloader from './components/Preloader';

function App() {
    const [loading, setLoading] = useState(true);

    return (
        <AuthProvider>
            {loading && <Preloader onComplete={() => setLoading(false)} />}
            <Router>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<Home />} />
                        <Route path="about" element={<About />} />
                        <Route path="services" element={<Services />} />
                        <Route path="portfolio" element={<Portfolio />} />
                        <Route path="blog" element={<Blog />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="client-area" element={<ClientDashboard />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
