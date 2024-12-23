// --- src/hooks/useAuth.ts ---
import { useState } from 'react';

const useAuth = () => {
    const [user, setUser] = useState(null);

    const login = async (email: string, password: string) => {
        // Call API and handle login
    };

    const logout = () => {
        setUser(null);
    };

    return { user, login, logout };
};

export default useAuth;