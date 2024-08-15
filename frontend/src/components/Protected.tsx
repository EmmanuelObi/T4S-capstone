"use client";
import { jwtDecode } from "jwt-decode";
import api from "@/api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "@/constant";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Skeleton } from "./ui/skeleton";

const Protected = ({ children }: any) => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<any>(null);
  const [refToken, setRefreshToken] = useState<any>("");
  const [accessToken, setAccessToken] = useState<any>("");

  useEffect(() => {
    const result1 = window.localStorage.getItem(REFRESH_TOKEN);
    const result2 = window.localStorage.getItem(ACCESS_TOKEN);
    if (result1) {
      setRefreshToken(result1);
    }
    if (result2) {
      setAccessToken(result2);
    }
    auth().catch(() => setIsAuthorized(false));
  }, []);

  const refreshToken = async () => {
    try {
      const res = await api.post("/api/token/refresh/", {
        refresh: refToken,
      });

      if (res.status === 200) {
        window.localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (err) {
      console.log(err);
      setIsAuthorized(false);
    }
  };

  const auth = async () => {
    if (!accessToken) {
      setIsAuthorized(false);
      return;
    }

    const decoded = jwtDecode(accessToken);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration && tokenExpiration < now) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
    }
  };

  if (isAuthorized === null) {
    return (
      <div className="w-full flex flex-col items-center justify-center space-y-4">
        <div className="w-full flex items-start space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[130px]" />
          </div>
        </div>
        <div className="w-full flex items-start space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[130px]" />
          </div>
        </div>
        <div className="w-full flex items-start space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[130px]" />
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    router.push("/login");
  }

  return isAuthorized && children;
};

export default Protected;
