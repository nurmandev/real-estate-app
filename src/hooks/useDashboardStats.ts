"use client";
import { useState, useEffect, useCallback } from "react";
import { api } from "@/utils/api";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface DashboardStats {
  totalProperties: number;
  totalPending: number;
  totalViews: number;
  totalFavourites: number;
}

export interface ViewsChartData {
  labels: string[];
  data: number[];
}

export interface RecentMessage {
  id: string;
  name: string;
  date: string;
  title: string;
  desc: string;
  status: "success" | "failure";
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [chartData, setChartData] = useState<ViewsChartData | null>(null);
  const [messages, setMessages] = useState<RecentMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [statsRes, chartRes, msgRes] = await Promise.all([
        api.get<DashboardStats>("/api/dashboard/stats"),
        api.get<ViewsChartData>("/api/dashboard/views-chart"),
        api.get<{ messages: RecentMessage[] }>(
          "/api/dashboard/recent-messages",
        ),
      ]);

      setStats(statsRes.data);
      setChartData(chartRes.data);
      setMessages(msgRes.data.messages);
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Failed to load dashboard data.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Don't fire if there's no token — AuthGuard will redirect first
    const hasToken =
      typeof window !== "undefined" && !!localStorage.getItem("accessToken");
    if (hasToken) fetchAll();
    else setLoading(false);
  }, [fetchAll]);

  return { stats, chartData, messages, loading, error, refetch: fetchAll };
}
