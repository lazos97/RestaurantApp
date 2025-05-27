import { useAuthStore } from "@/providers/auth-provider";
import { Stack } from "expo-router";
import LoadingSpinner from "./loading-spinner";

export const CustomStack = () => {
    const {token, loading} = useAuthStore()

    
    if (loading) {
        return <LoadingSpinner />
    }

    return (
        <Stack>
        <Stack.Protected guard={!!token}>
            <Stack.Screen name="(app)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
        </Stack.Protected>

        <Stack.Protected guard={!token}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack.Protected>
        </Stack>
    );
};
