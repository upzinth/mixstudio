import { createContext, useContext, useEffect, useState } from 'react';
import { apiRequest } from '../lib/api';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkSession();
    }, []);

    const checkSession = async () => {
        const token = localStorage.getItem('access_token');
        if (token) {
            try {
                const data = await apiRequest('/auth/me');
                setUser(data.user);
                setProfile(data.profile);
            } catch (err) {
                console.error('Session check failed:', err);
                localStorage.removeItem('access_token');
                setUser(null);
                setProfile(null);
            }
        }
        setLoading(false);
    };

    const signInWithSocial = async (provider) => {
        alert('Social login is temporarily disabled during database migration.');
        // Implementation for future OAuth flow would go here
    };

    const signInWithEmail = async (email, password) => {
        const data = await apiRequest('/auth/login', 'POST', { email, password });
        localStorage.setItem('access_token', data.token);
        setUser(data.user);
        // Fetch profile immediately after login
        const meData = await apiRequest('/auth/me');
        setProfile(meData.profile);
    };

    const signUp = async (email, password, name) => {
        const data = await apiRequest('/auth/register', 'POST', {
            email,
            password,
            fullName: name,
            avatarUrl: ''
        });
        // No longer auto-login. Verification required.
        return data;
    };

    const updateProfile = async (updates) => {
        if (!user) throw new Error('No user logged in');
        const data = await apiRequest(`/profiles/${user.id}`, 'PUT', updates);
        setProfile(data);
        return data;
    };

    const signOut = async () => {
        localStorage.removeItem('access_token');
        setUser(null);
        setProfile(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            profile,
            loading,
            signInWithSocial,
            signInWithEmail,
            signUp,
            updateProfile,
            signOut,
            refreshProfile: checkSession
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
