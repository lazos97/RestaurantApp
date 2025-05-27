import LoadingSpinner from "@/components/loading-spinner";
import { useAuthStore } from "@/providers/auth-provider";
import { APP_URL } from "@/utils";
import axios from "axios";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Logout() {
    const { resetUserHandler } = useAuthStore()
    const router = useRouter()

    useEffect(() => {
        const logout = async () => {
        try {
        //   await axios.get(`${APP_URL}/auth/logout`);
          resetUserHandler()
          router.push("/");
        } catch (error) {
          console.log("Login error:", error);
          resetUserHandler()
          router.push("/");
        }
        }
        logout()
    }, [resetUserHandler, router])

return <LoadingSpinner />
}