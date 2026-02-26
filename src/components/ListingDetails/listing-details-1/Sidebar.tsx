import FeatureListing from "../listing-details-sidebar.tsx/FeatureListing";
import ScheduleForm from "../listing-details-sidebar.tsx/ScheduleForm";
import SidebarInfo from "../listing-details-sidebar.tsx/SidebarInfo";

const Sidebar = ({ property }: any) => {
  return (
    <div
      className="flex-shrink-0"
      style={{ width: "min(100%, 400px)", margin: "0 auto" }}
    >
      <div className="theme-sidebar-one dot-bg p-30 lg-mt-80">
        <div className="agent-info bg-white border-20 p-30 mb-40">
          <SidebarInfo property={property} />
        </div>
        <div className="tour-schedule bg-white border-20 p-30 mb-40">
          <h5 className="mb-40">Schedule Tour</h5>
          <ScheduleForm />
        </div>
        <FeatureListing />
      </div>
    </div>
  );
};

export default Sidebar;
