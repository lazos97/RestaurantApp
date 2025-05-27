import { removeToken, retrieveToken, saveToken } from "@/utils";
import { useCallback, useEffect, useState } from "react";

export interface User {
    userId: string;
    email: string;
    name: string;
}

export interface Auth {
    user: User;
    token: string;
}

export const useAuthToken = () => {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const checkAuth = async () => {
            const token = await retrieveToken()
            if (token) setToken(token);
            setLoading(false);
        };

        checkAuth();
    }, []);

    const setAuthState = useCallback(async (data: Auth) => {
        const {token, user} = data
        setUser(user)
        setToken(token)
        await saveToken(token)
    }, [])


    const resetUserHandler = useCallback(async () => {
        setToken(null)
        setUser(null)
        removeToken()
    }, [])

    return {
        token,
        loading,
        user,
        setAuthState,
        resetUserHandler
    }
}

export type UseAuthTokenReturnType = ReturnType< typeof useAuthToken >
