"use client";
import DashboardHeaderOne from "@/layouts/headers/dashboard/DashboardHeaderOne";
import DashboardHeaderTwo from "@/layouts/headers/dashboard/DashboardHeaderTwo";
import RecentMessage from "../index/RecentMessage";
import { useDashboardStats } from "@/hooks/useDashboardStats";

const DashboardMessageBody = () => {
  const { messages, loading, error } = useDashboardStats();

  return (
    <>
      <DashboardHeaderOne />
      <div className="dashboard-body">
        <div className="position-relative">
          <DashboardHeaderTwo title="Messages" />
          <h2 className="main-title d-block d-lg-none">Messages</h2>

          <div className="bg-white card-box border-20 pt-40">
            <div className="message-wrapper">
              <div className="row gx-0">
                <div className="col-12">
                  <div className="message-sidebar border-0">
                    <div className="recent-activity-wrapper">
                      {loading ? (
                        <div className="p-4">Loading messages...</div>
                      ) : error ? (
                        <div className="alert alert-danger">{error}</div>
                      ) : messages.length === 0 ? (
                        <div className="p-4 text-center">No messages yet.</div>
                      ) : (
                        <RecentMessage messages={messages} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardMessageBody;
