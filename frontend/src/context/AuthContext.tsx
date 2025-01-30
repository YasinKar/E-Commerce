'use client'

import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { User } from "@/types/user.types";
import { setCookie, getCookie, deleteCookie } from 'cookies-next';

type authTokensType = {
    access: string;
    refresh: string;
};

export interface AuthContextType {
    authTokens: authTokensType | null;
    setAuthTokens: React.Dispatch<React.SetStateAction<authTokensType | null>>;
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>
    signOut: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

type AuthContextProviderProps = {
    children: React.ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [authTokens, setAuthTokens] = useState<authTokensType | null>(null);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const tokens = await getCookie("authTokens");
                if (tokens) {
                    const parsedTokens = JSON.parse(tokens);
                    setAuthTokens(parsedTokens);
                    setUser(jwtDecode(parsedTokens.access));
                }
            } catch (error) {
                console.error("Error parsing authTokens:", error);
                setAuthTokens(null);
                setUser(null);
            }
        };

        initializeAuth();
    }, []);

    useEffect(() => {
        if (authTokens) {
            setUser(jwtDecode(authTokens.access));
            setCookie("authTokens", JSON.stringify(authTokens), { maxAge: 30 * 24 * 60 * 60 });
        } else {
            deleteCookie("authTokens");
            setUser(null);
        }
    }, [authTokens]);

    const signOut = () => {
        setAuthTokens(null);
        setUser(null);
        deleteCookie("authTokens");
    };

    const context = {
        authTokens,
        setAuthTokens,
        user,
        setUser,
        signOut,
    };

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    );
};