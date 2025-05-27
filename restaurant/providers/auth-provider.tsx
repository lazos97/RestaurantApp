
import { useAuthToken, UseAuthTokenReturnType } from "@/hooks/use-auth-token";
import { createContext, ReactNode, useContext } from "react";

const AuthStoreContext = createContext<UseAuthTokenReturnType | null>(null)

export const useAuthStore = () => {
    const context = useContext(AuthStoreContext)
    if (context === null) {
        throw new Error('useAuthStore must be used within a AuthProvider')
    }

    return context
}


export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const store = useAuthToken()
    return (
        <AuthStoreContext.Provider value={store}>
            {children}
        </AuthStoreContext.Provider>
    )
}