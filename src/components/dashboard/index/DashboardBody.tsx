"use client";
import Image, { StaticImageData } from "next/image";
import NiceSelect from "@/ui/NiceSelect";
import RecentMessage from "./RecentMessage";
import DashboardHeaderTwo from "@/layouts/headers/dashboard/DashboardHeaderTwo";
import DashboardChart from "./DashboardChart";
import { useDashboardStats } from "@/hooks/useDashboardStats";

import icon_1 from "@/assets/images/dashboard/icon/icon_12.svg";
import icon_2 from "@/assets/images/dashboard/icon/icon_13.svg";
import icon_3 from "@/assets/images/dashboard/icon/icon_14.svg";
import icon_4 from "@/assets/images/dashboard/icon/icon_15.svg";

// ─── Skeleton card ────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="dash-card-one bg-white border-30 position-relative mb-15">
    <div className="d-sm-flex align-items-center justify-content-between">
      <div
        className="icon rounded-circle order-sm-1"
        style={{ width: 48, height: 48, background: "#f0f0f0" }}
      />
      <div className="order-sm-0" style={{ flex: 1 }}>
        <div
          style={{
            height: 12,
            width: "60%",
            background: "#f0f0f0",
            borderRadius: 6,
            marginBottom: 8,
          }}
        />
        <div
          style={{
            height: 20,
            width: "40%",
            background: "#f0f0f0",
            borderRadius: 6,
          }}
        />
      </div>
    </div>
  </div>
);

// ─── Stat card ─────────────────────────────────────────────────────────────
interface StatCardProps {
  icon: StaticImageData;
  title: string;
  value: number | string;
  className?: string;
}
const StatCard = ({ icon, title, value, className }: StatCardProps) => (
  <div
    className={`dash-card-one bg-white border-30 position-relative mb-15 ${className ?? ""}`}
  >
    <div className="d-sm-flex align-items-center justify-content-between">
      <div className="icon rounded-circle d-flex align-items-center justify-content-center order-sm-1">
        <Image src={icon} alt="" className="lazy-img" />
      </div>
      <div className="order-sm-0">
        <span>{title}</span>
        <div className="value fw-500">{value}</div>
      </div>
    </div>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────
const DashboardBody = () => {
  const { stats, chartData, messages, loading, error, refetch } =
    useDashboardStats();

  const selectHandler = (_e: any) => {};

  // Format numbers nicely: 1700 → "1.7k"
  const fmt = (n: number): string => {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return String(n);
  };

  const statCards = [
    {
      icon: icon_1,
      title: "All Properties",
      value: stats ? fmt(stats.totalProperties) : "—",
      className: "skew-none",
    },
    {
      icon: icon_2,
      title: "Total Pending",
      value: stats ? String(stats.totalPending).padStart(2, "0") : "—",
    },
    {
      icon: icon_3,
      title: "Total Views",
      value: stats ? fmt(stats.totalViews) : "—",
    },
    {
      icon: icon_4,
      title: "Total Favourites",
      value: stats ? String(stats.totalFavourites).padStart(2, "0") : "—",
    },
  ];

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        <DashboardHeaderTwo title="Dashboard" />
        <h2 className="main-title d-block d-lg-none">Dashboard</h2>

        {/* ── Error Banner ───────────────────────────────────────────────── */}
        {error && (
          <div
            className="alert d-flex align-items-center justify-content-between border-20 mb-15"
            style={{
              background: "#fff3f3",
              border: "1px solid #ffb3b3",
              padding: "12px 20px",
              borderRadius: 12,
            }}
          >
            <span style={{ color: "#c0392b" }}>
              <i className="fa-light fa-triangle-exclamation me-2" />
              {error}
            </span>
            <button
              onClick={refetch}
              className="btn-eleven fw-500"
              style={{ padding: "6px 16px", fontSize: 13 }}
            >
              Retry
            </button>
          </div>
        )}

        {/* ── Stat Cards ────────────────────────────────────────────────── */}
        <div className="bg-white border-20">
          <div className="row">
            {loading
              ? [1, 2, 3, 4].map((i) => (
                  <div key={i} className="col-lg-3 col-6">
                    <SkeletonCard />
                  </div>
                ))
              : statCards.map((card, idx) => (
                  <div key={idx} className="col-lg-3 col-6">
                    <StatCard
                      icon={card.icon}
                      title={card.title}
                      value={card.value}
                      className={card.className}
                    />
                  </div>
                ))}
          </div>
        </div>

        {/* ── Chart + Messages ──────────────────────────────────────────── */}
        <div className="row gx-xxl-5 d-flex pt-15 lg-pt-10">
          {/* Chart */}
          <div className="col-xl-7 col-lg-6 d-flex flex-column">
            <div className="user-activity-chart bg-white border-20 mt-30 h-100">
              <div className="d-flex align-items-center justify-content-between plr">
                <h5 className="dash-title-two">Property Views</h5>
                <div className="short-filter d-flex align-items-center">
                  <div className="fs-16 me-2">Short by:</div>
                  <NiceSelect
                    className="nice-select fw-normal"
                    options={[
                      { value: "1", text: "Weekly" },
                      { value: "2", text: "Daily" },
                      { value: "3", text: "Monthly" },
                    ]}
                    defaultCurrent={0}
                    onChange={selectHandler}
                    name=""
                    placeholder=""
                  />
                </div>
              </div>

              <div className="plr mt-50">
                {loading ? (
                  <div
                    style={{
                      height: 200,
                      background: "#f7f7f7",
                      borderRadius: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#aaa",
                    }}
                  >
                    Loading chart…
                  </div>
                ) : (
                  <div className="chart-wrapper">
                    <DashboardChart chartData={chartData} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recent Messages */}
          <div className="col-xl-5 col-lg-6 d-flex">
            <div className="recent-job-tab bg-white border-20 mt-30 plr w-100">
              <h5 className="dash-title-two">Recent Activity</h5>

              {loading ? (
                <div style={{ padding: "20px 0" }}>
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      style={{
                        height: 56,
                        background: "#f7f7f7",
                        borderRadius: 8,
                        marginBottom: 12,
                      }}
                    />
                  ))}
                </div>
              ) : messages.length === 0 ? (
                <p style={{ color: "#999", paddingTop: 20 }}>
                  No recent activity yet.
                </p>
              ) : (
                <RecentMessage messages={messages} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardBody;
