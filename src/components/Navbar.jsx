
import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/useAuth';

const NavBar = () => {
    const { user, logout, expiresAt } = useAuth();

    const [secondsLeft, setSecondsLeft] = useState(() => {
        if (!expiresAt) return 0;
        return Math.max(0, Math.floor((expiresAt - Date.now()) / 1000));
    });

    useEffect(() => {
        if (!expiresAt) return;

        const interval = setInterval(() => {
            const remaining = Math.max(0, Math.floor((expiresAt - Date.now()) / 1000));
            setSecondsLeft(remaining);

            if (remaining < 0) {
                logout();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [expiresAt, logout]);

    const formatTime = (sec) => {
        const m = Math.floor(sec / 60).toString().padStart(2, '0');
        const s = (sec % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }
    return (
        <nav className='navbar navbar-expand navbar-dark bg-primary px-3'>
            {user ? (
                <div className="d-flex justify-content-between w-100 align-items-center">
                    <p className="mb-0 text-white">Panel Zarządzania Firmami - Zalogowany jako: {user.email}</p>
                    <div>
                        <span className='badge bg-light text-primary me-3'>
                            Sesja: {formatTime(secondsLeft)}
                        </span>
                        <button onClick={logout} className='btn btn-sm btn-outline-light'>Wyloguj</button>
                    </div>
                </div>
            ) : (
                <div className="d-flex justify-content-between w-100 align-items-center">
                    <p className="mb-0 text-white">Panel</p>
                </div>
            )}
        </nav>
    );
};

export default NavBar;