
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [admin, setadmin] = useState(() => {
        const stored = localStorage.getItem('admin');
        return stored ? JSON.parse(stored) : null;
    });

    const [expiresAt, setExpiresAt] = useState(() => {
        const stored = localStorage.getItem('expiresAt');
        return stored ? parseInt(stored, 10) : null;
    });

    useEffect(() => {
        if (!expiresAt) return;

        const now = Date.now();
        const remaining = expiresAt - now;

        if (remaining <= 0) {
            logout();
            return;
        }

        const timer = setTimeout(logout, remaining);
        return () => clearTimeout(timer);
    }, [expiresAt]);

    const login = (adminData) => {
        const expiry = Date.now() + 30 * 60 * 1000; // 30 min
        setadmin(adminData);
        setExpiresAt(expiry);
        localStorage.setItem('admin', JSON.stringify(adminData));
        localStorage.setItem('expiresAt', expiry.toString());
    };

    const logout = () => {
        setadmin(null);
        setExpiresAt(null);
        localStorage.removeItem('admin');
        localStorage.removeItem('expiresAt');
    };

    return (
        <AuthContext.Provider value={{ admin, login, logout, expiresAt }}>
            {children}
        </AuthContext.Provider>
    );
};
