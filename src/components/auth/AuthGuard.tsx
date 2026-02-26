"use client";
import { useEffect, useState, ReactNode } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";

interface Props {
  children: ReactNode;
}

/**
 * Wrap any component with this to require authentication.
 * Redirects to home (where the login modal can be opened) if not authenticated.
 */
const AuthGuard = ({ children }: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isAuthenticated) {
      router.replace("/");
    }
  }, [isMounted, isAuthenticated, router]);

  if (!isMounted) {
    // Return null during server-side hydration to match initial HTML
    return null;
  }

  if (!isAuthenticated) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            border: "4px solid #f0f0f0",
            borderTop: "4px solid #ff6725",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <p style={{ color: "#888" }}>Redirecting to login…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
