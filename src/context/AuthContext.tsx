import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { refreshAccessToken } from "@/api/auth";

interface User {
    name: string
    email: string
    id: string
}
interface AuthContextType {
    accessToken: string | null
    setAccessToken: (token: string | null) => void
    user: User | null
    setUser: (user: AuthContextType['user']) => void
}



const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    // useEffect(() => {
    //     const loadAuth = async () => {
    //         try {
    //             const { accessToken: newToen, user } = await refreshAccessToken();
    //             setAccessToken(newToen);
    //             setUser(user)
    //         } catch (error) {
    //             console.log('failed to refresh the token')
    //         }
    //     }
    //     loadAuth()
    // })
    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within a provider');
    return context
}

